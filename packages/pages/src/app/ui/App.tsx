import './App.css';

import { memo, useEffect, useRef } from 'react';

const { createDirectLine, renderWebChat } = window['WebChat'];

export default memo(function App() {
  const divRef = useRef<HTMLDivElement>();

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

      renderWebChat({ directLine }, divRef.current);
    })();

    return () => abortController.abort();
  }, [divRef]);

  return <div className="app" ref={divRef} />;
});
