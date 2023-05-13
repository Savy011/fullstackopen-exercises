import React from 'react'
import ReactDOM from 'react-dom/client'
import { NotifContextProvider } from './utils/NotifContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotifContextProvider>
        <App />
    </NotifContextProvider>
)
