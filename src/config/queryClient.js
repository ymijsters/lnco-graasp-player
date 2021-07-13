import configureQueryClient from '@graasp/query-client';
import notifier from '../middlewares/notifier';
import { API_HOST } from './constants';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  ws,
  useMutation,
  ReactQueryDevtools,
} = configureQueryClient({
  API_HOST,
  notifier,
  enableWebsocket: true,
});
export {
  queryClient,
  QueryClientProvider,
  hooks,
  ws,
  useMutation,
  ReactQueryDevtools,
};
