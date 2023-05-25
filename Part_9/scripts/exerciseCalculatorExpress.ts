import { sum } from 'lodash';

export interface ExerciseOutput {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
}

export const calculateExercises = (exHours: number[], target: number): ExerciseOutput => {
	const periodLength = exHours.length;
	const average = sum(exHours) / exHours.length;
	const trainingDays = exHours.filter(e => e !== 0).length;
	const success = target >= average ? true : false;
	
	let rating: number = 0;
	let ratingDescription: string = '';

	if (target > average) {
		rating = 1;
		ratingDescription = 'Nice effort, but there\'s room for improvement!';
	} else if (target === average) {
		rating = 2;
		ratingDescription = 'Impressive work!';
	} else if (target < average) {
		rating = 3;
		ratingDescription = 'Woah! You did pretty good!';
	}

	return {
		periodLength,
		average: Number(average.toFixed(2)),
		trainingDays,
		target,
		success,
		rating: rating,
		ratingDescription: ratingDescription,
	};
};
