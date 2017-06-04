import React from 'react'
import { TouchableOpacity } from 'react-native'

const HeaderButton = ({ onPress, children }) =>
  <TouchableOpacity onPress={onPress} style={{ marginRight: 16 }}>
    {children}
  </TouchableOpacity>

HeaderButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired
}

export default HeaderButton
