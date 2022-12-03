import InputField from '@frontend/components/InputField/InputField';
import {
  CreateHolidayInput,
  createHolidaySchema,
} from '@frontend/schemas/holiday.schema';
import { createHoliday } from '@frontend/utils/mutations';
import toErrorMap from '@frontend/utils/toErrorMap';
import { toFormikValidationSchema } from '@frontend/utils/toFormikValidationSchema';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import styles from './HolidayForm.module.scss';

const CreateNewHolidayPage = () => {
  const router = useRouter();
  return (
    <div className={styles.holidayForm}>
      <h1>Create new holiday</h1>
      <Formik<CreateHolidayInput>
        validationSchema={toFormikValidationSchema(createHolidaySchema)}
        initialValues={{
          title: '',
          startDate: '',
          endDate: '',
          city: '',
          country: '',
          favourite: false,
          image: '',
          latitude: 0,
          longitude: 0,
          notes: '',
          rating: 0,
          tags: [],
        }}
        onSubmit={async (values, { setErrors }) => {
          // eslint-disable-next-line no-console
          console.log(values);
          const res = await createHoliday({ ...values });

          if (res.errors && res.errors.length > 0) {
            setErrors(toErrorMap(res.errors));
          } else {
            router.push(`/holidays/${res?.data?.id}`);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <InputField
              name="title"
              label="Title"
              type="text"
              placeholder="Title"
              className={styles.holidayName}
            />
            <InputField
              name="startDate"
              label="Start date"
              type="date"
              placeholder="Start date"
              className={styles.holidayName}
            />
            <InputField
              name="endDate"
              label="End date"
              type="date"
              placeholder="End date"
              className={styles.holidayName}
            />
            <InputField
              name="city"
              label="City"
              type="text"
              placeholder="New York"
            />
            <InputField
              name="country"
              label="Country"
              type="text"
              placeholder="United States"
            />
            <InputField
              name="favourite"
              label="Favorite"
              type="checkbox"
              placeholder="Favorite"
            />
            <InputField
              name="tags"
              label="Tags"
              type="text"
              placeholder="Tags (comma separated)"
              onChange={e => {
                setFieldValue('tags', e.target.value.split(','));
              }}
            />

            <InputField
              name="image"
              label="Image"
              type="text"
              placeholder="image"
              onChange={e => {
                setFieldValue('image', e.target.value);
              }}
            />
            <InputField name="latitude" label="Latitude" type="number" />
            <InputField name="longitude" label="Longitude" type="number" />
            <InputField name="notes" label="Notes" type="textarea" />
            <InputField name="rating" label="Rating" type="number" />
            <input type="submit" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default CreateNewHolidayPage;
