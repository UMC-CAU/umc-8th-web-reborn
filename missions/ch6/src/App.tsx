import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 애플리케이션 컴포넌트 페이지 컴포넌트 등등 */}
    </QueryClientProvider>
  );
}
export default App;