import React from 'react';
import ReactDOM from 'react-dom/client';
import "react-loading-skeleton/dist/skeleton.css";
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const query = new QueryClient()
root.render(
    <QueryClientProvider client={query}>
    <App />
    </QueryClientProvider>
);
