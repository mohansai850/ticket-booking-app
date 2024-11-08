import React, { useState } from 'react';
import PassengerDetailsForm, {
	passengerDetailsInitialValues,
} from './components/PassengerDetailsForm';

const App = () => {
	const MAX_PASSENGER_LIMIT = 6;

	const [passengerList, setPassengerList] = useState([
		passengerDetailsInitialValues,
	]);

	const confirmPassenger = (newPassValues, indexToBeAdded) => {
		setPassengerList(
			passengerList.map((originalPass, i) =>
				i === indexToBeAdded ? newPassValues : originalPass
			)
		);
	};

	const removePassenger = (indexToBeRemoved) => {
		passengerList.length > 1 &&
			setPassengerList(
				passengerList.filter((originalPass, i, originalPassList) =>
					indexToBeRemoved === i ? false : true
				)
			);
	};

	const addNewPassenger = () => {
		passengerList.length < MAX_PASSENGER_LIMIT &&
			setPassengerList([...passengerList, passengerDetailsInitialValues]);
	};

	const clearPassanger = (indexToBeCleared) => {
		setPassengerList(
			passengerList.map((originalpass, i) =>
				i === indexToBeCleared ? passengerDetailsInitialValues : originalpass
			)
		);
	};

	return (
		<ol className='ui list'>
			{passengerList.map((passenger, index, passengerList) => {
				const isLastElement = passengerList.length === index + 1;
				return (
					<li key={index}>
						<PassengerDetailsForm
							key={index}
							addNewPassenger={addNewPassenger}
							removePassenger={removePassenger}
							index={index}
							confirmPassenger={confirmPassenger}
							clearPassanger={clearPassanger}
							shouldShowRemovePassenger={index > 0 && isLastElement}
							shouldShowAddPassenger={
								passengerList.length !== MAX_PASSENGER_LIMIT && isLastElement
							}
						/>
					</li>
				);
			})}
		</ol>
	);
};

export default App;
