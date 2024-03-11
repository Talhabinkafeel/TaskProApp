import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {isIphoneX} from 'react-native-iphone-x-helper';

export const IS_IOS = Platform.OS === 'ios';
export const IS_IPHONE_X = isIphoneX();
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

const theme = {
  dark: {
    mode: 'dark',
    txt: 'rgba(255, 255, 255, 0.9)',
    inputBg: '#242a34',
    bg: '#3d434c',
    bg2: '#373b43',
    bg3: '#464c59',
    headerBg: '#121212',
    title: '#fff',
    primary: '#3498DB',
    secondary: '#3FD5B7',
    gray: '#848484',
    border: '#333333',
    danger: '#e74c3c',
    warning: '#e67e22'
  },
  light: {
    mode: 'light',
    txt: '#172850',
    inputBg: '#f1f3f0',
    bg: '#F8F8FD',
    bg2: '#CCDAED',
    bg3: '#fff',
    headerBg: '#fff',
    title: '#000',
    primary: '#3498DB',
    secondary: '#3FD5B7',
    gray: '#848484',
    border: '#DEE1E9',
    // border: '#AAB5C6',
    danger: '#e74c3c',
    warning: '#e67e22'
  },
  body: {
    flex: 1
  },
  smallInput: {
    height: 35, paddingLeft: 5, paddingTop: IS_IOS ? 0 : 5
  }
};

const sharedStyles = {
  centeredContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const ThemeContainer = (props) => {
  const scheme = useColorScheme();

  return (
    <ThemeProvider theme={scheme === 'dark' ? theme.dark : theme.light}>
      {props.children}
    </ThemeProvider>
  )
};

const getTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? theme.dark : theme.light;
};

export {theme, ThemeContainer, getTheme, sharedStyles}
