const Notif = ({errorMessage}) => {
    if ( !errorMessage ) return null
    
    const style = {
        color: 'red',
        border: 'solid',
        borderRadius : 5,
        padding: 5,
        marginTop: 15,
        width: 'fit-content'
    }
    
    return (
        <div style={style}>
            {errorMessage}
        </div>
)}

export default Notif