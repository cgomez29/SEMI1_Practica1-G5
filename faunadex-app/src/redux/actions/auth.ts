import { ActionType } from '../types/types';
import { AuthAction } from '../../interfaces/interfaces';
import { Dispatch } from 'redux';
import axios from 'axios';

// =============================================================================
// DISPATCH ACCIONS
// =============================================================================
export const login = (userName: string): AuthAction => {
  return {
    type: ActionType.AUTH_LOGIN,
    payload: {
      userName,
      logged: true,
      loading: false,
    },
  };
};
export const logout = (): AuthAction => ({
  type: ActionType.AUTH_LOGOUT,
});

// =============================================================================
// DISPATCH ACCIONS ASINCRONAS
// =============================================================================

export const loginAsync = (userName: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({
        type: ActionType.AUTH_LOADING,
      });
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu');
      console.log(res.data);
      dispatch(login(userName));
    } catch (e) {
      dispatch({
        type: ActionType.AUTH_FAIL,
      });
    }
  };
};

// export const loginAsync =
//   (userName: string): ThunkAction<void, RootState, unknown, AuthAction> =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: ActionType.AUTH_LOADING,
//       });
//       const res = await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu');
//       console.log(res.data);
//       dispatch(login(userName));
//     } catch (e) {
//       dispatch({
//         type: ActionType.AUTH_FAIL,
//       });
//     }
//   };
