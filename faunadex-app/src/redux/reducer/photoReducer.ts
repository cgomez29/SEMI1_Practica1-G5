import { PhotoAction, Photos } from '../../interfaces/interfaces';
import { ActionType } from '../types/types';

const INITIAL_STATE: Photos = {
  photos: [],
  active: null,
};

export const photoReducer = (
  state: Photos = INITIAL_STATE,
  action: PhotoAction
): Photos => {
  switch (action.type) {
    case ActionType.PHOTO_LOAD:
      return {
        ...state,
        photos: action.payload,
      };

    case ActionType.PHOTO_LOGOUT_CLEANING:
      return {
        ...state,
        photos: [],
        active: null,
      };

    case ActionType.PHOTO_ADD_NEW:
      return {
        ...state,
        // photos: [action.payload, ...state.photos],
      };
    case ActionType.PHOTO_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };

    default:
      return state;
  }
};
