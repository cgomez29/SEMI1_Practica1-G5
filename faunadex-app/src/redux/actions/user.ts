import { Dispatch } from 'redux';
import { serverProfile, serverUpdateProfile } from '../../helpers/serviceApi';

import { UiAction, User, UserAction, UserProfile } from '../../interfaces/interfaces';
import { ActionType } from '../types/types';
import { finishLoading, startLoading } from './ui';

import Swal from 'sweetalert2';

type ActionsType = UiAction | UserAction;

export const resetProfile = (): UserAction => ({
  type: ActionType.USER_RESET_PROFILE,
});

export const setProfile = (user: User): UserAction => ({
  type: ActionType.USER_GET_PROFILE,
  payload: user,
});

export const startProfile =
  (uId: number, token: string) => async (dispatch: Dispatch<ActionsType>) => {
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
  };

export const startUpdateProfile =
  (uId: number, token: string, user: UserProfile) =>
  async (dispatch: Dispatch<ActionsType>) => {
    try {
      dispatch(startLoading());

      // Update profile
      const { data } = await serverUpdateProfile(uId, token, user);
      const { user: userRes } = data.data;
      if (userRes[0] === 1) {
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
      }
      dispatch(finishLoading());
      Swal.fire('Exitoso', 'Se actualizaron los datos correctamente', 'success');
    } catch (error) {
      dispatch(finishLoading());
      Swal.fire('Error', 'El nombre de usuario ya existe', 'error');
    }
  };
