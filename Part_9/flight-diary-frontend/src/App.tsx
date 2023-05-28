import { useEffect, useState } from 'react';
import { getAll } from './services/diaryService';
import { DiaryEntry } from './utils/types';
import EntryContent from './components/EntryContent'
import EntryForm from './components/EntryForm';

const App = (): JSX.Element => {
	const [entries, setEntries] = useState<DiaryEntry[]>([])

	useEffect(() => {
		getAll().then(response => setEntries(response))
	}, [])

	return (
	<div>
		<h1>Flight Diary</h1>
		<EntryForm  entries={entries} setEntries={setEntries} />
		<h2>Entries</h2>
		{entries.map(entry => (
			<EntryContent key={entry.id} diaryEntry={entry} />
		))}
	</div>)
}

export default App;
