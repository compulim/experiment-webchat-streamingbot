// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityHandler, MessageFactory, TurnContext } from 'botbuilder';
import { EventSourceParserStream } from 'eventsource-parser/stream';
import Limiter from '../node_modules/limiter/dist/cjs/index.js';

import createBotFrameworkAdapter from './createBotFrameworkAdapter.js';
import sleep from './utils/sleep.js';

const gptLimiter = new Limiter.RateLimiter({ tokensPerInterval: 5, interval: 'minute' });

const CHUNK_INTERVAL = 10;
const TOKENS =
  'Alfa Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey Xray Yankee Zulu';

const SUGGESTED_ACTIONS = {
  to: [],
  actions: [
    {
      type: 'imBack',
      value: 'Give me a sample Markdown text.'
    },
    {
      text: '1',
      title: 'Say A to Z.',
      type: 'messageBack'
    }
  ]
};

export default class EchoBot extends ActivityHandler {
  constructor() {
    super();

    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      const { activity } = context;
      const { text } = activity;

      const conversationReference = TurnContext.getConversationReference(activity);

      console.log(`Received: ${text}`);

      if (text === '1') {
        await context.sendActivity(MessageFactory.text('Sending as "typing" activity with overlap'));

        // By calling next() you ensure that the next BotHandler is run.
        await next();

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
            await context.sendActivity({ id, suggestedActions: SUGGESTED_ACTIONS, text: TOKENS, type: 'message' });
          });
        })();
      } else if (text === '2') {
        await context.sendActivity(MessageFactory.text('Sending as "typing" activity without overlap'));

        // By calling next() you ensure that the next BotHandler is run.
        await next();

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

        // By calling next() you ensure that the next BotHandler is run.
        await next();

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
      } else if (text === 'csat') {
        await context.sendActivity(MessageFactory.text('Sending CSAT as suggested actions'));
        await context.sendActivity({
          text: 'Great! Please rate your experience.',
          type: 'message',
          suggestedActions: {
            to: {},
            actions: [
              {
                image:
                  "data:image/svg+xml,%3Csvg width='160' height='32' viewBox='0 0 160 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8057 6.53194C15.2948 5.54094 16.7079 5.54095 17.197 6.53194L19.7709 11.7473L25.5264 12.5836C26.62 12.7425 27.0567 14.0865 26.2653 14.8578L22.1006 18.9174L23.0838 24.6496C23.2706 25.7388 22.1273 26.5694 21.1492 26.0552L16.0013 23.3488L10.8535 26.0552C9.87532 26.5694 8.73209 25.7388 8.9189 24.6496L9.90205 18.9174L5.73736 14.8578C4.946 14.0865 5.38269 12.7425 6.47631 12.5836L12.2318 11.7473L14.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M46.8057 6.53194C47.2948 5.54094 48.7079 5.54095 49.197 6.53194L51.7709 11.7473L57.5264 12.5836C58.62 12.7425 59.0567 14.0865 58.2653 14.8578L54.1006 18.9174L55.0838 24.6496C55.2706 25.7388 54.1273 26.5694 53.1492 26.0552L48.0013 23.3488L42.8535 26.0552C41.8753 26.5694 40.7321 25.7388 40.9189 24.6496L41.902 18.9174L37.7374 14.8578C36.946 14.0865 37.3827 12.7425 38.4763 12.5836L44.2318 11.7473L46.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M78.8057 6.53194C79.2948 5.54094 80.7079 5.54095 81.197 6.53194L83.7709 11.7473L89.5264 12.5836C90.62 12.7425 91.0567 14.0865 90.2653 14.8578L86.1006 18.9174L87.0838 24.6496C87.2706 25.7388 86.1273 26.5694 85.1492 26.0552L80.0013 23.3488L74.8535 26.0552C73.8753 26.5694 72.7321 25.7388 72.9189 24.6496L73.902 18.9174L69.7374 14.8578C68.946 14.0865 69.3827 12.7425 70.4763 12.5836L76.2318 11.7473L78.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M110.806 6.53194C111.295 5.54094 112.708 5.54095 113.197 6.53194L115.771 11.7473L121.526 12.5836C122.62 12.7425 123.057 14.0865 122.265 14.8578L118.101 18.9174L119.084 24.6496C119.271 25.7388 118.127 26.5694 117.149 26.0552L112.001 23.3488L106.853 26.0552C105.875 26.5694 104.732 25.7388 104.919 24.6496L105.902 18.9174L101.737 14.8578C100.946 14.0865 101.383 12.7425 102.476 12.5836L108.232 11.7473L110.806 6.53194Z' fill='%23242424'/%3E%3Cpath d='M142.806 6.53194C143.295 5.54094 144.708 5.54095 145.197 6.53194L147.771 11.7473L153.526 12.5836C154.62 12.7425 155.057 14.0865 154.265 14.8578L150.101 18.9174L151.084 24.6496C151.271 25.7388 150.127 26.5694 149.149 26.0552L144.001 23.3488L138.853 26.0552C137.875 26.5694 136.732 25.7388 136.919 24.6496L137.902 18.9174L133.737 14.8578C132.946 14.0865 133.383 12.7425 134.476 12.5836L140.232 11.7473L142.806 6.53194Z' fill='%23242424'/%3E%3C/svg%3E",
                type: 'imBack',
                value: 'Excellent'
              },
              {
                image:
                  "data:image/svg+xml,%3Csvg width='128' height='32' viewBox='0 0 128 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8057 6.53194C15.2948 5.54094 16.7079 5.54095 17.197 6.53194L19.7709 11.7473L25.5264 12.5836C26.62 12.7425 27.0567 14.0865 26.2653 14.8578L22.1006 18.9174L23.0838 24.6496C23.2706 25.7388 22.1273 26.5694 21.1492 26.0552L16.0013 23.3488L10.8535 26.0552C9.87532 26.5694 8.73209 25.7388 8.9189 24.6496L9.90205 18.9174L5.73736 14.8578C4.946 14.0865 5.38269 12.7425 6.47631 12.5836L12.2318 11.7473L14.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M46.8057 6.53194C47.2948 5.54094 48.7079 5.54095 49.197 6.53194L51.7709 11.7473L57.5264 12.5836C58.62 12.7425 59.0567 14.0865 58.2653 14.8578L54.1006 18.9174L55.0838 24.6496C55.2706 25.7388 54.1273 26.5694 53.1492 26.0552L48.0013 23.3488L42.8535 26.0552C41.8753 26.5694 40.7321 25.7388 40.9189 24.6496L41.902 18.9174L37.7374 14.8578C36.946 14.0865 37.3827 12.7425 38.4763 12.5836L44.2318 11.7473L46.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M78.8057 6.53194C79.2948 5.54094 80.7079 5.54095 81.197 6.53194L83.7709 11.7473L89.5264 12.5836C90.62 12.7425 91.0567 14.0865 90.2653 14.8578L86.1006 18.9174L87.0838 24.6496C87.2706 25.7388 86.1273 26.5694 85.1492 26.0552L80.0013 23.3488L74.8535 26.0552C73.8753 26.5694 72.7321 25.7388 72.9189 24.6496L73.902 18.9174L69.7374 14.8578C68.946 14.0865 69.3827 12.7425 70.4763 12.5836L76.2318 11.7473L78.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M110.806 6.53194C111.295 5.54094 112.708 5.54095 113.197 6.53194L115.771 11.7473L121.526 12.5836C122.62 12.7425 123.057 14.0865 122.265 14.8578L118.101 18.9174L119.084 24.6496C119.271 25.7388 118.127 26.5694 117.149 26.0552L112.001 23.3488L106.853 26.0552C105.875 26.5694 104.732 25.7388 104.919 24.6496L105.902 18.9174L101.737 14.8578C100.946 14.0865 101.383 12.7425 102.476 12.5836L108.232 11.7473L110.806 6.53194Z' fill='%23242424'/%3E%3C/svg%3E",
                type: 'imBack',
                value: 'Great'
              },
              {
                image:
                  "data:image/svg+xml,%3Csvg width='96' height='32' viewBox='0 0 96 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8057 6.53194C15.2948 5.54094 16.7079 5.54095 17.197 6.53194L19.7709 11.7473L25.5264 12.5836C26.62 12.7425 27.0567 14.0865 26.2653 14.8578L22.1006 18.9174L23.0838 24.6496C23.2706 25.7388 22.1273 26.5694 21.1492 26.0552L16.0013 23.3488L10.8535 26.0552C9.87532 26.5694 8.73209 25.7388 8.9189 24.6496L9.90205 18.9174L5.73736 14.8578C4.946 14.0865 5.38269 12.7425 6.47631 12.5836L12.2318 11.7473L14.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M46.8057 6.53194C47.2948 5.54094 48.7079 5.54095 49.197 6.53194L51.7709 11.7473L57.5264 12.5836C58.62 12.7425 59.0567 14.0865 58.2653 14.8578L54.1006 18.9174L55.0838 24.6496C55.2706 25.7388 54.1273 26.5694 53.1492 26.0552L48.0013 23.3488L42.8535 26.0552C41.8753 26.5694 40.7321 25.7388 40.9189 24.6496L41.902 18.9174L37.7374 14.8578C36.946 14.0865 37.3827 12.7425 38.4763 12.5836L44.2318 11.7473L46.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M78.8057 6.53194C79.2948 5.54094 80.7079 5.54095 81.197 6.53194L83.7709 11.7473L89.5264 12.5836C90.62 12.7425 91.0567 14.0865 90.2653 14.8578L86.1006 18.9174L87.0838 24.6496C87.2706 25.7388 86.1273 26.5694 85.1492 26.0552L80.0013 23.3488L74.8535 26.0552C73.8753 26.5694 72.7321 25.7388 72.9189 24.6496L73.902 18.9174L69.7374 14.8578C68.946 14.0865 69.3827 12.7425 70.4763 12.5836L76.2318 11.7473L78.8057 6.53194Z' fill='%23242424'/%3E%3C/svg%3E",
                type: 'imBack',
                value: 'Good'
              },
              {
                image:
                  "data:image/svg+xml,%3Csvg width='64' height='32' viewBox='0 0 64 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8057 6.53194C15.2948 5.54094 16.7079 5.54095 17.197 6.53194L19.7709 11.7473L25.5264 12.5836C26.62 12.7425 27.0567 14.0865 26.2653 14.8578L22.1006 18.9174L23.0838 24.6496C23.2706 25.7388 22.1273 26.5694 21.1492 26.0552L16.0013 23.3488L10.8535 26.0552C9.87532 26.5694 8.73209 25.7388 8.9189 24.6496L9.90205 18.9174L5.73736 14.8578C4.946 14.0865 5.38269 12.7425 6.47631 12.5836L12.2318 11.7473L14.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M46.8057 6.53194C47.2948 5.54094 48.7079 5.54095 49.197 6.53194L51.7709 11.7473L57.5264 12.5836C58.62 12.7425 59.0567 14.0865 58.2653 14.8578L54.1006 18.9174L55.0838 24.6496C55.2706 25.7388 54.1273 26.5694 53.1492 26.0552L48.0013 23.3488L42.8535 26.0552C41.8753 26.5694 40.7321 25.7388 40.9189 24.6496L41.902 18.9174L37.7374 14.8578C36.946 14.0865 37.3827 12.7425 38.4763 12.5836L44.2318 11.7473L46.8057 6.53194Z' fill='%23242424'/%3E%3C/svg%3E",
                type: 'imBack',
                value: 'Bad'
              },
              {
                image:
                  "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8057 6.53194C15.2948 5.54094 16.7079 5.54095 17.197 6.53194L19.7709 11.7473L25.5264 12.5836C26.62 12.7425 27.0567 14.0865 26.2653 14.8578L22.1006 18.9174L23.0838 24.6496C23.2706 25.7388 22.1273 26.5694 21.1492 26.0552L16.0013 23.3488L10.8535 26.0552C9.87532 26.5694 8.73209 25.7388 8.9189 24.6496L9.90205 18.9174L5.73736 14.8578C4.946 14.0865 5.38269 12.7425 6.47631 12.5836L12.2318 11.7473L14.8057 6.53194Z' fill='%23242424'/%3E%3C/svg%3E",
                type: 'imBack',
                value: 'Poor'
              }
            ]
          }
        });

        // By calling next() you ensure that the next BotHandler is run.
        await next();
      } else {
        if (!(await gptLimiter.tryRemoveTokens(1))) {
          return await context.sendActivity(
            MessageFactory.text('Too many requests to Azure OpenAI, please try again later.')
          );
        }

        await context.sendActivity(MessageFactory.text(`Sending "${text}" to Azure OpenAI.`));

        // By calling next() you ensure that the next BotHandler is run.
        await next();

        (async function () {
          const adapter = await createBotFrameworkAdapter();

          await adapter.continueConversation(conversationReference, async context => {
            try {
              const res = await fetch(
                `https://openai-pva.openai.azure.com/openai/deployments/${process.env.AZURE_OPEN_AI_DEPLOYMENT_NAME}/completions?api-version=2023-05-15`,
                {
                  body: JSON.stringify({
                    max_tokens: 1000,
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
              const final = [];

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

              await context.sendActivity({
                suggestedActions: SUGGESTED_ACTIONS,
                text: final.join('')
              });
            } catch ({ message, stack }) {
              await context.sendActivity({
                suggestedActions: SUGGESTED_ACTIONS,
                text: `Bot failed:\n\n${JSON.stringify({ message, stack }, null, 2)}`
              });
            }
          });
        })();
      }
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      const welcomeText =
        'Hello and welcome!\n\nThis is a bot for experimenting UI features. Do not use it for production.';

      for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity({
            suggestedActions: SUGGESTED_ACTIONS,
            text: welcomeText
          });
        }
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}
