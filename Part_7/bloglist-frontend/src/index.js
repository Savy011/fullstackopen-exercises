import React from 'react'
import ReactDOM from 'react-dom/client'
import { NotifContextProvider } from './utils/NotifContext'
import { UserContextProvider } from './utils/UserContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <UserContextProvider>
            <NotifContextProvider>
                <App />
            </NotifContextProvider>
        </UserContextProvider>
    </QueryClientProvider>
)
