import { Dispatch } from 'react';
import { getPhotosById, savePhotoByAlbm } from '../../helpers/photo';

import { Photo, PhotoAction, PhotoUpload, UserAction } from '../../interfaces/interfaces';
import { RootState } from '../store/store';
import { ActionType } from '../types/types';

import Swal from 'sweetalert2';
import { oneMorePhoto } from './user';

type DispatchType = PhotoAction | UserAction;

export const setPhotos = (albums: Photo[]): PhotoAction => ({
  type: ActionType.PHOTO_LOAD,
  payload: albums,
});

export const photoLogout = (): PhotoAction => ({
  type: ActionType.PHOTO_LOGOUT_CLEANING,
});

export const activePhoto = (photo: Photo): PhotoAction => ({
  type: ActionType.PHOTO_ACTIVE,
  payload: photo,
});

export const addNewPhoto = (photo: Photo): PhotoAction => ({
  type: ActionType.PHOTO_ADD_NEW,
  payload: photo,
});

export const startLoadingPhotos =
  (albumId: number) =>
  async (dispatch: Dispatch<PhotoAction>, getState: () => RootState) => {
    const { token } = getState().auth;
    const photos = await getPhotosById(token, albumId);

    dispatch(setPhotos(photos));
  };

export const startSavePhoto =
  (photo: PhotoUpload) =>
  async (dispatch: Dispatch<DispatchType>, getState: () => RootState) => {
    const { token } = getState().auth;
    const resPhoto = await savePhotoByAlbm(token, photo);

    if (resPhoto) {
      dispatch(addNewPhoto(resPhoto));
      dispatch(activePhoto(resPhoto));
      dispatch(oneMorePhoto());
      Swal.fire(
        'Exitoso',
        `Se agrego una nueva foto con el nombre "${photo.name}"`,
        'success'
      );
    } else {
      Swal.fire('Error', 'Error al subir la foto', 'error');
    }
  };
