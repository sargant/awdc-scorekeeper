import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Expo from 'expo'

import HomeScreen from './screens/Home'
import CompetitorsScreen from './screens/Competitors'
import AddCompetitorScreen from './screens/AddCompetitor'
import EventsScreen from './screens/Events'
import AddEventScreen from './screens/AddEvent'

const navigatorRoutes = {
  home: { screen: HomeScreen },
  events: { screen: EventsScreen },
  competitors: { screen: CompetitorsScreen },
  addCompetitor: { screen: AddCompetitorScreen },
  addEvent: { screen: AddEventScreen }
}

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

export default StackNavigator(navigatorRoutes, navigatorConfig)
