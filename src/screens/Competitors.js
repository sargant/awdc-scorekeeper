import React, { PropTypes } from 'react'
import ReactNative from 'react-native'
import autoConnect from 'react-redux-autoconnect'
import { Ionicons } from '@expo/vector-icons'
import { selectors as competitorSelectors } from '../modules/entities/competitors'

const { TouchableOpacity, FlatList, Text, View, StyleSheet } = ReactNative

class CompetitorsScreen extends React.Component {
  renderListItem = (row) => {
    return (
      <View style={{ margin: 16 }}>
        <Text style={{ fontSize: 16 }}>{row.item.name}</Text>
      </View>
    )
  }
  renderListItemSeparator = () => {
    return (
      <View style={{ borderColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth }} />
    )
  }
  render = () => {
    return (
      <FlatList
        data={this.props.competitors}
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
    headerRight: <HeaderRightButton onPress={() => navigation.navigate('addCompetitor')} />
  })
  static mapStateToProps = state => ({
    competitors: competitorSelectors.getAll(state)
  })
  static propTypes = {
    competitors: PropTypes.array
  }
}

class HeaderRightButton extends React.Component {
  render = () => {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Ionicons name='md-person-add' color='white' size={24} style={{ marginRight: 16 }} />
      </TouchableOpacity>
    )
  }
  static propTypes = {
    onPress: PropTypes.func.isRequired
  }
}

export default autoConnect(CompetitorsScreen)
