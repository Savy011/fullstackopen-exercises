import { DiaryEntry } from '../utils/types';

const EntryContent = ({ diaryEntry }: { diaryEntry: DiaryEntry }): JSX.Element => {
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

export default EntryContent
