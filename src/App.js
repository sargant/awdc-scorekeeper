import React from 'react'
import Expo from 'expo'
import { Platform, StatusBar, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import HomeScreen from './screens/Home'
import CompetitorsScreen from './screens/Competitors'
import AddCompetitorScreen from './screens/AddCompetitor'

const navigatorConfig = {
  cardStyle: {
    backgroundColor: 'white'
  },
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#009688',
      // Expo uses a translucent status bar on android which requires an offset
      marginTop: Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0
    }
  }
}

const navigatorRoutes = {
  home: { screen: HomeScreen },
  competitors: { screen: CompetitorsScreen },
  addCompetitor: { screen: AddCompetitorScreen }
}

const Navigator = StackNavigator(navigatorRoutes, navigatorConfig)

export default function App () {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' />
      <Navigator onNavigationStateChange={null} />
    </View>
  )
}
