/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Navigator from './src/Navigation/navigation'
import { Provider } from 'react-redux';
import store from './src/Redux/Store/store'
import NavigtionService from './src/Navigation/NavigationService';


// // Ask for consent first if necessary
// // Possibly only do this for iOS if no need to handle a GDPR-type flow


export default class App extends React.Component {

  render() {
    console.disableYellowBox = true
    return (
      <View style={{ flex:1 }}>
        <Provider store={store}>
          <Navigator 
          ref={(navigatorRef) => {
            NavigtionService.setTopLevelNavigator(navigatorRef);
            }} />
          </Provider>
      </View>
    );
  }
};

