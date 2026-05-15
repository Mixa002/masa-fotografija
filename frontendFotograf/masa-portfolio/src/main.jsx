import { StrictMode } from 'react'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // OVO JE KLJUČNO
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter> {/* Ovde mora početi ruter */}
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
