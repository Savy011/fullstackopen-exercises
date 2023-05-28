import React, { useState } from 'react';
import { postEntry } from '../services/diaryService';
import { DiaryEntry } from '../utils/types';

const EntryForm = ({ entries, setEntries }: { entries: DiaryEntry[], setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>> }) => {
	const [date, setDate] = useState('')
	const [visibility, setVisibility] = useState('')
	const [weather, setWeather] = useState('')
	const [comment, setComment] = useState('')

	const handleSubmit = (event: React.SyntheticEvent) => {
			event.preventDefault()
			console.log('Adding Entry')
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			postEntry({ date, visibility , weather, comment}).then(newEntry => {
				setEntries(entries.concat(newEntry))
			})
			setDate('')
			setWeather('')
			setVisibility('')
			setComment('')
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<p>
					Date: &nbsp;
					<input value={date} onChange={e => setDate(e.target.value)} />
				</p>
				<p>
					Weather: &nbsp;
					<input value={weather} onChange={e => setWeather(e.target.value)} />
				</p>
				<p>
					Visibility: &nbsp;
					<input value={visibility} onChange={e => setVisibility(e.target.value)} />
				</p>
				<p>
					Comment: &nbsp;
					<input value={comment} onChange={e => setComment(e.target.value)} />
				</p>
				<button type="submit">Add Entry</button>
			</form>
		</div>
	)
}

export default EntryForm
