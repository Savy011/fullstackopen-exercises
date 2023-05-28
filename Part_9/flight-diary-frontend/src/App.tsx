import { useEffect, useState } from 'react';
import { getAll } from './services/diaryService';
import { DiaryEntry } from './utils/types';
import EntryContent from './components/EntryContent'
import EntryForm from './components/EntryForm';
import Notification from './components/Notification';

const App = (): JSX.Element => {
	const [entries, setEntries] = useState<DiaryEntry[]>([])
	const [notif, setNotif] = useState<string>('')
	
	useEffect(() => {
		getAll().then(response => setEntries(response))
	}, [])

	const setNotification = (message: string) => {
		setNotif(message)
		setTimeout(() => {
			setNotif('')
		}, 5000)
	}

	return (
	<div>
		<h1>Flight Diary</h1>
		<Notification notif={notif} />
		<EntryForm  entries={entries} setEntries={setEntries} setNotification={setNotification} />
		<h2>Entries</h2>
		{entries.map(entry => (
			<EntryContent key={entry.id} diaryEntry={entry} />
		))}
	</div>)
}

export default App;
