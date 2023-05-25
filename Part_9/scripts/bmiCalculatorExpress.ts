interface bmiOutput {
	bmi: number,
	bmiRemark: string
}

export const calculateBmi = (height: number, weight: number): bmiOutput => {
	const bmi: number = (weight / (height * height)) * 10000;
	let bmiRemark;

	if (bmi < 16) {
		bmiRemark = 'You are Severely Under-Weight 💀';
	} else if (16 < bmi && bmi < 18.4) {
		bmiRemark = 'You are Under-Weight 😥';
	} else if (18.5 < bmi && bmi < 24.9) {
		bmiRemark = 'You are Healthy 😁';
	} else if (25 < bmi && bmi < 29.9) {
		bmiRemark = 'You are Over-Weight 😳';
	} else if (30 < bmi && bmi < 34.9) {
		bmiRemark = 'You are Moderately Obese 😰';
	} else if (35 < bmi && bmi < 39.9) {
		bmiRemark = 'You are Severely Obese 😨';
	} else if (bmi > 40) {
		bmiRemark = 'You are Morbidly Obese 💀';
	} else {
		throw new Error('Error occured while calculating BMI');
	}

	return { bmi: Number(bmi.toFixed(2)), bmiRemark };
};
