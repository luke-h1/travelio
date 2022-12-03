import classNames from 'classnames';
import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';
import styles from './InputField.module.scss';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
  type: string;
  name: string;
};

const InputField = ({ className, ...props }: InputFieldProps) => {
  const [field, { error }] = useField(props);
  return (
    <div aria-live="polite">
      <label
        htmlFor={field.name}
        className={classNames(styles.input, className, {
          [styles.formError]: error,
        })}
      >
        <p className="df df-jc-sb df-ai-c" style={{ marginTop: '1rem' }}>
          {props.label}
        </p>
        <input {...field} {...props} id={field.name} />
        {error && (
          <p className={error ? styles.formErrorLabel : 'hidden'}>{error}</p>
        )}
      </label>
    </div>
  );
};

export default InputField;
