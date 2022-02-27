import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // Middleware

import { rootReducer } from '../reducer/rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

/* -------------- -> MIDDLEWARE <- -------------- */
// Sirve para trabajar acciones asincronas
const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
