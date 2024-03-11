import React from 'react';
import styled from "styled-components/native";
import {IS_IOS} from "../config/theme";

const Raw = styled.TextInput`
  border-width: 1px;
  color: ${({theme}) => theme.txt};
  border-color: ${({theme}) => theme.border};
  background-color: ${({theme}) => theme.bg3};
  textAlignVertical: top;
  font-size: 16px;
  border-radius: 5px;
  height: ${IS_IOS ? 50 : 45}px;
  padding-horizontal: 10px;
  padding-top: ${({multiline}) => IS_IOS ? multiline ? 10 : 0 : 11}px;
  padding-bottom: 0;
  margin-top: 20px;
`;

const Input = ({value, onChange, placeholder, disabled, autoCapitalize, ...props}) => {
  return (
    <Raw
      value={value}
      onChangeText={onChange}
      disabled={disabled}
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      placeholderTextColor={"#8B8A8A"}
      autoCapitalize={autoCapitalize}

      {...props}
    />
  )
};

export default Input;
