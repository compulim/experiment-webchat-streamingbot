// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import './env.js';

import { DirectToEngineBotAdapter } from 'direct-to-engine-bot-adapter';
import { platform } from 'os';
import { createServer, plugins } from 'restify';

import setupAPI from './api/index.js';
import EchoBot from './bot.js';
import createBotFrameworkAdapter from './createBotFrameworkAdapter.js';

async function main() {
  // Create HTTP server
  const server = createServer();

  server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${JSON.stringify(server.address())}`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
  });

  // Create adapter.
  const adapter = await createBotFrameworkAdapter();

  // Create the main dialog.
  const bot = new EchoBot();

  setupAPI(server, { adapter, bot });

  // Enable Direct Line App Service Extension
  // See https://docs.microsoft.com/en-us/azure/bot-service/bot-service-channel-directline-extension-node-bot?view=azure-bot-service-4.0
  platform() === 'win32' &&
    adapter.useNamedPipe(context => bot.run(context), `${process.env.APPSETTING_WEBSITE_SITE_NAME}.directline`);

  const directToEngine = new DirectToEngineBotAdapter({ bot, port: 3980 });

  server.use(plugins.jsonBodyParser());
  directToEngine.mountOnRestify(server.router);
}

main();
