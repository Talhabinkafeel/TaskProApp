/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {View, LogBox} from 'react-native';
import AppNavigator from "./src/config/AppNavigator";
import {MenuProvider} from 'react-native-popup-menu';
import {ThemeContainer} from "./src/config/theme";
import configureStore from "./src/utils/store";
import Toast from 'react-native-toast-message';
import {Provider} from "react-redux";

LogBox.ignoreLogs(['Remote']);

const App: () => Node = () => {
  const store = configureStore({});

  return (
    <Provider store={store}>
      {/*{!IS_IOS ? <StatusBar backgroundColor="#fff" barStyle="dark-content" /> : null}*/}
      <ThemeContainer>
        <MenuProvider>
          <View style={{flex: 1}}>
            <AppNavigator/>
          </View>
        </MenuProvider>
        <Toast/>
      </ThemeContainer>
    </Provider>
  );
};

export default App;
