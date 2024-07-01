import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { Provider } from "react-redux"
import AppRouter from './router/AppRouter';
import { store } from './store/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppRouter></AppRouter>
      </Provider>
    </>
  );
};

export default App;