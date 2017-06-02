import 'babel-polyfill'

import Expo from 'expo'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './src/modules/rootReducer'
import App from './src/App'
import { createLogger } from 'redux-logger'

const store = createStore(
  rootReducer,
  applyMiddleware(createLogger({ collapsed: true }))
)

const RootComponent = () =>
  <Provider store={store}>
    <App />
  </Provider>

Expo.registerRootComponent(RootComponent)
