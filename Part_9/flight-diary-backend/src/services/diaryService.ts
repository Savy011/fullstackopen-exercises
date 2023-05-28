import diaryData from '../../data/entries';
import toNewDiary from '../utils';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntries } from '../types';

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
	return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntries[] => {
	return diaries.map(({ id, date, weather, visibility }) => ({
		id,
		date,
		weather,
		visibility
	}));
};

const addDiary = ( entry: NewDiaryEntry): DiaryEntry => {
	const newDiaryEntry = toNewDiary({
		id: Math.max(...diaries.map(d => d.id)) + 1,
		...entry
	});

	diaries.push(newDiaryEntry);
	return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
	const entry = diaries.find(d => d.id === id);

	return entry;
};

export default {
	getEntries,
	addDiary,
	getNonSensitiveEntries,
	findById
};
