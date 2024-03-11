import React from 'react';
import styled from "styled-components/native";

const Text = styled.Text.attrs({allowFontScaling: false})`
  color: ${({theme, color, primary = false}) => color ? theme[color] || color : primary ? theme.primary : theme.txt};
  ${({weight}) => `font-weight: ${weight || '400'}`}
  ${({align}) => (align ? `text-align: ${align};` : '')}
  ${({size}) => `font-size: ${size === 'big' ? 33 : size === 'large' ? 28 : size === 'title' ? 22 : size === 'medium' ? 18 : size === 'small' ? 13 : 15}px;`}
  ${({isUppercase}) => (isUppercase ? 'text-transform: uppercase;' : '')};
`;

export default Text;

// const name = weight === '900' ? 'Martel-ExtraBold' : weight === '700' ? 'Martel-Bold' : weight === '400' ? 'Martel-Regular' : 'Martel-SemiBold';
// ${({weight}) => IS_IOS ? `font-weight: ${weight || '600'}` : ''};
