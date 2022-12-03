import classNames from 'classnames';
import { useField } from 'formik';
import { SelectHTMLAttributes } from 'react';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import styles from './SelectField.module.scss';

type SelectFieldProps<T> = SelectHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
  options: OptionsOrGroups<T, GroupBase<T>>;
  type: string;
  name: string;
};

function SelectField<T>({ className, options, ...props }: SelectFieldProps<T>) {
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
        <Select
          {...field}
          {...props}
          id={field.name}
          options={options}
          defaultValue={null}
        />
      </label>
    </div>
  );
}
export default SelectField;
