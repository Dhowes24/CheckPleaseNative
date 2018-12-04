import React from 'react';
import { StyleSheet,Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import CaptureScreen from './Components/CaptureScreen';
import HomeScreen from './Components/HomeScreen';
import LoginScreen from './Components/LoginScreen';


export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}


const AppNavigator = createStackNavigator({
    Home: {
        screen: LoginScreen,
    },
    HomeScreen:{
      screen: HomeScreen,
    },
    CaptureScreen: {
        screen: CaptureScreen,
    },
    // ReceiptsPage: {
    //     screen: ReceiptsPage,
    // },
    // AccountPage: {
    //     screen: AccountPage,},
}, {
    initialRouteName: 'Home',
});

const HomeBackground = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
