import classNames from 'classnames';
import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
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
        className={classNames(
          'text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-neutral-600 bg-neutral-200 uppercase last:mr-0 mr-1',
          className,
          {
            'text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1':
              error,
          },
        )}
      >
        <p className="df df-jc-sb df-ai-c" style={{ marginTop: '1rem' }}>
          {props.label}
        </p>

        {props.type === 'textarea' ? (
          <textarea {...field} {...props} id={field.name} rows={5} cols={50} />
        ) : (
          <input {...field} {...props} id={field.name} />
        )}
        {error && (
          <p
            className={
              error
                ? 'text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1'
                : 'hidden'
            }
            role="alert"
          >
            {error}
          </p>
        )}
      </label>
    </div>
  );
};

export default InputField;
