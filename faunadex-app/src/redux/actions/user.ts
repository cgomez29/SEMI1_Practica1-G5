import { Dispatch } from 'redux';
import { serverProfile, serverUpdateProfile } from '../../helpers/serviceApi';

import {
  AlbumAction,
  AuthAction,
  UiAction,
  User,
  UserAction,
  UserProfile,
} from '../../interfaces/interfaces';
import { ActionType } from '../types/types';
import { finishLoading, startLoading } from './ui';

import Swal from 'sweetalert2';
import { RootState } from '../store/store';
import { logout } from './auth';
import { albumLogout } from './album';

type ActionsType = UiAction | UserAction | AuthAction | AlbumAction;

export const resetProfile = (): UserAction => ({
  type: ActionType.USER_RESET_PROFILE,
});

export const setProfile = (user: User): UserAction => ({
  type: ActionType.USER_GET_PROFILE,
  payload: user,
});

export const oneMorePhoto = (): UserAction => ({
  type: ActionType.USER_MORE_ONE_PHOTOS,
});

export const oneMoreAlbum = (): UserAction => ({
  type: ActionType.USER_MORE_ONE_ALBUMS,
});

export const oneLessAlbum = (): UserAction => ({
  type: ActionType.USER_LESS_ONE_ALBUMS,
});

export const customLessPhoto = (value: number): UserAction => ({
  type: ActionType.USER_CUSTOM_COUNT_PHOTO,
  payload: value,
});

export const startProfile =
  () => async (dispatch: Dispatch<ActionsType>, getState: () => RootState) => {
    try {
      const { uId, token } = getState().auth;
      dispatch(startLoading());

      // Profile
      const { data: dataProfile } = await serverProfile(uId, token);
      const { numberFolder, numberFotos, user } = dataProfile.data;
      const userProfile: User = {
        folders: numberFolder,
        name: user.nombre,
        photos: numberFotos,
        uId: user.idUsuario,
        urlFoto: user.urlFoto,
        userName: user.usuario,
      };
      dispatch(setProfile(userProfile));

      dispatch(finishLoading());
    } catch (e) {
      dispatch(finishLoading());
      Swal.fire('Error', 'Error en el servidor', 'error');
      dispatch(resetProfile());
      dispatch(logout());
      dispatch(albumLogout());
    }
  };

export const startUpdateProfile =
  (uId: number, token: string, user: UserProfile) =>
  async (dispatch: Dispatch<ActionsType>) => {
    try {
      dispatch(startLoading());

      // Update profile
      const { data } = await serverUpdateProfile(uId, token, user);
      const { user: userRes } = data.data;
      if (userRes) {
        const { data: dataProfile } = await serverProfile(uId, token);
        const { numberFolder, numberFotos, user } = dataProfile.data;
        const dataUserProfile: User = {
          folders: numberFolder,
          name: user.nombre,
          photos: numberFotos,
          uId: user.idUsuario,
          urlFoto: user.urlFoto,
          userName: user.usuario,
        };
        dispatch(setProfile(dataUserProfile));
      }
      dispatch(finishLoading());
      Swal.fire('Exitoso', 'Se actualizaron los datos correctamente', 'success');
    } catch (error) {
      dispatch(finishLoading());
      Swal.fire('Error', 'Error en la contraseña', 'error');
    }
  };
