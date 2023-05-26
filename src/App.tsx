import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './globalStyles';
import { Main } from './routes/Main';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </QueryClientProvider>
  );
};

export default App;
