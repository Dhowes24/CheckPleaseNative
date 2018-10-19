import React from 'react';
import { StyleSheet,Button, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';


class App extends React.Component {
  render() {
    return (
        <Image
            style={HomeBackground.container}
            source={}
      <View style={HomeBackground.container}>
        <Text>Open up App.js to start working on your app!</Text>
          <Button
              title="New Receipt"
              onPress={() => this.props.navigation.navigate('CaptureScreen')}
          />
          <Button
              title="Pending Receipt"
              onPress={() => this.props.navigation.navigate('ReceiptsPage')}
          />
          <Button
              title="Account"
              onPress={() => this.props.navigation.navigate('AccountPage')}
          />
      </View>
    );
  }
}

class ReceiptsPage extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> ReceiptsPage </Text>
            </View>
        );
    }
}
class AccountPage extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> AccountPage </Text>
            </View>
        );
    }
}
class CaptureScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> CaptureScreen </Text>
            </View>
        );
    }
}

export default createStackNavigator({
    Home: {
        screen: App,
    },
    CaptureScreen: {
        screen: CaptureScreen,
    },
    ReceiptsPage: {
        screen: ReceiptsPage,
    },
    AccountPage: {
        screen: AccountPage,},
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
