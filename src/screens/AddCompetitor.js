import React from 'react'
import ReactNative from 'react-native'

const { Text, View } = ReactNative

class AddCompetitorScreen extends React.Component {
  render = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Placeholder</Text>
      </View>
    )
  }
  static navigationOptions = {
    title: 'Add Competitor'
  }
}

export default AddCompetitorScreen
