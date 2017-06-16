import React from 'react'
import ReactNative from 'react-native'
import autoConnect from 'react-redux-autoconnect'
import textColors from '../styles/textColors'
import moment from 'moment'
import * as events from '../modules/entities/events'
import idx from 'idx'

const {
  Text,
  View
} = ReactNative

class EventOverviewScreen extends React.Component {
  static navigationOptions = {
    title: 'Event Overview'
  }
  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 16, paddingBottom: 32, alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: '#304FFE' }}>{idx(this.props, _ => _.event.name)}</Text>
          <Text style={{ fontSize: 18, marginTop: 8, color: textColors.secondary.black }}>{moment(idx(this.props, _ => _.event.date)).format('Do MMMM YYYY')}</Text>
        </View>
        <View style={{ marginHorizontal: 8 }}>
          <Text style={{ fontSize: 18, color: textColors.primary.black }}>
            Competitors
          </Text>
        </View>
      </View>
    )
  }
  static mapStateToProps = (state, props) => ({
    event: events.selectors.get(state, idx(props, _ => _.navigation.state.params.id))
  })
}

export default autoConnect(EventOverviewScreen)
