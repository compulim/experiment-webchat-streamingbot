import {
  BotAdapter,
  TurnContext,
  type Activity,
  type ActivityHandler,
  type ConversationAccount,
  type ConversationReference,
  type ResourceResponse
} from 'botbuilder';
import cors from 'cors';
import Express from 'express';
import createDeferred, { type DeferredPromise } from 'p-defer';
import { parse } from 'valibot';
import executeTurnRequestBodySchema from './executeTurnRequestBody';

export type BotMiddleware = Parameters<BotAdapter['runMiddleware']>[1];

export type DirectToEngineBotAdapterInit = {
  bot: ActivityHandler;
  port: number;
};

type HalfDuplexSession = {
  initialActivity: Partial<Activity>;
  ongoing: DeferredPromise<void> | undefined;
  send: (...activities: Partial<Activity>[]) => Promise<void>;
};

function createConversationAccount(conversationId: string): ConversationAccount {
  return {
    id: conversationId,
    isGroup: false,
    conversationType: 'direct-to-engine',
    name: conversationId
  };
}

export default class DirectToEngineBotAdapter extends BotAdapter {
  constructor({ bot, port }: DirectToEngineBotAdapterInit) {
    super();

    this.#botMiddleware = bot.run.bind(bot);
    this.#port = port;

    this.#app = Express();

    this.#app.use(cors());
    this.#app.use(Express.json());

    this.#app.post('/environments/:environmentId/bots/:botId/test/conversations', async (_, res) => {
      const conversationId = this.#nextConversationId();
      let context: TurnContext | undefined;

      res.contentType('text/event-stream');

      try {
        await this.#run(
          conversationId,
          {
            membersAdded: [{ id: 'user', name: 'User', role: 'user' }],
            type: 'conversationUpdate'
          },
          async (...activities) => {
            for (const activity of activities) {
              // TODO: Rename the event name
              res.write(`event: activity\ndata: ${JSON.stringify(activity)}\n\n`);
            }
          }
        );

        res.write('event: end\ndata: end\n\n');
      } catch (error) {
        context && this.onTurnError(context, error instanceof Error ? error : new Error(error + ''));

        res.status(500);
      }
    });

    this.#app.post('/environments/:environmentId/bots/:botId/test/conversations/:conversationId', async (req, res) => {
      res.socket?.setNoDelay(true);
      console.log(res.socket);

      const {
        params: { conversationId }
      } = req;

      let context: TurnContext | undefined;

      try {
        const { activity } = parse(executeTurnRequestBodySchema, req.body);

        res.contentType('text/event-stream');

        await this.#run(conversationId, activity, async (...activities) => {
          // TODO: Rename the event name
          for (const activity of activities) {
            console.log(new Date());
            res.write(`event: activity\ndata: ${JSON.stringify(activity)}\n\n`);
          }
        });

        res.write('event: end\ndata: end\n\n');
      } catch (error) {
        context && this.onTurnError(context, error instanceof Error ? error : new Error(error + ''));

        res.status(500);
      }
    });

    this.#app.listen(port, () => console.log(`Direct-to-Engine bot adapter listening to port ${port}.`));
  }

  #activeSession: Map<string, HalfDuplexSession> = new Map();
  #app: ReturnType<typeof Express>;
  #botMiddleware: BotMiddleware;
  #currentActivityIdNumber: number = 0;
  #currentConversationIdNumber: number = 0;
  #port: number;

  #nextActivityId(): string {
    return `a-${++this.#currentActivityIdNumber}`;
  }

  #nextConversationId(): string {
    return `c-${++this.#currentConversationIdNumber}`;
  }

  async #run(
    conversationId: string,
    initialActivity: Partial<Activity>,
    send: (...activities: Partial<Activity>[]) => Promise<void>
  ): Promise<void> {
    initialActivity = {
      ...initialActivity,
      channelId: 'direct-to-engine',
      conversation: createConversationAccount(conversationId),
      from: { id: 'user', name: 'User', role: 'user' },
      id: this.#nextActivityId(),
      recipient: { id: 'bot', name: 'Bot', role: 'bot' },
      serviceUrl: `http://localhost:${this.#port}/`,
      timestamp: new Date()
    };

    const context = new TurnContext(this, initialActivity);

    const session: HalfDuplexSession = { initialActivity, ongoing: undefined, send };

    this.#activeSession.set(conversationId, session);

    await this.runMiddleware(context, this.#botMiddleware);
    await session.ongoing?.promise;

    this.#activeSession.delete(conversationId);
  }

  override async continueConversation(
    { conversation }: Partial<ConversationReference>,
    logic: (revocableContext: TurnContext) => Promise<void>
  ): Promise<void> {
    if (!conversation) {
      throw new Error('Invalid ConversationReference.');
    }

    const { id: conversationId } = conversation;
    const session = this.#activeSession.get(conversationId);

    if (!session) {
      throw new Error('Adapter.willContinue() must be called before a conversation can be continued.');
    }

    await logic(new TurnContext(this, session.initialActivity));

    session.ongoing?.resolve();
  }

  override deleteActivity(): Promise<void> {
    throw new Error('Not supported.');
  }

  override sendActivities(context: TurnContext, activities: Partial<Activity>[]): Promise<ResourceResponse[]> {
    const {
      activity: {
        conversation: { id: conversationId }
      }
    } = context;

    const session = this.#activeSession.get(conversationId);

    if (!session) {
      throw new Error('Proactive send activities is not supported.');
    }

    const filledActivities = activities.map(activity => ({
      ...activity,
      conversation: createConversationAccount(conversationId),
      id: this.#nextActivityId(),
      timestamp: new Date()
    }));

    session.send(...filledActivities);

    return Promise.resolve(filledActivities.map(({ id }) => ({ id })));
  }

  override updateActivity(): Promise<void | ResourceResponse> {
    throw new Error('Not supported.');
  }

  willContinue(context: TurnContext) {
    const currentSession = this.#activeSession.get(context.activity.conversation.id);

    if (!currentSession) {
      throw new Error('Cannot mark a non-existent context to continue.');
    }

    currentSession.ongoing = createDeferred();
  }
}
