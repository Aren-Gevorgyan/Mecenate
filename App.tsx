import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeedScreen } from './src/components/FeedScreen';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FeedScreen />
    <StatusBar style="dark" />
  </QueryClientProvider>
);

export default App;
