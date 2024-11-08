import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

export const passengerDetailsInitialValues = {
	firstName: '',
	lastName: '',
	age: '',
	gender: '',
};

const passengerValidationSchema = Yup.object().shape({
	firstName: Yup.string()
		.matches(/^[A-Za-z ]*$/, 'Please enter valid name')
		.min(2, 'Too Short!')
		.max(20, 'Too Long!')
		.required('Required'),
	lastName: Yup.string()
		.matches(/^[A-Za-z ]*$/, 'Please enter valid name')
		.min(2, 'Too Short!')
		.max(20, 'Too Long!')
		.required('Required'),
	age: Yup.number()
		.min(0.1, 'Age cannot be zero and negative')
		.required('Required'),
	gender: Yup.string().required('Gender is Mandatory'),
});

const PassengerDetailsForm = ({
	addNewPassenger,
	removePassenger,
	shouldShowAddPassenger,
	shouldShowRemovePassenger,
	index,
	confirmPassenger,
	clearPassanger,
}) => {
	const [isPassConfirmed, setIsPassConfirmed] = useState(false);
	return (
		<>
			<Formik
				initialValues={passengerDetailsInitialValues}
				validationSchema={passengerValidationSchema}
			>
				{({ values, dirty, isValid, handleReset }) => (
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							confirmPassenger(values, index);
						}}
					>
						{/* {console.log(typeof shouldShowRemovePassenger)} */}
						<div className='ui input focus'>
							<Field
								name='firstName'
								placeholder='First Name'
								disabled={isPassConfirmed}
							/>
							<ErrorMessage name='firstName' />
						</div>
						<div className='ui input focus'>
							<Field
								name='lastName'
								placeholder='Last Name'
								disabled={isPassConfirmed}
							/>
							<ErrorMessage name='lastName' />
						</div>
						<div className='ui input focus'>
							<Field
								name='age'
								type='number'
								placeholder='Age'
								disabled={isPassConfirmed}
							/>
							<ErrorMessage name='age' />
						</div>
						<label>
							<Field
								name='gender'
								type='radio'
								value='male'
								disabled={isPassConfirmed}
							/>
							Male
						</label>
						<label>
							<Field
								name='gender'
								type='radio'
								value='female'
								disabled={isPassConfirmed}
							/>
							Female
						</label>
						{!isPassConfirmed && (
							<button
								type='submit'
								className='ui primary button'
								onClick={() => {
									confirmPassenger(values, index);
									setIsPassConfirmed(true);
								}}
								disabled={
									!isValid ||
									!values.firstName ||
									!values.lastName ||
									!values.age ||
									!values.gender
								}
							>
								Confirm Passenger
							</button>
						)}
						<button
							type='button'
							className='ui primary button'
							onClick={() => {
								clearPassanger(index);
								handleReset();
								setIsPassConfirmed(false);
							}}
							disabled={
								!dirty &&
								!values.firstName &&
								!values.lastName &&
								!values.age &&
								!values.gender
							}
						>
							Clear Passenger
						</button>
						{shouldShowRemovePassenger && (
							<button
								type='button'
								className='ui button'
								onClick={() => {
									removePassenger(index);
								}}
							>
								Remove Passenger
							</button>
						)}
						{shouldShowAddPassenger && (
							<button
								type='button'
								className='ui primary button'
								onClick={addNewPassenger}
							>
								Add One More Passenger
							</button>
						)}
					</Form>
				)}
			</Formik>
		</>
	);
};

export default PassengerDetailsForm;
