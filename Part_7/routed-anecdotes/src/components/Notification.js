const Notification = ({ notification }) => {
    const style = {
        padding: 10,
        margin: 10,
        border: 'solid',
        borderRadius: 5,
        borderWidth: 3
    }

    if (notification === '') return null

    return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification