import React, { PropTypes } from 'react'
import ReactNative from 'react-native'
import idx from 'idx'
import autoConnect from 'react-redux-autoconnect'
import * as competitors from '../modules/entities/competitors'
import HeaderButton from '../components/HeaderButton'
import textColors from '../styles/textColors'

const { Alert, View, TextInput, Text, StyleSheet } = ReactNative

class ModifyCompetitorScreen extends React.Component {
  constructor (props) {
    super(props)
    const isEditing = !!props.competitor
    this.state = {
      form: {
        name: isEditing ? props.competitor.name : ''
      },
      ui: {
        isEditing
      }
    }
  }
  componentDidMount = () => {
    this.props.navigation.setParams({
      saveButtonAction: this.saveForm
    })
  }
  static navigationOptions = ({ navigation }) => {
    const saveButtonAction = idx(navigation, _ => _.state.params.saveButtonAction)
    const isEditing = !!idx(navigation, _ => _.state.params.id)
    return {
      title: isEditing ? 'Edit Competitor' : 'Add Competitor',
      headerRight: <HeaderButton
        onPress={saveButtonAction}
        kind='Ionicons'
        name='md-checkmark' />
    }
  }
  updateFormField = (fieldName) => (value) => {
    this.setState({
      form: {
        ...this.state.form,
        [fieldName]: value
      }
    })
  }
  saveForm = () => {
    if (this.state.form.name.trim() === '') {
      Alert.alert('Please enter a name')
      return
    }
    this.props.addCompetitor({
      id: this.state.ui.isEditing ? this.props.competitor.id : undefined,
      name: this.state.form.name.trim()
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
            onChangeText={this.updateFormField('name')}
            autoFocus
            autoCorrect={false}
            autoCapitalize='words'
            underlineColorAndroid='transparent'
            value={this.state.form.name}
          />
        </View>
      </View>
    )
  }
  static mapStateToProps = (state, props) => ({
    competitor: competitors.selectors.get(state, idx(props, _ => _.navigation.state.params.id))
  })
  static mapDispatchToProps = {
    addCompetitor: competitors.actions.add
  }
  static propTypes = {
    addCompetitor: PropTypes.func.isRequired,
    competitor: PropTypes.object,
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.number
        })
      })
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
    backgroundColor: 'white',
    borderColor: textColors.divider.black,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textInput: {
    fontSize: 18,
    lineHeight: 1.2 * 18,
    height: 1.2 * 18,
    marginHorizontal: 16,
    marginVertical: 8,
    color: textColors.primary.black
  },
  textInputLabel: {
    fontSize: 18,
    lineHeight: 1.2 * 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: textColors.disabled.black
  }
}

export default autoConnect(ModifyCompetitorScreen)
