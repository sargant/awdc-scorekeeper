import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Expo from 'expo'

import HomeScreen from './screens/Home'
import CompetitorsScreen from './screens/Competitors'
import ModifyCompetitorScreen from './screens/ModifyCompetitor'
import EventsScreen from './screens/Events'
import ModifyEventScreen from './screens/ModifyEvent'
import SettingsScreen from './screens/Settings'
import EventOverviewScreen from './screens/EventOverview'

const navigatorRoutes = {
  home: { screen: HomeScreen },
  events: { screen: EventsScreen },
  competitors: { screen: CompetitorsScreen },
  modifyCompetitor: { screen: ModifyCompetitorScreen },
  modifyEvent: { screen: ModifyEventScreen },
  eventOverview: { screen: EventOverviewScreen },
  settings: { screen: SettingsScreen }
}

const navigatorConfig = {
  cardStyle: {
    backgroundColor: 'white'
  },
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3F51B5',
      // Expo uses a translucent status bar on android which requires an offset
      marginTop: Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0
    }
  }
}

export default StackNavigator(navigatorRoutes, navigatorConfig)
