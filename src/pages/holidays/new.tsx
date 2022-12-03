import InputField from '@frontend/components/InputField/InputField';
import Page from '@frontend/components/Page/Page';
import withAuth from '@frontend/hocs/withAuth';
import {
  CreateHolidayInput,
  createHolidaySchema,
} from '@frontend/schemas/holiday.schema';
import uploadImage from '@frontend/utils/cloudinary';
import { createHoliday, createImageSignature } from '@frontend/utils/mutations';
import toErrorMap from '@frontend/utils/toErrorMap';
import { toFormikValidationSchema } from '@frontend/utils/toFormikValidationSchema';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './HolidayForm.module.scss';

const CreateNewHolidayPage = () => {
  const [previewImage, setPreviewImage] = useState<string>('');
  const router = useRouter();
  return (
    <Page>
      <div>
        <Formik<CreateHolidayInput>
          validationSchema={toFormikValidationSchema(createHolidaySchema)}
          initialValues={{
            title: '',
            startDate: '',
            endDate: '',
            city: '',
            image: '',
            country: '',
            notes: '',
            rating: 0,
            tags: [],
          }}
          onSubmit={async (values, { setErrors }) => {
            // eslint-disable-next-line no-console
            console.log(values);
            const { timestamp, signature } = await createImageSignature();
            if (timestamp && signature) {
              const imageData = await uploadImage(
                values.image as unknown as File,
                signature,
                parseInt(timestamp, 10),
              );

              const res = await createHoliday({
                ...values,
                image: imageData.secure_url,
              });

              if (res.errors && res.errors.length > 0) {
                setErrors(toErrorMap(res.errors));
              } else {
                router.push(`/holidays/${res?.data?.id}`);
              }
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
                name="tags"
                label="Tags"
                type="text"
                placeholder="Tags (comma separated)"
                onChange={e => {
                  setFieldValue('tags', e.target.value.split(','));
                }}
              />

              <input
                name="image"
                // label="Image"
                type="file"
                placeholder="Image"
                accept="image/*"
                onChange={({ target: { validity, files } }) => {
                  if (validity.valid && files) {
                    const file = files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFieldValue('image', reader.result);
                      setPreviewImage(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {previewImage && (
                <div className="max-w-sm">
                  <img src={previewImage} alt="some text" width="100%" />
                </div>
              )}

              <InputField name="notes" label="Notes" type="textarea" />
              <InputField name="rating" label="Rating" type="number" />
              <input type="submit" disabled={isSubmitting} />
            </Form>
          )}
        </Formik>
      </div>
    </Page>
  );
};
export default withAuth(CreateNewHolidayPage);
