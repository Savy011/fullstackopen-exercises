import { DiaryEntry, Visibility, Weather } from './types';

const toNewDiary = (object: unknown): DiaryEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or Missing Data');
	}

	if ('comment' in object && 'weather' in object && 'visibility' in object && 'date' in object && 'id' in object) {
		const newEntry: DiaryEntry = {
			id: parseNumber(object.id),
			comment: parseComment(object.comment),
			weather: parseWeather(object.weather),
			visibility: parseVisibility(object.visibility),
			date: parseDate(object.date),
		};
		return newEntry;
	} else {
		throw new Error('Incorrect Data: Some Fields Are Missing');
	}

};

const parseNumber = (id: unknown): number => {
	if (!isNumber(id)) {
		throw new Error('Incorrect or Missing ID');
	}

	return id;
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

const isNumber = (number: unknown): number is number => {
	return typeof number === 'number';
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isWeather = (param: string): param is Weather => {
	return Object.values(Weather).map(v => v.toString().toLowerCase()).includes(param.toLowerCase());
};

const isVisibility = (param: string): param is Visibility => {
	return Object.values(Visibility).map(v => v.toString()).includes(param);
};

export default toNewDiary;
