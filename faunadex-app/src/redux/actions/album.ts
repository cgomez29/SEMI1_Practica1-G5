import { Dispatch } from 'react';

import { Album, AlbumAction, UserAction } from '../../interfaces/interfaces';
import { ActionType } from '../types/types';
import { RootState } from '../store/store';
import { getAlbums, saveAlbum, updateAlbum, removeAlbum } from '../../helpers/album';

import Swal from 'sweetalert2';
import { customLessPhoto, oneLessAlbum, oneMoreAlbum } from './user';

type DispatchType = AlbumAction | UserAction;

export const activeAlbum = (album: Album): AlbumAction => ({
  type: ActionType.ALBUM_ACTIVE,
  payload: album,
});

export const addNewAlbum = (album: Album): AlbumAction => ({
  type: ActionType.ALBUM_ADD_NEW,
  payload: album,
});

export const setAlbums = (albums: Album[]): AlbumAction => ({
  type: ActionType.ALBUM_LOAD,
  payload: albums,
});

export const refreshAlbum = (album: Album): AlbumAction => ({
  type: ActionType.ALBUM_UPDATED,
  payload: album,
});

export const deleteAlbum = (id: number): AlbumAction => ({
  type: ActionType.ALBUM_DELETE,
  payload: id,
});

export const albumLogout = (): AlbumAction => ({
  type: ActionType.ALBUM_LOGOUT_CLEANING,
});

export const startLoadingAlbums =
  () => async (dispatch: Dispatch<AlbumAction>, getState: () => RootState) => {
    const { uId, token } = getState().auth;
    const album = await getAlbums(uId, token);
    dispatch(setAlbums(album));
  };

export const startSaveAlbum =
  (name: string) =>
  async (dispatch: Dispatch<DispatchType>, getState: () => RootState) => {
    const { uId, token } = getState().auth;
    const resp = await saveAlbum(uId, token, name);

    if (resp) {
      dispatch(addNewAlbum(resp));
      dispatch(oneMoreAlbum());
      Swal.fire('Exitoso', 'Se agrego un nuevo álbum', 'success');
    } else {
      Swal.fire('Error', 'Error en base de datos', 'error');
    }
  };

export const startUpdateAlbum =
  (albumId: number, name: string) =>
  async (dispatch: Dispatch<AlbumAction>, getState: () => RootState) => {
    const { token } = getState().auth;
    const resp = await updateAlbum(albumId, token, name);

    if (resp) {
      dispatch(refreshAlbum(resp));
      Swal.fire('Exitoso', 'Se edito el álbum correctamente', 'success');
    } else {
      Swal.fire('Error', 'Error al actualizar el álbum', 'error');
    }
  };

export const startDeleteAlbum =
  (albumId: number) =>
  async (dispatch: Dispatch<DispatchType>, getState: () => RootState) => {
    const { token } = getState().auth;
    const resp = await removeAlbum(albumId, token);

    if (resp) {
      dispatch(deleteAlbum(resp.albumId));
      dispatch(oneLessAlbum());
      dispatch(customLessPhoto(resp.deletedPhotos));
      Swal.fire(
        'Exitoso',
        `Se elimino el álbum y ${resp.deletedPhotos} fotos`,
        'success'
      );
    } else {
      Swal.fire('Error', 'Error al eliminar el álbum', 'error');
    }
  };
