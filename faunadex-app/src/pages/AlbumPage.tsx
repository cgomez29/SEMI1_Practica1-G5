import { Formik, Form } from 'formik';

import { AlbumProfile } from '../components/AlbumProfile';
import { useAppSelector } from '../hooks/useRedux';

import { MyTextInput } from '../components/MyTextInput';
import { MyCheckBox } from '../components/MyCheckBox';
import { MySelect } from '../components/MySelect';
import { useDispatch } from 'react-redux';
import {
  activeAlbum,
  startDeleteAlbum,
  startSaveAlbum,
  startUpdateAlbum,
} from '../redux/actions/album';
import { AlbumUpdate } from '../interfaces/interfaces';

import * as Yup from 'yup';
import Swal from 'sweetalert2';

const validateSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z1-9\u00C0-\u017F\s]+$/, 'Solo son permitidos letras')
    .min(2, 'Debe tener 2 caracteres como minimimo'),
  option: Yup.array().max(1, 'Error').required('Debe seleccionar una opcion'),
});

export const AlbumPage = () => {
  const { albums, active } = useAppSelector((state) => state.album);
  const dispatch = useDispatch();

  const intialvalues: AlbumUpdate = {
    name: '',
    selected: 0,
    option: [],
  };

  const onSelected = (id: number) => {
    const album = albums.filter((a) => id.toString() === a.id.toString());

    if (album.length === 1) {
      dispatch(activeAlbum(album[0]));
    }
  };
  const onSubmit = (values: AlbumUpdate) => {
    let option: string = '';

    if (values.option[0] === 'add') {
      option = 'agregar';
    } else if (values.option[0] === 'edit') {
      option = 'editar';
    } else {
      option = 'eliminar';
    }

    const text = `¿Desea ${option} el álbum?`;

    Swal.fire({
      title: text,
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        // Agregar
        if (values.option[0] === 'add') {
          if (values.name === '') return;
          dispatch(startSaveAlbum(values.name));
          // Editar
        } else if (values.option[0] === 'edit') {
          if (values.name === '' || values.selected === 0) return;
          dispatch(startUpdateAlbum(values.selected, values.name));
        } else {
          // Eliminar
          if (values.selected === 0) return;
          dispatch(startDeleteAlbum(values.selected));
        }
      }
    });
  };

  return (
    <div className="animate__animated animate__fadeIn animate__faster dash-main-container mt-5 p-1">
      <h2
        className="name-title texto-cententer text-profile mb-5"
        style={{
          border: 'none',
        }}
      >
        <i className="fa-solid fa-folder-open me-3"></i>
        Álbum
      </h2>
      <div className="profile-container mb-4">
        <div className="image-profile">
          <h3>Seleccionado</h3>
          {active ? <AlbumProfile text={active.name} /> : <AlbumProfile />}
        </div>
        <div className="text-inputs-profile">
          <Formik
            initialValues={intialvalues}
            onSubmit={(values) => onSubmit(values)}
            validationSchema={validateSchema}
          >
            {({ values }) => (
              <Form noValidate>
                <div className="input-group-pet">
                  <MyTextInput
                    label="Álbum"
                    name="name"
                    placeholder="Nombre álbum"
                    type="text"
                  />
                  <div className="group-check-input">
                    <MyCheckBox label="Agregar" name="option" value="add" />
                    <MyCheckBox label="Editar" name="option" value="edit" />
                    <MyCheckBox label="Eliminar" name="option" value="delete" />
                  </div>
                  <MySelect
                    label="Seleccionar"
                    name="selected"
                    onClick={() => onSelected(values.selected)}
                  >
                    <option value={0}>Seleccione un álbum</option>
                    {albums.map((album) => (
                      <option value={album.id} key={album.id}>
                        {album.name}
                      </option>
                    ))}
                  </MySelect>
                  <button className="btn btn-primary mt-3 mb-3" type="submit">
                    Ok
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
