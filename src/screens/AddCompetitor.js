import React, { PropTypes } from 'react'
import ReactNative from 'react-native'
import autoConnect from 'react-redux-autoconnect'
import { Entypo } from '@expo/vector-icons'
import { actions as competitorActions } from '../modules/entities/competitors'
import HeaderButton from '../components/HeaderButton'

const { Alert, View, TextInput, Text, StyleSheet } = ReactNative

class AddCompetitorScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      form: {
        name: ''
      }
    }
  }
  componentDidMount = () => {
    this.props.navigation.setParams({
      saveButtonAction: this.saveForm
    })
  }
  static navigationOptions = ({ navigation }) => {
    const saveButtonAction = navigation.state.params &&
      navigation.state.params.saveButtonAction
    const headerRight =
      <HeaderButton
        onPress={saveButtonAction || (() => {})}>
        <Entypo name='save' color='white' size={24} />
      </HeaderButton>
    return {
      title: 'Add Competitor',
      headerRight
    }
  }
  saveForm = () => {
    if (this.state.form.name.trim() === '') {
      Alert.alert('Please enter a name')
      return
    }
    this.props.addCompetitor({ name: this.state.form.name.trim() })
    this.props.navigation.goBack()
  }
  render = () => {
    return (
      <View style={styles.mainView}>
        <Text style={styles.textInputLabel}>
          Name
        </Text>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ form: { name: text } })}
            autoFocus
            autoCorrect={false}
            autoCapitalize='words'
            underlineColorAndroid='rgba(0,0,0,0)'
            value={this.state.form.name}
          />
        </View>
      </View>
    )
  }
  static mapDispatchToProps = {
    addCompetitor: competitorActions.add
  }
  static propTypes = {
    addCompetitor: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired
    })
  }
}

const styles = {
  mainView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 16
  },
  textInputWrapper: {
    borderColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textInput: {
    fontSize: 18,
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: 'white'
  },
  textInputLabel: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 8
  }
}

export default autoConnect(AddCompetitorScreen)
