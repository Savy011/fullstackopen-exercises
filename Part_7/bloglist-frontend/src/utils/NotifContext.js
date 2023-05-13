import { useReducer, createContext } from 'react'

const notifReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
    const [notif, notifDispatch] = useReducer(notifReducer, '')

    return (
        <NotifContext.Provider value={[notif, notifDispatch]}>
            {props.children}
        </NotifContext.Provider>
    )
}

export default NotifContext
