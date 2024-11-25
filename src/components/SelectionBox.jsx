const SelectionBox = ({ label, airports, ...props }) => {
	// console.log(airports);
	return (
		<select className='ui search dropdown' {...props}>
			<option value='' key='empty-option'>
				{label}
			</option>
			{airports.map((airport, index) => (
				<option key={index} value={airport.icao}>
					{airport.name}
				</option>
			))}
		</select>
	);
};
export default SelectionBox;
