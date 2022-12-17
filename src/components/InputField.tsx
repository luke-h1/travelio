import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label: string;
  type: string;
  name: string;
};

const InputField = ({ ...props }: InputFieldProps) => {
  const [field, { error }] = useField(props);
  return (
    <div aria-live="polite" className="flex justify-center mb-3 xl:w-96">
      <label
        htmlFor={field.name}
        className="form-label inline-block mb-2 text-gray-700"
      >
        <p className="df df-jc-sb df-ai-c" style={{ marginTop: '1rem' }}>
          {props.label}
        </p>

        {props.type === 'textarea' ? (
          <textarea {...field} {...props} id={field.name} rows={5} cols={50} />
        ) : (
          <input
            {...field}
            {...props}
            id={field.name}
            className=" form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
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
