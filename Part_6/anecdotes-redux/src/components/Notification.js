import { useSelector } from "react-redux"

const Notification = () => {
    const notif = useSelector(state => state.notif)

    const style = {
        borderRadius: 5,
        border: 'solid',
        padding: 10,
        borderWidth: 3,
        marginBottom: 10
    }

    if (notif === '') {
        return null
    } else {

    return (
        <div style={style}>
            {notif}
        </div>
    )
    }
}

export default Notification