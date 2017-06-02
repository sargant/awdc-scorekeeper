import Expo from 'expo'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './src/modules/rootReducer'
import App from './src/App'

const store = createStore(rootReducer)

const RootComponent = () =>
  <Provider store={store}>
    <App />
  </Provider>

Expo.registerRootComponent(RootComponent)
