import styled from "styled-components/native";
import {Dimensions} from "react-native";

const InputContainer = styled.View`
  background-color: ${({theme}) => theme.bg3};
  marginHorizontal: 10px;
  borderRadius: 30px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  padding-horizontal: 10px;
`;

const Input = styled.TextInput.attrs(({theme}) => ({placeholderTextColor: theme.gray, color: theme.txt}))`
  marginHorizontal: 10px;
  borderRadius: 30px;
  width: ${Dimensions.get('window').width - 150}px;
  color: ${({theme}) => theme.txt};
`;

const IconContainer = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.mode === 'dark' ? '#465265' : '#fff'};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export {Input, InputContainer, IconContainer, Row};
