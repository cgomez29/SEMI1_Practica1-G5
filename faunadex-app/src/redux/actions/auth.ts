import { ActionType } from '../types/types';
import { AuthAction, UiAction, UserRegister } from '../../interfaces/interfaces';
import { Dispatch } from 'redux';
import axios from 'axios';
import { startLoading, finishLoading, setError } from './ui';

type ActionsType = AuthAction | UiAction;
// =============================================================================
// DISPATCH ACCIONS
// =============================================================================
export const login = (userName: string): AuthAction => {
  return {
    type: ActionType.AUTH_LOGIN,
    payload: {
      userName,
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

      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu');
      console.log(res.data);
      dispatch(login(userName));
      dispatch(finishLoading());
    } catch (e) {
      // dispatch(setError('Credenciales Invalidas'));
      dispatch(setError('Error al iniciar sesion'));
    }
  };

export const startRegister =
  (user: UserRegister) => async (dispatch: Dispatch<ActionsType>) => {
    try {
      dispatch(startLoading());

      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu');
      console.log(res.data);
      dispatch(login(user.username));
      dispatch(finishLoading());
    } catch (e) {
      dispatch(setError('Error al iniciar sesion'));
    }
  };
