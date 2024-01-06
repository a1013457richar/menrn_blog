import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { QueryClientProvider ,QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <App />
    </Provider>
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
