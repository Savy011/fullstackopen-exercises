import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { postEntry } from '../services/diaryService';
import { DiaryEntry, Visibility } from '../utils/types';
import { Weather } from '../utils/types';

const EntryForm = ({
	entries,
	setEntries,
	setNotification
}: {
	entries: DiaryEntry[],
	setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>,
	setNotification: (message: string) => void }
) => {
	const [date, setDate] = useState('')
	const [visibility, setVisibility] = useState('')
	const [weather, setWeather] = useState('')
	const [comment, setComment] = useState('')
	
	const style = {
		borderColor: '#000a',
		borderRadius: 10,
		width: 'initial',
		paddingTop: 10,
		paddingBottom: 10,
		marginBottom: 5
	}
	
	const handleSubmit = async (event: React.SyntheticEvent) => {
			event.preventDefault()
			const newEntry = { date, visibility, weather, comment }
			const postedEntry = await postEntry(newEntry)
			if (postedEntry instanceof AxiosError) {
					setNotification(postedEntry.response?.data.error)
					console.log(postedEntry.response?.data.error)
			} else {
				if (!(postedEntry instanceof Error)) {
					setEntries(entries.concat(postedEntry))
				} else {
					setNotification(postedEntry.message)
				}
            }
			setDate('')
			setWeather('')
			setVisibility('')
			setComment('')

	}

	return (
		<div>
			<form onSubmit={handleSubmit} style={{ padding: 10, width: 'fit-content' }}>
				<fieldset style={style}>
					<legend>Date</legend>
					<input type='date' name='date' onChange={e => setDate(e.target.value)}/>
					<br/>
				</fieldset>
				<fieldset style={style}>
					<legend>Weather</legend>
					<div>
						<input
							name='weather'
							type='radio'
							value={Weather.Rainy}
							onChange={e => setWeather(e.target.value)}
						/>
						<label htmlFor={Weather.Rainy} >Rainy</label>
						<br/>
						
						<input
							name='weather'
							type='radio'
							value={Weather.Sunny}
							onChange={e => setWeather(e.target.value)}
						/>
						<label htmlFor={Weather.Sunny} >Sunny</label>
						<br/>
						
						<input 
							name='weather'
							type='radio'
							value={Weather.Windy}
							onChange={e => setWeather(e.target.value)}
						/>
						<label htmlFor={Weather.Windy} >Windy</label>
						<br/>
						
						<input 
							name='weather'
							type='radio'
							value={Weather.Cloudy}
							onChange={e => setWeather(e.target.value)}
						/>
						<label htmlFor={Weather.Cloudy} >Cloudy</label>
						<br/>
						
						<input 
							name='weather' 
							type='radio' 
							value={Weather.Stormy} 
							onChange={e => setWeather(e.target.value)}
						/>
						<label htmlFor={Weather.Stormy} >Stormy</label>
						<br/>
					</div>
				</fieldset>
				<fieldset style={style}>
					<legend>Visibility</legend>
					<div>
						<input
							name='visibility' 
							type='radio' 
							value={Visibility.Poor} 
							onChange={e => setVisibility(e.target.value)}
						/>
						<label htmlFor={Visibility.Poor} >Poor</label>
						<br/>
						
						<input
							name='visibility' 
							type='radio' 
							value={Visibility.Ok} 
							onChange={e => setVisibility(e.target.value)}
						/>
						<label htmlFor={Visibility.Ok} >Ok</label>
						<br/>
						
						<input
							name='visibility' 
							type='radio' 
							value={Visibility.Good}
							onChange={e => setVisibility(e.target.value)}
						/>
						<label htmlFor={Visibility.Good}>Good</label>
						<br/>
						
						<input
							name='visibility' 
							type='radio' 
							value={Visibility.Great} 
							onChange={e => setVisibility(e.target.value)}
						/>
						<label htmlFor={Visibility.Great} >Great</label>
						<br/>
					</div>
				</fieldset>
				<fieldset style={style}>
					<legend>Comment</legend>
					<input value={comment} onChange={e => setComment(e.target.value)} />
				</fieldset>
				<p><button type="submit" style={{ padding: 15, width: '100%', borderRadius: 10 }}>Add Entry</button></p>
			</form>
		</div>
	)
}

export default EntryForm
