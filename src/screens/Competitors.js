import React, { PropTypes } from 'react'
import ReactNative from 'react-native'
import autoConnect from 'react-redux-autoconnect'
import HeaderButton from '../components/HeaderButton'
import { selectors as competitorSelectors } from '../modules/entities/competitors'
import sortBy from 'sort-by'

const {
  FlatList,
  Text,
  View,
  StyleSheet
} = ReactNative

class CompetitorsScreen extends React.Component {
  renderListItem = ({ item }) => {
    return (
      <View style={{ margin: 16 }}>
        <Text style={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.87)' }}>
          {item.name}
        </Text>
      </View>
    )
  }
  renderListItemSeparator = () => {
    return (
      <View style={{
        borderColor: 'rgba(0, 0, 0, 0.38)',
        borderBottomWidth: StyleSheet.hairlineWidth
      }} />
    )
  }
  render = () => {
    return (
      <FlatList
        data={this.props.competitors.sort(sortBy('name'))}
        ItemSeparatorComponent={this.renderListItemSeparator}
        ListHeaderComponent={this.renderListItemSeparator}
        ListFooterComponent={this.renderListItemSeparator}
        renderItem={this.renderListItem}
        keyExtractor={item => item.id}
      />
    )
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Competitors',
    headerRight: <HeaderButton
      onPress={() => navigation.navigate('addCompetitor')}
      kind='Ionicons'
      name='md-person-add' />
  })
  static mapStateToProps = state => ({
    competitors: competitorSelectors.getAll(state)
  })
  static propTypes = {
    competitors: PropTypes.array
  }
}

export default autoConnect(CompetitorsScreen)
