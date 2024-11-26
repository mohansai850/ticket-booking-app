const ErrorPage = ({
	status = 500,
	statusText = 'Internal error',
	message = 'Something went wrong!',
}) => {
	return (
		<>
			<div>{status}</div>
			<div>{statusText}</div>
			<div>{message}</div>
		</>
	);
};

export default ErrorPage;
