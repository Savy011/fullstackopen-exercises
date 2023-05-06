import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)

const App = () => {
	const good = () => {
		store.dispatch({ type: 'GOOD' })
	}
	const okay = () => {
		store.dispatch({ type: 'OK' })
	}
	const bad = () => {
		store.dispatch({ type: 'BAD' })
	}
	const reset = () => {
		store.dispatch({ type: 'ZERO' })
	}

	return (
		<div>
			<button onClick={good}>Good</button>&nbsp;
			<button onClick={okay}>Okay</button>&nbsp;
			<button onClick={bad}>Bad</button>&nbsp;
			<button onClick={reset}>Reset</button>&nbsp;
			
			<div>Good: {store.getState().good}</div>
			<div>Okay: {store.getState().ok}</div>
			<div>Bad: {store.getState().bad}</div>
		</div>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
	root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
