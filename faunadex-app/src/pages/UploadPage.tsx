import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';

import { MyTextInput } from '../components/MyTextInput';
import { PreviewImage } from '../components/PreviewImage';
import { useAppSelector } from '../hooks/useRedux';
import { PhotoUpload } from '../interfaces/interfaces';

import * as Yup from 'yup';
import { MySelect } from '../components/MySelect';
import { startSavePhoto } from '../redux/actions/photo';
import Swal from 'sweetalert2';

const initialValues: PhotoUpload = {
  folderId: 0,
  image: undefined,
  name: '',
};

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const validateShema = Yup.object({
  name: Yup.string().min(2, 'Debe tener minimo 2 caracteres').required('Requerido'),
  folderId: Yup.number()
    .notOneOf([0], 'Esta opcion no es permitida')
    .required('Requerido'),
  image: Yup.mixed()
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
    )
    .required('Requerido'),
});

export const UploadPage = () => {
  const dispatch = useDispatch();
  const { active } = useAppSelector((state) => state.photo);
  const { albums } = useAppSelector((state) => state.album);

  return (
    <div className="animate__animated animate__fadeIn animate__faster dash-main-container mt-5 p-1">
      <h2
        className="name-title texto-cententer text-profile mb-5"
        style={{
          border: 'none',
        }}
      >
        <i className="fa-solid fa-cloud-arrow-up me-3"></i>
        Subir foto
      </h2>
      <div className="profile-container mb-4">
        <div className="image-profile mb-5">
          <h4>Foto</h4>
          <PreviewImage
            urlFoto={active?.url || ''}
            className="image-perfile preview-img-upload"
          />
        </div>
        <div className="text-inputs-profile">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              if (values.folderId === 0) {
                Swal.fire('Precaución', 'No se escogio ningún álbum', 'warning');
              } else {
                dispatch(startSavePhoto(values));
              }
            }}
            validationSchema={validateShema}
          >
            {({ setFieldValue }) => (
              <Form noValidate>
                <div className="input-group-pet">
                  <MyTextInput
                    label="Nombre"
                    name="name"
                    placeholder="Ingrese nombre de la foto"
                    type="text"
                  />
                  <MySelect label="Álbum" name="folderId">
                    <option value={0}>Seleccione un álbum</option>
                    {albums.map((album) => (
                      <option value={album.id} key={album.id}>
                        {album.name}
                      </option>
                    ))}
                  </MySelect>
                  <label className="label-pet mt-3">Foto</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setFieldValue(
                        'image',
                        e.target.files ? e.target.files[0] : undefined
                      )
                    }
                    accept="image/*"
                    className="input-pet-file"
                  />
                  <button className="btn btn-success mt-3 mb-3" type="submit">
                    Subir
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
