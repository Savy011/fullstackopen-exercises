const Content = ({ peopleToShow }) => {
	return (
		<div>
			{peopleToShow.map((item) => 
				<p key={item.id}>{item.id}&#41; {item.name} {item.number}</p>
			)}
		</div>
	)
}

export default Content
