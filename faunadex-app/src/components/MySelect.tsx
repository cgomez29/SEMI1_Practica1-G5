import { ErrorMessage, useField } from 'formik';

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  [x: string]: any;
}

export const MySelect = ({ label, ...props }: Props) => {
  const [field] = useField(props);
  // field -> touch, onChange, onBlur

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="select-custom">
        <select {...field} {...props} />
        <ErrorMessage name={props.name} component="span" />
      </div>
    </>
  );
};
