import React from 'react';
import { TextInput, View, Text } from 'react-native';


const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, children , style}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
 
  <View style={containerStyle}>
    <Text style={labelStyle}>{label}</Text>
    <TextInput
      autoCapitalize='none'
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCorrect={false}
      style={[inputStyle, style]}
      value={value}
      onChangeText={onChangeText}
    />
    {children}
  </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 10,
    fontSize: 16,
    lineHeight: 23,
    flex: 3,
  },
  labelStyle: {
    fontSize: 16,
    paddingLeft: 10,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
