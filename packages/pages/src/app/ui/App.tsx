import './App.css';

import {
  TestCanvasBotStrategy,
  createHalfDuplexChatAdapter,
  toDirectLineJS
} from 'copilot-studio-direct-to-engine-chat-adapter';
import { onErrorResumeNext } from 'on-error-resume-next';
import React, { memo, useEffect, useRef, type ReactNode } from 'react';
import YAML from 'yaml';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { createDirectLine, renderWebChat } = (window as any)['WebChat'];
const IS_LOCAL = false;

export default memo(function App() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    (async function () {
      const res = await fetch('https://webchat-streamingbot.azurewebsites.net/api/token/directline', {
        method: 'POST',
        signal
      });

      if (!res.ok) {
        console.error(`Failed to fetch token, server returned ${res.status}.\n\n${await res.text()}`);
      }

      const { token } = await res.json();

      if (signal.aborted) {
        return;
      }

      const directLine = createDirectLine({ token });

      const localDirectLine = toDirectLineJS(
        createHalfDuplexChatAdapter(
          new TestCanvasBotStrategy({
            botId: 'dummy',
            environmentId: 'dummy',
            async getToken() {
              return 'dummy';
            },
            islandURI: new URL('http://localhost:3980'),
            transport: 'server sent events'
          })
        )
      );

      const attachmentMiddleware =
        () =>
        (next: (...args: unknown[]) => ReactNode) =>
        (...args: unknown[]) => {
          const [{ attachment }] = args as [{ attachment: { content: string; contentType: string } }];

          if (attachment.contentType === 'application/vnd.microsoft.card.adaptive+yaml') {
            const content =
              onErrorResumeNext(() => YAML.parse(attachment.content)) ??
              onErrorResumeNext(() => YAML.parse(attachment.content.split('\n').slice(0, -1).join('\n'))) ??
              '';

            console.log(attachment.content);

            return next({
              ...args,
              attachment: { content, contentType: 'application/vnd.microsoft.card.adaptive' }
            });
          }

          return next(...args);
        };

      renderWebChat({ attachmentMiddleware, directLine: IS_LOCAL ? localDirectLine : directLine }, divRef.current);
    })();

    return () => abortController.abort();
  }, [divRef]);

  return <div className="app" ref={divRef} />;
});
