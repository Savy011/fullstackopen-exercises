import { useEffect, useState } from 'react';
import { getAll } from './services/diaryService';
import { DiaryEntry } from './services/utils/types';

const DiaryEntryContent = ({ diaryEntry }: { diaryEntry: DiaryEntry }): JSX.Element => {
	return (
		<div>
			<h3>{diaryEntry.date}</h3>
			<p><b>Visibility:</b> {diaryEntry.visibility}</p>
			<p><b>Weather:</b> {diaryEntry.weather}</p>
			{diaryEntry.comment
				? (<p><b>Comment:</b> {diaryEntry.comment}</p>)
				: null
			}
		</div>
	)
}

const App = (): JSX.Element => {
	const [entries, setEntries] = useState<DiaryEntry[]>([])

	useEffect(() => {
		getAll().then(response => setEntries(response))
	}, [])

	return (
	<div>
		<h1>Flight Diary</h1>

		<h2>Entries</h2>
		{entries.map(entry => (
			<DiaryEntryContent key={entry.id} diaryEntry={entry} />
		))}
	</div>)
}

export default App;
