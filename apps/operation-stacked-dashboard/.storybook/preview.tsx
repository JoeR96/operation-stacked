import { initialize, mswDecorator } from 'msw-storybook-addon';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

initialize({ onUnhandledRequest: 'bypass' });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const decorators = [
  mswDecorator, // Add this decorator to enable MSW in Storybook
  (Story) => {
    React.useEffect(() => {
      return () => queryClient.clear();
    }, []);

    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  },
];
