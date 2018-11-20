import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import reducers from '../reducers'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistCombineReducers } from 'redux-persist'

const config = {
  key: 'root',
  storage,
  blacklist: [],
  debug: true
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
    compose(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        createLogger()
      )
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  store.history = history

  const persistor = persistStore(store)
  return { persistor, store }
}
