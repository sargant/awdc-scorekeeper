import React from 'react'
import ReactNative from 'react-native'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'
import autoConnect from 'react-redux-autoconnect'
import { actions as eventActions } from '../modules/entities/events'
import HeaderButton from '../components/HeaderButton'

const {
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View
} = ReactNative

class AddEvent extends React.Component {
  constructor () {
    super()
    this.state = {
      form: {
        name: '',
        date: moment().format('YYYY-MM-DD')
      },
      ui: {
        showDatePicker: false
      }
    }
  }
  static navigationOptions = ({ navigation }) => {
    const saveButtonAction = navigation.state.params &&
      navigation.state.params.saveButtonAction
    return {
      title: 'Add Event',
      headerRight: <HeaderButton
        onPress={saveButtonAction}
        kind='Ionicons'
        name='md-checkmark' />
    }
  }
  componentDidMount = () => {
    this.props.navigation.setParams({
      saveButtonAction: this.saveForm
    })
  }
  openDatePicker = () => {
    this.setState({ ui: { ...this.state.ui, showDatePicker: true } })
  }
  hideDatePicker = () => {
    this.setState({ ui: { ...this.state.ui, showDatePicker: false } })
  }
  setDate = (date) => {
    this.setState({ form: { ...this.state.form, date: moment(date).format('YYYY-MM-DD') } })
    this.hideDatePicker()
  }
  saveForm = () => {
    if (this.state.form.name.trim() === '') {
      Alert.alert('Please enter a name')
      return
    }
    if (!this.state.form.date) {
      Alert.alert('Please select a date')
      return
    }
    this.props.addEvent({
      name: this.state.form.name.trim(),
      date: this.state.form.date
    })
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
            onChangeText={text => this.setState({ form: { ...this.state.form, name: text } })}
            autoFocus
            autoCorrect={false}
            autoCapitalize='sentences'
            underlineColorAndroid='rgba(0,0,0,0)'
            value={this.state.form.name}
          />
        </View>
        <Text style={styles.textInputLabel}>
          Date
        </Text>
        <View style={styles.staticTextWrapper}>
          <TouchableOpacity onPress={this.openDatePicker}>
            <Text style={styles.staticText}>
              {moment(this.state.form.date).format('Do MMMM YYYY')}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            mode='date'
            datePickerModeAndroid='spinner'
            isVisible={this.state.ui.showDatePicker}
            onCancel={this.hideDatePicker}
            onConfirm={this.setDate}
          />
        </View>
      </View>
    )
  }
  static mapDispatchToProps = {
    addEvent: eventActions.add
  }
  static propTypes = {
    addEvent: React.PropTypes.func.isRequired,
    navigation: React.PropTypes.shape({
      setParams: React.PropTypes.func.isRequired,
      goBack: React.PropTypes.func.isRequired
    })
  }
}

const styles = {
  mainView: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  textInputWrapper: {
    borderColor: 'grey',
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 4
  },
  staticTextWrapper: {
    borderColor: 'grey',
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 4,
    height: 48,
    justifyContent: 'center'
  },
  textInput: {
    fontSize: 18,
    height: 40,
    paddingHorizontal: 16
  },
  staticText: {
    fontSize: 18,
    paddingHorizontal: 16
  },
  textInputLabel: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16
  }
}

export default autoConnect(AddEvent)
