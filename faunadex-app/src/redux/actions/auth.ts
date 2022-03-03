import { Dispatch } from 'redux';

import { ActionType } from '../types/types';
import {
  AuthAction,
  UiAction,
  User,
  UserAction,
  UserRegister,
} from '../../interfaces/interfaces';
import { serverLogin, serverProfile, serverRegister } from '../../helpers/serviceApi';
import { startLoading, finishLoading, setError, removeError } from './ui';

import Swal from 'sweetalert2';
import { setProfile } from './user';

type ActionsType = AuthAction | UiAction | UserAction;
// =============================================================================
// DISPATCH ACCIONS
// =============================================================================
export const login = (userName: string, uId: number, token: string): AuthAction => {
  return {
    type: ActionType.AUTH_LOGIN,
    payload: {
      userName,
      uId,
      token,
      logged: true,
    },
  };
};
export const logout = (): AuthAction => ({
  type: ActionType.AUTH_LOGOUT,
});

// =============================================================================
// DISPATCH ACCIONS ASINCRONAS
// =============================================================================

export const startLogin =
  (userName: string, password: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
      dispatch(startLoading());

      // LOGIN
      const { data } = await serverLogin(userName, password);
      const { idUsuario, token, usuario } = data;
      dispatch(login(usuario, idUsuario, token));

      // Profile
      const { data: dataProfile } = await serverProfile(idUsuario, token);
      const { numberFolder, numberFotos, user } = dataProfile.data;
      const userProfile: User = {
        folders: numberFolder,
        name: user.nombre,
        photos: numberFotos,
        uId: idUsuario,
        urlFoto: user.urlFoto,
        userName: usuario,
      };
      dispatch(setProfile(userProfile));

      dispatch(finishLoading());
    } catch (e: any) {
      dispatch(setError('Error al iniciar sesion'));
      dispatch(removeError());
      dispatch(finishLoading());
      Swal.fire('Error', 'Usuario o Contraseña invalidas', 'error');
    }
  };

export const startRegister =
  (user: UserRegister) => async (dispatch: Dispatch<ActionsType>) => {
    try {
      dispatch(startLoading());
      const { data } = await serverRegister(user);
      const { idUsuario, token, usuario } = data;
      dispatch(login(usuario, idUsuario, token));

      // Profile
      const { data: dataProfile } = await serverProfile(idUsuario, token);
      const { numberFolder, numberFotos, user: uProfile } = dataProfile.data;
      const userProfile: User = {
        folders: numberFolder,
        name: uProfile.nombre,
        photos: numberFotos,
        uId: idUsuario,
        urlFoto: uProfile.urlFoto,
        userName: usuario,
      };
      dispatch(setProfile(userProfile));

      dispatch(finishLoading());
    } catch (e) {
      dispatch(finishLoading());
      Swal.fire('Error', 'El nombre de usuario ya existe', 'error');
    }
  };
