import axios from 'axios';
import { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { GET_AIRPORTS_URL } from '../util/util';

const Home = () => {
	return (
		<>
			{/* <div> */}
			<Link to={'/BookTicket'}>
				<button class='ui primary button'>Book Ticket</button>
			</Link>
			{/* </div> */}
			{/* <div> */}
			<Link to={'/passengerDetails'}>
				<button class='ui primary button'>App Component</button>
			</Link>
			{/* </div> */}
		</>
	);
};
export default Home;
