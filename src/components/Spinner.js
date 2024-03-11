import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {theme} from "../config/theme";

const Spinner = ({color, size}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator color={color || theme.light.primary} size={size || 'large'}/>
    </View>
  )
};

export default Spinner;
