import { Link } from 'react-router-dom';

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
