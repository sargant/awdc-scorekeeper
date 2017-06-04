import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icons from '@expo/vector-icons'

const HeaderButton = ({ onPress, kind, name }) => {
  const Icon = Icons[kind]

  if (!Icon) {
    throw new Error(`Unknown icon type '${kind}'`)
  }

  return (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 16 }}>
      <Icon name={name} color='white' size={24} />
    </TouchableOpacity>
  )
}

HeaderButton.propTypes = {
  kind: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func
}

export default HeaderButton
