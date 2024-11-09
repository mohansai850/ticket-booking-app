import { useRouteError } from 'react-router-dom';

const RouteError = () => {
	const {
		error: { message },
		status,
		statusText,
	} = useRouteError();
	return (
		<>
			<div>{status}</div>
			<div>{statusText}</div>
			<div>{message}</div>
		</>
	);
};
export default RouteError;
