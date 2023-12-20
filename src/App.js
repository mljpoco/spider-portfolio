import Main from './Components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import './styles.scss';
import { QueryClientProvider, QueryClient } from 'react-query'

export default function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </QueryClientProvider>
  );
}