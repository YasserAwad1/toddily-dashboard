import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JawadAuthControllerProvider } from './context';

const client = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        <QueryClientProvider client={client}>
          <JawadAuthControllerProvider>
            <App />
          </JawadAuthControllerProvider>
        </QueryClientProvider>
  </BrowserRouter>
);
