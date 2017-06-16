import React, { PropTypes } from 'react'
import ReactNative from 'react-native'
import textColors from '../styles/textColors'
import autoConnect from 'react-redux-autoconnect'
import { actions as competitorActions } from '../modules/entities/competitors'
import { actions as eventActions } from '../modules/entities/events'

const {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = ReactNative

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  }
  confirmResetCompetitors = () => Alert.alert(
    'Are you sure?',
    'This will delete all competitors',
    [
      { text: 'Cancel', style: 'normal' },
      { text: 'Delete', style: 'destructive', onPress: this.props.resetCompetitors }
    ]
  )
  confirmResetEvents = () => Alert.alert(
    'Are you sure?',
    'This will delete all events',
    [
      { text: 'Cancel', style: 'normal' },
      { text: 'Delete', style: 'destructive', onPress: this.props.resetEvents }
    ]
  )
  render = () => {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 32
      }}>
        <View style={{
          backgroundColor: 'white',
          borderColor: textColors.divider.black,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginBottom: 8
        }}>
          <TouchableOpacity onPress={this.confirmResetCompetitors}>
            <View style={{ padding: 8, alignItems: 'center' }}>
              <Text style={{
                color: '#F44336',
                fontSize: 18
              }}>
                Delete all competitors
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          backgroundColor: 'white',
          borderColor: textColors.divider.black,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginBottom: 8
        }}>
          <TouchableOpacity onPress={this.confirmResetEvents}>
            <View style={{ padding: 8, alignItems: 'center' }}>
              <Text style={{
                color: '#F44336',
                fontSize: 18
              }}>
                Delete all events
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  static propTypes = {
    resetCompetitors: PropTypes.func.isRequired,
    resetEvents: PropTypes.func.isRequired
  }
  static mapDispatchToProps = {
    resetCompetitors: competitorActions.reset,
    resetEvents: eventActions.reset
  }
}

export default autoConnect(SettingsScreen)
