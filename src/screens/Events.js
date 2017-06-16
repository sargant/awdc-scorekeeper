import React from 'react'
import ReactNative from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import sortBy from 'sort-by'
import moment from 'moment'
import autoConnect from 'react-redux-autoconnect'
import HeaderButton from '../components/HeaderButton'
import { selectors as eventSelectors } from '../modules/entities/events'
import textColors from '../styles/textColors'

const {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = ReactNative

class EventsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Events',
    headerRight: <HeaderButton
      onPress={() => navigation.navigate('modifyEvent')}
      kind='Ionicons'
      name='md-add' />
  })
  renderListItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('eventOverview', { id: item.id })}>
        <View style={{ marginVertical: 8, marginHorizontal: 16 }}>
          <Text style={{ fontSize: 18, lineHeight: 1.2 * 18, color: textColors.primary.black, marginBottom: 4 }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 14, lineHeight: 1.2 * 14, color: textColors.secondary.black }}>
            {moment(item.date).format('Do MMMM YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  renderListItemSeparator = () => {
    return (
      <View style={{
        borderColor: textColors.divider.black,
        borderBottomWidth: StyleSheet.hairlineWidth
      }} />
    )
  }
  renderList = () => {
    return (
      <FlatList
        data={this.props.events.sort(sortBy('-date'))}
        ItemSeparatorComponent={this.renderListItemSeparator}
        ListHeaderComponent={this.renderListItemSeparator}
        ListFooterComponent={this.renderListItemSeparator}
        renderItem={this.renderListItem}
        keyExtractor={item => item.id}
        initialNumToRender={12}
      />
    )
  }
  renderEmptyList = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name='md-flag' color='rgba(0,0,0,0.05)' size={128} />
        <Text style={{ color: 'grey', fontSize: 24, marginTop: 32 }}>
          No events
        </Text>
      </View>
    )
  }

  render = () => this.props.events.length === 0
    ? this.renderEmptyList()
    : this.renderList()

  static mapStateToProps = state => ({
    events: eventSelectors.getAll(state)
  })
  static propTypes = {
    events: React.PropTypes.array,
    navigation: React.PropTypes.shape({
      navigate: React.PropTypes.func.isRequired
    })
  }
}

export default autoConnect(EventsScreen)
