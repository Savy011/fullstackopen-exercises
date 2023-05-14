import { useNotifValue } from '../utils/NotifContext'

const NotifBox = () => {
    const notif = useNotifValue()

    const style = {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        border: 'solid',
        borderRadius: 10,
        fontFamily: 'monospace',
        fontSize: 18,
    }

    if (notif === '') {
        return null
    }

    return (
        <div style={style}>
            <p>{notif}</p>
        </div>
    )
}

export default NotifBox
