import { LoginInput, loginSchema } from '@frontend/schemas/auth.schema';
import { auth } from '@frontend/utils/mutations';
import toErrorMap from '@frontend/utils/toErrorMap';
import { toFormikValidationSchema } from '@frontend/utils/toFormikValidationSchema';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InputField from '../../components/InputField/InputField';
import styles from './Login.module.scss';

const LoginPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  return (
    <div className={classNames(styles.login, 'df df-fc df-ai-s df-jc-c')}>
      <h2>Login</h2>
      <Formik<LoginInput>
        validationSchema={toFormikValidationSchema(loginSchema)}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await auth('login', {
              ...values,
            });

            if (res.errors && res.errors.length > 0) {
              setErrors(toErrorMap(res.errors));
            } else {
              router.push('/home');
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="email"
              name="email"
              placeholder="email"
              type="email"
            />
            <InputField
              label="password"
              name="password"
              placeholder="Password"
              type="password"
            />
            <input type="submit" disabled={isSubmitting} />
            <div
              className="df df-fc df-ai-s df-jc-c"
              style={{ marginTop: '1rem', marginBottom: '1rem' }}
            >
              <p className="text-left">
                Dont't have an account?{' '}
                <Link href="/auth/register">Register</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginPage;
