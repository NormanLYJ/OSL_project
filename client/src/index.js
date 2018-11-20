require("babel-core/register");

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import FastClick from 'fastclick';
import deepForceUpdate from 'react-deep-force-update';

import configureStore from './store/configureStore';
import sagas from './sagas';
import {appRoutes } from './routes';

import './styles/global.scss';

FastClick.attach(document.body);
const container = document.getElementById('app');

let initialState =
  {
  } 


const { persistor, store } = configureStore(initialState);
store.runSaga(sagas);

let appInstance = ReactDOM.render(
  <Provider store={store} >
    <PersistGate persistor={persistor}>
      {appRoutes(store) }
    </PersistGate>
  </Provider>,
  container
);

 // Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./routes/', () => {
    if (appInstance) {
      try {
        // Force-update the whole tree, including components that refuse to update
        deepForceUpdate(appInstance);
      } catch (error) {
        appInstance = null;
        document.title = `Hot Update Error: ${error.message}`;
        ReactDOM.render(<ErrorReporter error={error} />, container);
        return;
      }
    }
  });
}
