import { Dispatch } from 'redux';
import { serverProfile } from '../../helpers/serviceApi';

import { UiAction, User, UserAction } from '../../interfaces/interfaces';
import { ActionType } from '../types/types';
import { finishLoading, startLoading } from './ui';

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
