const Notification = ({ notif }: { notif: string }) => {
	const style = {
		color: 'red',
		width: 'fit-content',
		border: 'solid',
		borderColor: 'red',
		borderRadius: 5,
		padding: 5
	}

	if (notif === '') return null;

	return (
		<div style={style}>
			{notif}
		</div>
	)
}

export default Notification
