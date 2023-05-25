import { errorhandler } from './utils';

interface bmiValues {
	height: number,
	weight: number
}

const parseArgs = (args: string[]): bmiValues => {
	if (args.length > 4) throw new Error('Too Many Arguments');
	if (args.length < 4) throw new Error('Not Enough Arguments');

	if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3])
		};
	} else {
		throw new Error('Provided Values are not Numbers');
	}
};

const calculateBmi = (height: number, weight: number): string => {
	const bmi: number = (weight / (height * height)) * 10000;
	console.log('Your BMI is:', bmi.toPrecision(4));

	if (bmi < 16) {
		return 'You are Severely Under-Weight 💀';
	} else if (16 < bmi && bmi < 18.4) {
		return 'You are Under-Weight 😥';
	} else if (18.5 < bmi && bmi < 24.9) {
		return 'You are Healthy 😁';
	} else if (25 < bmi && bmi < 29.9) {
		return 'You are Over-Weight 😳';
	} else if (30 < bmi && bmi < 34.9) {
		return 'You are Moderately Obese 😰';
	} else if (35 < bmi && bmi < 39.9) {
		return 'You are Severely Obese 😨';
	} else if (bmi > 40) {
		return 'You are Morbidly Obese 💀';
	} else {
		throw new Error('Error occured while calculating BMI');
	}
};

try {
	const { height, weight } = parseArgs(process.argv);
	console.log(calculateBmi(height, weight));
} catch (error) {
	errorhandler(error);
}
