import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../fonts/selection.json';
import styled from "styled-components/native";

const IconSet = createIconSetFromIcoMoon(icoMoonConfig);

const Raw = styled(IconSet)`
  color: ${({color, theme, themeColor}) => themeColor ? theme[themeColor] : color || theme.txt};
  font-weight: 100;
`;

const Icon = ({name, size, color, style, themeColor}) =>
  <Raw name={name} size={size || 20} color={color} style={style} themeColor={themeColor}/>;

export default Icon;
