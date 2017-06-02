import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

const App = ({ test }) =>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{test}</Text>
  </View>

App.propTypes = {
  test: PropTypes.string
}

export default connect(
  state => ({
    test: state.test
  })
)(App)
