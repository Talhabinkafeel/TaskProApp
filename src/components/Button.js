import React from 'react';
import styled from "styled-components/native";
import {Spinner} from "./index";

const Btn = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  background-color: ${({theme, transparent, danger, warning}) =>
  transparent ? 'transparent' : theme[warning ? 'warning' : danger ? 'danger' : 'primary']};
  ${({transparent}) => transparent ? `border-width: 1px;`: ''}
  border-color: ${({theme}) => theme.primary};
  height: 45px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: 100%; 
`;

const BtnTx = styled.Text`
  color: ${({theme, transparent}) => !transparent ? '#fff' : theme.primary};
  font-size: ${({fontSize}) => fontSize || 16}px;
  font-weight: 500;
  
`;

const Button = ({title, onPress, style, transparent, fontSize, disabled, danger, warning, loading}) =>
  <Btn onPress={onPress} style={style} disabled={disabled} danger={danger} warning={warning}
       transparent={transparent}>
    {loading ? <Spinner color="#fff" size="small"/> : <BtnTx transparent={transparent} fontSize={fontSize}>{title}</BtnTx>}
  </Btn>;

export default Button;
