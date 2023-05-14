import { useReducer, createContext, useContext } from 'react'

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

export const NotifContextProvider = props => {
    const [notif, notifDispatch] = useReducer(notifReducer, '')

    return (
        <NotifContext.Provider value={[notif, notifDispatch]}>
            {props.children}
        </NotifContext.Provider>
    )
}

export const useNotification = () => {
    // eslint-disable-next-line no-unused-vars
    const [notif, notifDispatch] = useContext(NotifContext)

    const setNotif = (message, time) => {
        notifDispatch({ type: 'SET', payload: message })
        setTimeout(() => {
            notifDispatch({ type: 'CLEAR' })
        }, time)
    }

    return setNotif
}

export default NotifContext
