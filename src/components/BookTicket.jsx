import { useLoaderData } from 'react-router-dom';
import SelectionBox from './SelectionBox';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

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

const BookTicket = () => {
	const airports = useLoaderData();

	return (
		<Formik
			initialValues={bookTicketInitialValues}
			validate={bookTicketValidation}
			validationSchema={bookTicketFormSchema}
			onSubmit={(values) => {
				console.log(values);
			}}
		>
			{({ errors, setFieldValue, ...props }) => {
				// console.log(props.values.date, maxFormattedDate);
				return (
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
				);
			}}
		</Formik>
	);
};
export default BookTicket;
