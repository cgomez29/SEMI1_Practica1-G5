import { useField, ErrorMessage } from 'formik';

interface Props {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  [x: string]: any;
}

export const MyTextInput = ({ label, ...props }: Props) => {
  const [field] = useField(props);
  // field -> touch, onChange, onBlur

  return (
    <>
      <label className="label-pet" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className="input-pet" {...field} {...props} autoComplete="of" />
      <ErrorMessage name={props.name} component="span" className="label-error" />
      {/* {meta.touched && meta.error && <span className="error">{meta.error}</span>} */}
    </>
  );
};
