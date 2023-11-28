import './App.css';

import { memo, useEffect, useState } from 'react';

const { createDirectLine, ReactWebChat } = window['WebChat'];

export default memo(function App() {
  const [directLine, setDirectLine] = useState<any>(undefined);

  useEffect(() => {
    const abortController = new AbortController();

    return () => abortController.abort();
  }, []);

  return <h1>Hello, World!</h1>;
});
