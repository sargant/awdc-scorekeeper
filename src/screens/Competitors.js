import React, { PropTypes } from 'react'
import ReactNative from 'react-native'
import autoConnect from 'react-redux-autoconnect'
import { selectors as competitorSelectors } from '../modules/entities/competitors'

const { Button, FlatList, Text, View, StyleSheet } = ReactNative

class CompetitorsScreen extends React.Component {
  renderListItem = (row) => {
    return (
      <View style={{ margin: 16 }}>
        <Text>{row.item.name}</Text>
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
        renderItem={this.renderListItem}
        keyExtractor={item => item.id}
      />
    )
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Competitors',
    headerRight: <Button
      title='Add'
      color='white'
      onPress={() => navigation.navigate('addCompetitor')}
    />
  })
  static mapStateToProps = state => ({
    competitors: competitorSelectors.getAll(state)
  })
  static propTypes = {
    competitors: PropTypes.array
  }
}

export default autoConnect(CompetitorsScreen)
