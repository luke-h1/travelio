import { RegisterInput, registerSchema } from '@frontend/schemas/auth.schema';
import { auth } from '@frontend/utils/mutations';
import toErrorMap from '@frontend/utils/toErrorMap';
import { toFormikValidationSchema } from '@frontend/utils/toFormikValidationSchema';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InputField from '../../components/InputField';

const RegisterPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <h2>Register</h2>
      <Formik<RegisterInput>
        validationSchema={toFormikValidationSchema(registerSchema)}
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          bio: '',
          passwordConfirmation: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await auth({
            ...values,
          });

          if (res.errors && res.errors.length > 0) {
            setErrors(toErrorMap(res.errors));
          }

          router.push('/auth/login');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="First Name"
              name="firstName"
              placeholder="First Name"
              type="text"
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              type="text"
            />
            <InputField
              label="username"
              name="username"
              placeholder="username"
              type="username"
            />
            <InputField
              label="email"
              name="email"
              placeholder="Email"
              type="email"
            />
            <InputField
              label="password"
              name="password"
              placeholder="Password"
              type="password"
            />

            <InputField
              label="confirm password"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              type="password"
            />
            <InputField label="bio" name="bio" placeholder="bio" type="bio" />
            <input type="submit" disabled={isSubmitting} />
            <div
              className="df df-fc df-ai-s df-jc-c"
              style={{ marginTop: '1rem', marginBottom: '1rem' }}
            >
              <p className="text-left">
                Already have an account? <Link href="/auth/login">Login</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegisterPage;
