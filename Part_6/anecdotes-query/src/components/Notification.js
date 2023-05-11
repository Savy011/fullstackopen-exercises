import { useContext } from 'react'
import { NotifContext } from '../NotifReducer'

const Notification = () => {
    const [notif, notifDispatch] = useContext(NotifContext)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 5
    }
    
    if (notif === '') return null

    return (
        <div style={style}>
            {notif}
        </div>
    )
}

export default Notification
