import { UiAction, UI } from '../../interfaces/interfaces';
import { ActionType } from '../types/types';

const INITIAL_STATE: UI = {
  loading: false,
  msgError: '',
};

export const uiReducer = (state: UI = INITIAL_STATE, action: UiAction): UI => {
  switch (action.type) {
    case ActionType.UI_SET_ERROR:
      return {
        ...state,
        msgError: action.payload,
      };
    case ActionType.UI_REMOVE_ERROR:
      return {
        ...state,
        msgError: '',
      };
    case ActionType.UI_START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.UI_FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
