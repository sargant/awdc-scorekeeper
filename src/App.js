import React from 'react'
import { StatusBar, View } from 'react-native'
import Store from './Store'
import Navigator from './Navigator'

const App = () => {
  return (
    <Store>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
        <Navigator onNavigationStateChange={null} />
      </View>
    </Store>
  )
}

export default App
