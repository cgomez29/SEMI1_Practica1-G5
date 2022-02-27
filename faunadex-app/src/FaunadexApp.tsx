import { AppRouter } from './routes/AppRouter';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

import 'bootswatch/dist/sandstone/bootstrap.min.css';
export const FaunadexApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
// DEPENDENCIAS
// npm install react-redux redux redux-thunk
// npm install @types/react-redux "OPCIONAL apartir de la version 7.6.3"
// npm install formik
// npm i yup
// npm i bootswatch axios
