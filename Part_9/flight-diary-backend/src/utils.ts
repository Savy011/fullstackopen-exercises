import { NewDiaryEntry, Visibility, Weather } from './types';

const toNewDiary = (object: unknown): NewDiaryEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or Missing Data');
	}

	if ('comment' in object && 'weather' in object && 'visibility' in object && 'date' in object) {
		const newEntry: NewDiaryEntry = {
			comment: parseComment(object.comment),
			weather: parseWeather(object.weather),
			visibility: parseVisibility(object.visibility),
			date: parseDate(object.date),
		};

		return newEntry;
	}

	throw new Error('Incorrect Data: Some Fields Are Missing');
};

const parseComment = (comment: unknown): string => {
	if (!isString(comment)) {
		throw new Error('Incorrect or Missing Comment');
	}

	return comment;
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error('Incorrect or Missing Date' + date);
	}

	return date;
};

const parseWeather = (weather: unknown): Weather => {
	if (!isString(weather) || !isWeather(weather)) {
		throw new Error('Incorrect or Missing Weather');
	}

	return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
	if (!isString(visibility) || !isVisibility(visibility)) {
		throw new Error('Incorrect or Missing Visibility');
	}

	return visibility;
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isWeather = (param: string): param is Weather => {
	return Object.values(Weather).map(v => v.toString()).includes(param);
};

const isVisibility = (param: string): param is Visibility => {
	return Object.values(Visibility).map(v => v.toString()).includes(param);
};

export default toNewDiary;
