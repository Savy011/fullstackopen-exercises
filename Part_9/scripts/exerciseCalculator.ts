import { sum } from 'lodash';
import { errorhandler } from './utils';

interface ExerciseOutput {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
}

const parseArguments = (args: string[]) => {
	const target = Number(args.pop());
	const exerciseHours = args.map(e => {
		if (!isNaN(Number(e))){
			return Number(e);
		} else {
			throw new Error('Exercise hours should be numeric values');
		}
	}).filter(x => x !== undefined).slice(0, -1);
	
	if (!isNaN(target) && Array(exerciseHours)) {
		return {
			exerciseHours: exerciseHours,
			target: target
		};
	} else {
		throw new Error('Arguments were not of the expected type');
	}
};

const calculateExercises = (exHours: number[], target: number): ExerciseOutput => {
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

try {
	const args = parseArguments(process.argv);
	console.log(args);
	console.log(calculateExercises(args.exerciseHours, args.target));
} catch (error) {
	errorhandler(error);
}
