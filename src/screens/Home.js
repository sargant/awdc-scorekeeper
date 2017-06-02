import React, { PropTypes } from 'react'
import ReactNative from 'react-native'

const { Button, View } = ReactNative

class Home extends React.Component {
  handleLocationChange = (newScreen) => () => {
    this.props.navigation.navigate(newScreen)
  }
  render = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        <Button
          title='Events'
          onPress={this.handleLocationChange('events')}
        />
        <Button
          title='Competitors'
          onPress={this.handleLocationChange('competitors')}
        />
      </View>
    )
  }
  static navigationOptions = {
    title: 'Home'
  }
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    })
  }
}

export default Home
