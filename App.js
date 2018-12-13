import React from 'react';
import { StyleSheet,Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import CaptureScreen from './Components/CaptureScreen';
import HomeScreen from './Components/HomeScreen';
import LoginScreen from './Components/LoginScreen';
import ReceiptsPage from "./Components/ReceiptsPage";
import AccountPage from "./Components/AccountPage";
import PasswordChange from "./Components/PasswordChange";
import {Root} from "native-base"


export default class App extends React.Component {
  render() {
    return (
        <Root>
      <AppNavigator/>
        </Root>
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
    ReceiptsPage: {
        screen: ReceiptsPage,
    },
    AccountPage: {
        screen: AccountPage,},
    PasswordChange: {
        screen: PasswordChange,
    },
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
