import { User, UserAction } from '../../interfaces/interfaces';
import { ActionType } from '../types/types';

const INITIAL_STATE: User = {
  folders: 0,
  name: '',
  photos: 0,
  uId: 0,
  urlFoto: '',
  userName: '',
};
export const userReducer = (state: User = INITIAL_STATE, action: UserAction): User => {
  switch (action.type) {
    case ActionType.USER_RESET_PROFILE:
      return {
        ...state,
        folders: 0,
        name: '',
        photos: 0,
        uId: 0,
        urlFoto: '',
        userName: '',
      };
    case ActionType.USER_GET_PROFILE:
      return {
        ...state,
        folders: action.payload.folders,
        name: action.payload.name,
        photos: action.payload.photos,
        uId: action.payload.uId,
        urlFoto: action.payload.urlFoto,
        userName: action.payload.userName,
      };
    case ActionType.USER_MORE_ONE_ALBUMS:
      return {
        ...state,
        folders: state.folders + 1,
      };
    case ActionType.USER_MORE_ONE_PHOTOS:
      return {
        ...state,
        photos: state.photos + 1,
      };
    case ActionType.USER_LESS_ONE_ALBUMS:
      return {
        ...state,
        folders: state.folders - 1,
      };
    case ActionType.USER_CUSTOM_COUNT_PHOTO:
      return {
        ...state,
        photos: state.photos - action.payload,
      };

    default:
      return state;
  }
};
