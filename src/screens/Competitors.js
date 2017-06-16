import React, { PropTypes } from 'react'
import ReactNative from 'react-native'
import autoConnect from 'react-redux-autoconnect'
import HeaderButton from '../components/HeaderButton'
import { selectors as competitorSelectors } from '../modules/entities/competitors'
import sortBy from 'sort-by'
import { Ionicons } from '@expo/vector-icons'
import textColors from '../styles/textColors'

const {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} = ReactNative

class CompetitorsScreen extends React.Component {
  renderListItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('modifyCompetitor', { id: item.id })}>
        <View style={{ marginVertical: 8, marginHorizontal: 16 }}>
          <Text style={{ fontSize: 18, lineHeight: 24, color: textColors.primary.black }}>
            {item.name}
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
        data={this.props.competitors.sort(sortBy('name'))}
        ItemSeparatorComponent={this.renderListItemSeparator}
        ListHeaderComponent={this.renderListItemSeparator}
        ListFooterComponent={this.renderListItemSeparator}
        renderItem={this.renderListItem}
        keyExtractor={item => item.id}
        initialNumToRender={20}
      />
    )
  }
  renderNoCompetitors = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name='md-person' color='rgba(0,0,0,0.05)' size={128} />
        <Text style={{ color: 'grey', fontSize: 24, marginTop: 32 }}>
          No competitors
        </Text>
      </View>
    )
  }

  render = () => this.props.competitors.length === 0
    ? this.renderNoCompetitors()
    : this.renderList()

  static navigationOptions = ({ navigation }) => ({
    title: 'Competitors',
    headerRight: <HeaderButton
      onPress={() => navigation.navigate('modifyCompetitor')}
      kind='Ionicons'
      name='md-person-add' />
  })
  static mapStateToProps = state => ({
    competitors: competitorSelectors.getAll(state)
  })
  static propTypes = {
    competitors: PropTypes.array,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    })
  }
}

export default autoConnect(CompetitorsScreen)
