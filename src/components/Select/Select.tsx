import classNames from 'classnames';
import { ReactNode } from 'react';
import Select, { MenuPlacement, MenuPosition } from 'react-select';
import styles from './Select.module.scss';

interface Props {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  error: string;
  backspaceRemovesValue: boolean;
  status: string;
  blurInputOnSelect: boolean;
  captureMenuScroll: boolean;
  closeMenuOnScroll: boolean;
  controlShouldRenderValue: boolean;
  id: string;
  inputValue: string;
  isClearable: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  isMulti: boolean;
  isSearchable: boolean;
  isRtl: boolean;
  maxMenuHeight: number;
  menuIsOpen: boolean;
  menuPlacement: MenuPlacement;
  menuPosition: MenuPosition;
  menuShouldBlockScroll: boolean;
  noOptionsMessage: (obj: { inputValue: string }) => ReactNode;
  openMenuOnClick: boolean;
  openMenuOnFocus: boolean;
  pageSize: number;
  tabIndex: number;
  tabSelectsValue: boolean;
  touched: boolean;
  onChange: (name: string, value: unknown) => void;
  onBlur: (name: string, value?: boolean) => void;
}

const SelectField = ({
  name,
  label,
  placeholder,
  options,
  value = '',
  error = '',
  backspaceRemovesValue = true,
  status = '',
  blurInputOnSelect = false,
  captureMenuScroll = true,
  closeMenuOnScroll = false,
  controlShouldRenderValue = true,
  id,
  inputValue,
  isClearable = true,
  isDisabled = false,
  isLoading = false,
  isMulti = false,
  isSearchable = true,
  isRtl = false,
  maxMenuHeight = 300,
  menuIsOpen,
  menuPlacement = 'bottom',
  menuPosition = 'absolute',
  menuShouldBlockScroll = false,
  noOptionsMessage,
  openMenuOnClick = true,
  openMenuOnFocus = false,
  pageSize = 5,
  tabIndex,
  tabSelectsValue = true,
  touched = false,
  onChange,
  onBlur,
}: Props) => {
  // eslint-disable-next-line no-shadow
  const handleChange = (value: unknown) => {
    onChange(name, value);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <div
      className={
        (touched && error) || status
          ? classNames(styles.cSelect, 'error')
          : styles.cSelect
      }
    >
      <span
        className={
          isRtl
            ? classNames(styles.cSelect__label, 'isRtl')
            : styles.cSelect__label
        }
      >
        {label}
      </span>
      <Select
        className="c-select__field"
        classNamePrefix="c-select"
        options={options}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        components={{ ClearIndicator: undefined }}
        backspaceRemovesValue={backspaceRemovesValue}
        blurInputOnSelect={blurInputOnSelect}
        captureMenuScroll={captureMenuScroll}
        closeMenuOnScroll={closeMenuOnScroll}
        controlShouldRenderValue={controlShouldRenderValue}
        id={id}
        inputValue={inputValue}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isRtl={isRtl}
        maxMenuHeight={maxMenuHeight}
        menuIsOpen={menuIsOpen}
        menuPlacement={menuPlacement}
        menuPosition={menuPosition}
        menuShouldBlockScroll={menuShouldBlockScroll}
        noOptionsMessage={noOptionsMessage}
        openMenuOnClick={openMenuOnClick}
        openMenuOnFocus={openMenuOnFocus}
        pageSize={pageSize}
        placeholder={placeholder}
        tabIndex={tabIndex}
        tabSelectsValue={tabSelectsValue}
      />
      {((touched && error) || status) && (
        <span
          className={
            isRtl
              ? classNames(styles.cSelect__messasge, {
                  isrRtl: isRtl,
                })
              : styles.cSelect__messasge
          }
        >
          {error || status}
        </span>
      )}
    </div>
  );
};
export default SelectField;

/* 
 example:
   {({
          values,
          setFieldValue,
          setFieldTouched,
          touched,
          errors,
          status,
        }) => (

        <SelectField
              name={job.name}
              label={job.name}
              id={job.name}
              status={status.job}
              options={job.items}
              value={values.job}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              touched={touched.job}
              error={errors.job}
            />
*/
