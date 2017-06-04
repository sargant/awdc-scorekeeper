import React from 'react'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './modules/rootReducer'
import { createLogger } from 'redux-logger'
import { autoRehydrate, persistStore } from 'redux-persist'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      createLogger({ collapsed: true })
    ),
    autoRehydrate()
  )
)

persistStore(store, { storage: AsyncStorage })

class Store extends React.Component {
  render = () => {
    const { children } = this.props
    return (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }
  static propTypes = {
    children: React.PropTypes.node.isRequired
  }
}

export default Store
