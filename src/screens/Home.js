import React, { PropTypes } from 'react'
import ReactNative from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import textColors from '../styles/textColors'

const {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = ReactNative

class Home extends React.Component {
  handleLocationChange = (newScreen) => () => {
    this.props.navigation.navigate(newScreen)
  }
  renderButton = ({ logo, title, target }) => {
    return (
      <View style={{
        marginTop: 16,
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: 'white',
        borderColor: textColors.divider.black,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth
      }}>
        <TouchableOpacity onPress={this.handleLocationChange(target)}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Ionicons color='#009688' size={30} name={logo} />
            <Text style={{ color: '#009688', fontSize: 24, marginLeft: 32 }}>
              {title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render = () => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5F5F5'
      }}>
        {this.renderButton({ logo: 'md-flag', title: 'Events', target: 'events' })}
        {this.renderButton({ logo: 'md-person', title: 'Competitors', target: 'competitors' })}
        {this.renderButton({ logo: 'md-settings', title: 'Settings', target: 'settings' })}
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
