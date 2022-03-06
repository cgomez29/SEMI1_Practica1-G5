import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';

import { MyTextInput } from '../components/MyTextInput';
import { UserRegister } from '../interfaces/interfaces';
import { startRegister } from '../redux/actions/auth';

import * as Yup from 'yup';
import Swal from 'sweetalert2';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const validateSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Debe tener 3 caracteres como minimo')
    .required('Requerido'),
  name: Yup.string()
    .matches(/^[a-zA-Z\u00C0-\u017F\s]+$/, 'Solo son permitidos letras')
    .min(2, 'Debe tener 2 caracteres como minimimo')
    .required('Requerido'),
  lastname: Yup.string()
    .matches(/^[a-zA-Z\u00C0-\u017F\s]+$/, 'Solo son permitidos letras')
    .required('Requerido'),
  password1: Yup.string()
    .min(6, 'Debe tener 6 caracteres como minimo')
    .required('Requerido'),
  password2: Yup.string()
    .oneOf([Yup.ref('password1')], 'Las contraseñas deben ser iguales')
    .required('Requerido'),
  photo: Yup.mixed()
    .nullable()
    .test(
      'FILE_SIZE',
      'La foto es muy grande',
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      'FILE_FORMAT',
      'La imagen no tiene el formato adecuado',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});

const intialValues: UserRegister = {
  username: '',
  name: '',
  lastname: '',
  password1: '',
  password2: '',
  photo: undefined,
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  // const { loading } = useAppSelector((state) => state.ui);

  return (
    <div
      style={{
        width: '50%',
        margin: '0px auto',
      }}
      className="animate__animated animate__fadeIn animate__fast"
    >
      <Formik
        initialValues={intialValues}
        onSubmit={(values, { resetForm }) => {
          if (values.photo === undefined || values.photo === '') {
            Swal.fire({
              title: '¿Desea registrarse sin foto de perfil?',
              showCancelButton: true,
              confirmButtonText: 'Si',
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(startRegister(values));
                resetForm();
              }
            });
          } else {
            dispatch(startRegister(values));
            resetForm();
          }
        }}
        validationSchema={validateSchema}
      >
        {({ values, setFieldValue }) => (
          <Form noValidate className="card-pet">
            <i className="fa-solid fa-dog dog-pet"></i>
            <h4 className="mb-2">Registro</h4>
            <div className="input-group-pet">
              <MyTextInput
                label="Usuario"
                name="username"
                placeholder="Ingrese usuario"
                type="text"
              />
              <MyTextInput
                label="Nombre"
                name="name"
                placeholder="Ingrese nombre"
                type="text"
              />
              <MyTextInput
                label="Apellido"
                name="lastname"
                placeholder="Ingrese apellido"
                type="text"
              />
              <MyTextInput
                label="Contraseña"
                name="password1"
                placeholder="Ingrese contraseña"
                type="password"
              />
              <MyTextInput
                label="Validar contraseña"
                name="password2"
                placeholder="Repita la contraseña"
                type="password"
              />

              <label className="label-pet">Foto</label>
              <input
                type="file"
                onChange={(e) =>
                  setFieldValue('photo', e.target.files ? e.target.files[0] : undefined)
                }
                accept="image/*"
                className="input-pet-file"
              />

              <button className="btn btn-primary mt-3" type="submit">
                Registro
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
