import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import reducers from '../reducers'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const config = {
  key: 'root',
  whitelist: [],
  storage
}

const reducer = persistCombineReducers(config, {
  ...reducers,
  router: routerReducer
})

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const history = createHistory()
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware, routerMiddleware)
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  store.history = history
  const persistor = persistStore(store)
  return { persistor, store }
}
