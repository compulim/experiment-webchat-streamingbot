// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityHandler, MessageFactory, TurnContext } from 'botbuilder';
import { EventSourceParserStream } from 'eventsource-parser/stream';
import Limiter from '../node_modules/limiter/dist/cjs/index.js';

import createBotFrameworkAdapter from './createBotFrameworkAdapter.js';
import sleep from './utils/sleep.js';

const gptLimiter = new Limiter.RateLimiter({ tokensPerInterval: 10, interval: 'minute' });

const CHUNK_INTERVAL = 10;
const TOKENS =
  'Alfa Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey Xray Yankee Zulu';

export default class EchoBot extends ActivityHandler {
  constructor() {
    super();

    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      const { activity } = context;
      const { text } = activity;

      const conversationReference = TurnContext.getConversationReference(activity);

      console.log(`Received: ${text}`);

      if (text !== '1' && text !== '2') {
        const replyText = `Echo: ${text}`;

        await context.sendActivity(MessageFactory.text(replyText, replyText));

        // By calling next() you ensure that the next BotHandler is run.
        await next();
      }

      if (text === '1') {
        await context.sendActivity(MessageFactory.text('Sending as "typing" activity with overlap'));

        (async function () {
          const adapter = await createBotFrameworkAdapter();

          await adapter.continueConversation(conversationReference, async context => {
            let id, match;
            let pattern = /\s/gu;

            while ((match = pattern.exec(TOKENS))) {
              const text = TOKENS.substring(0, match.index);

              if (id) {
                // await context.updateActivity({ id, text, type: 'typing' });
                await context.sendActivity({ id, text, type: 'typing' });
              } else {
                ({ id } = await context.sendActivity({ text, type: 'typing' }));
              }

              await sleep(CHUNK_INTERVAL);
            }

            // await context.updateActivity({ id, text: TOKENS, type: 'message' });
            await context.sendActivity({ id, text: TOKENS, type: 'message' });
          });
        })();
      } else if (text === '2') {
        await context.sendActivity(MessageFactory.text('Sending as "typing" activity without overlap'));

        (async function () {
          const adapter = await createBotFrameworkAdapter();

          await adapter.continueConversation(conversationReference, async context => {
            let id;

            for (const text of TOKENS.split(/\s/gu)) {
              if (id) {
                await context.updateActivity({ id, text, type: 'typing' });
                // await context.sendActivity({ id, text, type: 'typing' });
              } else {
                ({ id } = await context.sendActivity({ text, type: 'typing' }));
              }

              await sleep(CHUNK_INTERVAL);
            }

            await context.updateActivity({ id, text: TOKENS, type: 'message' });
            // await context.sendActivity({ id, text: TOKENS, type: 'message' });
          });
        })();
      } else if (text === '3') {
        await context.sendActivity(MessageFactory.text('Sending as "messageUpdate" activity'));

        (async function () {
          const adapter = await createBotFrameworkAdapter();

          await adapter.continueConversation(conversationReference, async context => {
            let id, match;
            let pattern = /\s/gu;

            while ((match = pattern.exec(TOKENS))) {
              if (id) {
                // await context.updateActivity({ id, text: TOKENS.substring(0, match.index), type: 'messageUpdate' });
                await context.sendActivity({ id, text: TOKENS.substring(0, match.index), type: 'messageUpdate' });
              } else {
                ({ id } = await context.sendActivity({ text: TOKENS.substring(0, match.index), type: 'message' }));
              }

              await sleep(CHUNK_INTERVAL);
            }

            // await context.updateActivity({ id, text: TOKENS, type: 'messageUpdate' });
            await context.sendActivity({ id, text: TOKENS, type: 'messageUpdate' });
          });
        })();
      } else {
        if (!(await gptLimiter.tryRemoveTokens(1))) {
          return await context.sendActivity(
            MessageFactory.text('Too many requests to Azure OpenAI, please try again later.')
          );
        }

        await context.sendActivity(MessageFactory.text('Sending to Azure OpenAI'));

        (async function () {
          const adapter = await createBotFrameworkAdapter();

          await adapter.continueConversation(conversationReference, async context => {
            try {
              const res = await fetch(
                `https://openai-pva.openai.azure.com/openai/deployments/${process.env.AZURE_OPEN_AI_DEPLOYMENT_NAME}/completions?api-version=2023-05-15`,
                {
                  body: JSON.stringify({
                    max_tokens: 100,
                    prompt: text,
                    stream: true
                  }),
                  headers: {
                    'api-key': process.env.AZURE_OPEN_AI_KEY,
                    'content-type': 'application/json'
                  },
                  method: 'POST'
                }
              );

              if (!res.ok) {
                return await context.sendActivity(`Failed to call completion API.\n\n${await res.statusText()}`);
              }

              const stream = res.body.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream());
              const final = [text];

              for await (const { data, type } of stream) {
                if (type !== 'event') {
                  continue;
                } else if (data === '[DONE]') {
                  break;
                }

                const [{ text }] = JSON.parse(data).choices;

                final.push(text);
                await context.sendActivity({
                  channelData: { 'azure-openai-data': data },
                  text: final.join(''),
                  type: 'typing'
                });
              }

              await context.sendActivity(final.join(''));
            } catch ({ message, stack }) {
              await context.sendActivity(`Bot failed:\n\n${JSON.stringify({ message, stack }, null, 2)}`);
            }
          });
        })();
      }
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      const welcomeText = 'Hello and welcome!';

      for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
        }
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}
