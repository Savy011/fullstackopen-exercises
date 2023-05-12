const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <p>
                Has {anecdote.votes} Votes
            </p>
            <p>
                For more info see: <a href={anecdote.info} target="_blank">{anecdote.info}</a>
            </p>
        </div>
    )
}

export default Anecdote