import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../utils/types';

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAll = async () => {
	const response = await axios.get<DiaryEntry[]>(baseUrl)
	
	return response.data
}

export const postEntry = async (entryObject: NewDiaryEntry) => {
	try {
		const response = await axios.post<DiaryEntry>(baseUrl, entryObject)

		return response.data
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return error
		} else {
			return error as Error
		}
	}
}
