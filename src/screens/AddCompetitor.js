import React, { PropTypes } from 'react'
import ReactNative from 'react-native'
import autoConnect from 'react-redux-autoconnect'
import { actions as competitorActions } from '../modules/entities/competitors'

const { Button, View } = ReactNative

class AddCompetitorScreen extends React.Component {
  render = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title='Add Brian'
          onPress={() => this.props.addCompetitor({ name: 'Brian' })}
        />
      </View>
    )
  }
  static navigationOptions = {
    title: 'Add Competitor'
  }
  static mapDispatchToProps = {
    addCompetitor: competitorActions.add
  }
  static propTypes = {
    addCompetitor: PropTypes.func.isRequired
  }
}

export default autoConnect(AddCompetitorScreen)
