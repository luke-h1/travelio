import { LoginInput, loginSchema } from '@frontend/schemas/auth.schema';
import { toFormikValidationSchema } from '@frontend/utils/toFormikValidationSchema';
import { Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InputField from '../../components/InputField';

const LoginPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <h2>Login</h2>
      <Formik<LoginInput>
        validationSchema={toFormikValidationSchema(loginSchema)}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await signIn('credentials', {
            ...values,
            redirect: false,
          });
          if (res?.error && !res.ok) {
            setErrors({
              email: res.error,
            });
          } else {
            router.push('/');
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
