import { ErrorMessage, useField } from 'formik';

interface Props {
  label: string;
  name: string;
  [x: string]: any;
}

export const MyCheckBox = ({ label, ...props }: Props) => {
  const [field] = useField({ ...props, type: 'checkbox' });
  // field -> touch, onChange, onBlur

  return (
    <>
      <label>
        <input type="checkbox" {...field} {...props} className="me-2" />
        {label}
      </label>
      {/* {meta.touched && meta.error && <span className="error">{meta.error}</span>} */}
      <ErrorMessage name={props.name} component="span" className="label-error" />
    </>
  );
};
