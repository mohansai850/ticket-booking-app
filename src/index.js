import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteError from './components/RouteError.jsx';
import Home from './components/Home.jsx';
import { GET_AIRPORTS_URL } from './util/util.js';
import axios from 'axios';
import BookTicket from './components/BookTicket.jsx';

async function loader() {
	const { data } = await axios.get(GET_AIRPORTS_URL, {
		headers: { 'X-Api-Key': 'LAKX+b/+dmxa9HXVw6R7SA==uEJN4S7Y35ZS24Ly' },
	});
	return data;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <RouteError />,
	},
	{
		path: '/BookTicket',
		element: <BookTicket />,
		loader,
	},
	{
		path: '/passengerDetails',
		element: <App />,
		errorElement: <RouteError />,
	},
]);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
