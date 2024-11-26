import { useLoaderData } from 'react-router-dom';
import SelectionBox from './SelectionBox';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useState } from 'react';
import ErrorPage from './ErrorPage';

const dateFormat = 'YYYY-MM-DD';
const todayDate = new Date();
const todayFormattedDate = moment(todayDate).format(dateFormat);
const maxFormattedDate = moment().add(60, 'days').format(dateFormat);

const bookTicketInitialValues = {
	from: '',
	to: '',
	date: todayFormattedDate,
};

const bookTicketFormSchema = Yup.object().shape({
	from: Yup.string().required('From Airport is Required'),
	to: Yup.string().required('To Airport is Required'),
	date: Yup.date().required('Please select Date of Journey'),
});

const bookTicketValidation = (values) => {
	if (values.from === values.to)
		return {
			to: 'from and to airports cannot be same',
		};
	return {};
};

const postCallPromise = (values) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (true)
				resolve(
					`Successfully fetched flights between ${values.from} and ${values.to} for ${values.date}`
				);
			else {
				reject(new Error('Sorry, something went wrong!'));
			}
		}, 5000);
	});

const BookTicket = () => {
	const [showErrorPage, setShowErrorPage] = useState(false);
	const [showFlightResultsPage, setShowFlightResultsPage] = useState(false);
	const airports = useLoaderData();

	return (
		<Formik
			initialValues={bookTicketInitialValues}
			validate={bookTicketValidation}
			validationSchema={bookTicketFormSchema}
			onSubmit={(values) => {
				setShowErrorPage(false);
				setShowFlightResultsPage(false);
				postCallPromise(values)
					.then((res) => {
						setShowFlightResultsPage(true);
					})
					.catch((err) => {
						setShowErrorPage(true);
					});
			}}
		>
			{({ values, errors, setFieldValue, validateForm, ...props }) => {
				// console.log(values);
				return (
					<>
						<Form>
							<div>
								<Field
									name='from'
									as={SelectionBox}
									label='from'
									airports={airports}
								/>
								<ErrorMessage name='from' />
							</div>
							<div>
								<button
									type='button'
									onClick={() => {
										let fromValue = values.from;
										setFieldValue('from', values.to);
										setFieldValue('to', fromValue);
										validateForm();
									}}
								>
									swap
								</button>
							</div>
							<div>
								<Field
									name='to'
									as={SelectionBox}
									label='to'
									airports={airports}
								/>
								<ErrorMessage name='to' />
							</div>
							<div>
								<Field
									name='date'
									type='date'
									min={todayFormattedDate}
									max={maxFormattedDate}
								/>
								<ErrorMessage name='date' />
							</div>
							<button
								className='ui primary button'
								type='submit'
								disabled={errors.from || errors.to || errors.date}
							>
								Search
							</button>
							<button className='ui button' type='reset'>
								Reset
							</button>
						</Form>
						{showFlightResultsPage && 'flights results here...'}
						{showErrorPage && (
							<ErrorPage
								statusText='Error occured while fetching flights'
								message='Please try again'
							/>
						)}
					</>
				);
			}}
		</Formik>
	);
};
export default BookTicket;
