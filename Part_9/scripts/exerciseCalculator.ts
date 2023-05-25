import { sum } from 'lodash';
import { errorhandler } from './utils';

interface ExerciseValue {
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
			return;
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

const calculateExercises = (exHours: number[], target: number): ExerciseValue => {
	const periodLength = exHours.length;
	const average = sum(exHours) / exHours.length;
	const trainingDays = exHours.filter(e => e !== 0).length;
	const success = target >= average ? true : false;
	
	let rating;
	let ratingDescription;

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
		rating,
		ratingDescription,
	};
};

try {
	const args = parseArguments(process.argv);
	console.log(args);
	console.log(calculateExercises(args.exerciseHours, args.target));
} catch (error) {
	errorhandler(error);
}
