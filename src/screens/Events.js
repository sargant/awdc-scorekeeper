import React from 'react'
import ReactNative from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import sortBy from 'sort-by'
import moment from 'moment'
import autoConnect from 'react-redux-autoconnect'
import HeaderButton from '../components/HeaderButton'
import { selectors as eventSelectors } from '../modules/entities/events'

const {
  FlatList,
  StyleSheet,
  Text,
  View
} = ReactNative

class EventsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Events',
    headerRight: <HeaderButton
      onPress={() => navigation.navigate('addEvent')}
      kind='Ionicons'
      name='md-add' />
  })
  renderNoEvents = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FontAwesome name='calendar-o' color='rgba(0,0,0,0.05)' size={128} />
        <Text style={{ color: 'grey', fontSize: 24, marginTop: 32 }}>
          No events
        </Text>
      </View>
    )
  }
  renderListItem = ({ item }) => {
    return (
      <View style={{ margin: 16 }}>
        <Text style={{ fontSize: 20, color: 'rgba(0,0,0,0.87)', marginBottom: 4 }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 16, color: 'rgba(0,0,0,0.54)' }}>
          {moment(item.date).format('Do MMMM YYYY')}
        </Text>
      </View>
    )
  }
  renderListItemSeparator = () => {
    return (
      <View style={{
        borderColor: 'rgba(0,0,0,0.38)',
        borderBottomWidth: StyleSheet.hairlineWidth
      }} />
    )
  }
  render = () => {
    return (
      <FlatList
        data={this.props.events.sort(sortBy('-date'))}
        ItemSeparatorComponent={this.renderListItemSeparator}
        ListHeaderComponent={this.renderListItemSeparator}
        ListFooterComponent={this.renderListItemSeparator}
        renderItem={this.renderListItem}
        keyExtractor={item => item.id}
      />
    )
  }
  static mapStateToProps = state => ({
    events: eventSelectors.getAll(state)
  })
  static propTypes = {
    events: React.PropTypes.array
  }
}

export default autoConnect(EventsScreen)
