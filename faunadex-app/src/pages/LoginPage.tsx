import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyTextInput } from '../components/MyTextInput';

const validationSchema = Yup.object({
  username: Yup.string().min(3, 'Debe tener 3 caracteres o mas').required('Requerido'),
  password: Yup.string()
    .min(6, 'Debe tener 6 caracteres como minimo')
    .required('Requerido'),
});

export const LoginPage = () => {
  return (
    <div
      style={{
        width: '70%',
        margin: '0px auto',
      }}
    >
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form className="card-pet" noValidate>
            <i className="fa-solid fa-dog dog-pet"></i>
            <h4 className="mb-2">Inicio Sesión</h4>
            <div className="input-group-pet">
              <MyTextInput
                label="Usuario"
                name="username"
                placeholder="Ingrese usuario"
                type="text"
              />
              <MyTextInput
                label="Contraseña"
                name="password"
                placeholder="Ingrese contraseña"
                type="password"
              />
              <button className="btn btn-primary mt-3" type="submit">
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
