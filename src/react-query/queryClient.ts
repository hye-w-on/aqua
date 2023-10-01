import { QueryClient } from 'react-query';

function queryErrorHandler(error: unknown): void {
  //
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
});
