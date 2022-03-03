import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../hooks/useRedux';
import { PreviewImage } from '../components/PreviewImage';
import { MyTextInput } from '../components/MyTextInput';
import { UserProfile } from '../interfaces/interfaces';
import { startUpdateProfile } from '../redux/actions/user';

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
  password1: Yup.string()
    .min(6, 'Debe tener 6 caracteres como minimo')
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

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const { name, urlFoto, userName, uId } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.auth);

  let initialValues: UserProfile = {
    username: userName,
    name,
    password1: '',
    photo: undefined,
  };

  return (
    <div className="animate__animated animate__fadeIn animate__faster dash-main-container">
      <h2
        className="name-title texto-cententer text-profile mb-5"
        style={{
          border: 'none',
        }}
      >
        <i className="fa-solid fa-user-pen me-3"></i>
        Editar mi perfil
      </h2>
      <div className="profile-container">
        <div className="image-profile">
          <h4>Mi foto</h4>
          <PreviewImage urlFoto={urlFoto} className="image-perfile" />
        </div>
        <div className="text-inputs-profile">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              if (values.photo === undefined) {
                Swal.fire({
                  title: '¿Desea actualizar sin modificar la foto de perfil?',
                  showCancelButton: true,
                  confirmButtonText: 'Si',
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(startUpdateProfile(uId, token, values));
                  }
                });
              } else {
                dispatch(startUpdateProfile(uId, token, values));
              }
            }}
            validationSchema={validateSchema}
          >
            {({ values, setFieldValue }) => (
              <Form noValidate>
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
                    label="Contraseña"
                    name="password1"
                    placeholder="Ingrese contraseña"
                    type="password"
                  />
                  <label className="label-pet">Foto</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setFieldValue(
                        'photo',
                        e.target.files ? e.target.files[0] : undefined
                      )
                    }
                    accept="image/*"
                  />
                  <button className="btn btn-success mt-3 mb-3" type="submit">
                    Acutualizar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
