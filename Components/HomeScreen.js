import React from 'react';
import { StyleSheet,Button, Text, View } from 'react-native';
import CaptureScreen from './CaptureScreen';


export default class HomeScreen extends React.Component {
    static navigationOptions ={
        header:null
    };

    render() {
        return (
            <View style={HomeBackground.container}>
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

const HomeBackground = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});