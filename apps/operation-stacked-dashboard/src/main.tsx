import React, { StrictMode, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { globalStyles } from '@operation-stacked/shared-styles';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GlobalStyleInjector />
      <App />
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

function GlobalStyleInjector() {
  useEffect(() => {
    Object.assign(document.body.style, globalStyles.body);
  }, []);

  return null;
}
