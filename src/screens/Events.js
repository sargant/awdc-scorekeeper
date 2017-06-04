import React from 'react'
import ReactNative from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const {
  Text,
  View
} = ReactNative

class EventsScreen extends React.Component {
  static navigationOptions = {
    title: 'Events'
  }
  render = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FontAwesome name='calendar-o' color='rgba(0,0,0,0.05)' size={128} />
        <Text style={{ color: 'grey', fontSize: 24, marginTop: 32 }}>
          No events
        </Text>
      </View>
    )
  }
}

export default EventsScreen
