import { UiAction } from '../../interfaces/interfaces';
import { ActionType } from '../types/types';

export const setError = (err: string): UiAction => ({
  type: ActionType.UI_SET_ERROR,
  payload: err,
});

export const removeError = (): UiAction => ({
  type: ActionType.UI_REMOVE_ERROR,
});

export const startLoading = (): UiAction => ({
  type: ActionType.UI_START_LOADING,
});

export const finishLoading = (): UiAction => ({
  type: ActionType.UI_FINISH_LOADING,
});
