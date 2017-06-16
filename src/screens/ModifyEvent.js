import React from 'react'
import ReactNative from 'react-native'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'
import autoConnect from 'react-redux-autoconnect'
import * as events from '../modules/entities/events'
import HeaderButton from '../components/HeaderButton'
import textColors from '../styles/textColors'
import idx from 'idx'

const {
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View
} = ReactNative

class ModifyEventScreen extends React.Component {
  constructor (props) {
    super(props)
    const isEditing = !!props.event
    this.inputRefs = {}
    this.state = {
      form: {
        name: isEditing ? props.event.name : '',
        date: isEditing ? props.event.date : moment().format('YYYY-MM-DD')
      },
      ui: {
        isEditing,
        showDatePicker: false
      }
    }
  }
  static navigationOptions = ({ navigation }) => {
    const saveButtonAction = idx(navigation, _ => _.state.params.saveButtonAction)
    const isEditing = !!idx(navigation, _ => _.state.params.id)
    return {
      title: isEditing ? 'Edit Event' : 'Add Event',
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
    this.inputRefs.name.blur()
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
      id: this.state.ui.isEditing ? this.props.event.id : undefined,
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
            ref={ref => { this.inputRefs.name = ref }}
            onChangeText={text => this.setState({ form: { ...this.state.form, name: text } })}
            autoFocus
            autoCorrect={false}
            autoCapitalize='sentences'
            underlineColorAndroid='transparent'
            value={this.state.form.name}
          />
        </View>
        <Text style={styles.textInputLabel}>
          Date
        </Text>
        <View style={styles.textInputWrapper}>
          <TouchableOpacity onPress={this.openDatePicker}>
            <Text style={styles.staticText}>
              {moment(this.state.form.date).format('Do MMMM YYYY')}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            mode='date'
            datePickerModeAndroid='calendar'
            isVisible={this.state.ui.showDatePicker}
            onCancel={this.hideDatePicker}
            onConfirm={this.setDate}
          />
        </View>
      </View>
    )
  }
  static mapStateToProps = (state, props) => ({
    event: events.selectors.get(state, idx(props, _ => _.navigation.state.params.id))
  })
  static mapDispatchToProps = {
    addEvent: events.actions.add
  }
  static propTypes = {
    event: React.PropTypes.object,
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
    backgroundColor: 'white',
    borderColor: textColors.divider.black,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textInput: {
    fontSize: 18,
    lineHeight: 1.2 * 18,
    height: 1.2 * 18,
    marginVertical: 8,
    marginHorizontal: 16,
    color: textColors.primary.black
  },
  staticText: {
    fontSize: 18,
    lineHeight: 1.2 * 18,
    marginVertical: 8,
    marginHorizontal: 16,
    color: textColors.primary.black
  },
  textInputLabel: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16,
    color: textColors.disabled.black
  }
}

export default autoConnect(ModifyEventScreen)
