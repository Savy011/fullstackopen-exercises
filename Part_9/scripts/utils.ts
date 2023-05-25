export const errorhandler = (error: unknown) => {
	let errorMessage = 'Something Went Wrong!';

	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}

	console.log(errorMessage);
};
