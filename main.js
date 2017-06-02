import Expo from 'expo'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './src/App'

const store = createStore(state => state, { test: 'Hello world' })

const RootComponent = () =>
  <Provider store={store}>
    <App />
  </Provider>

Expo.registerRootComponent(RootComponent)
