import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    ImageBackground
} from "react-native";

class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <ImageBackground source={require('../assets/Mobile_background.png')}
                             style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <Button title="Go To Home Screen"
                        onPress={() => this.props.navigation.navigate('HomeScreen')} />
                <Button title="testDB"
                        onPress={() =>
                        fetch('derekhowes@104.196.70.252/home/derekhowes/CheckPlease/PHPs/createEvent.php',{
                            method: 'post',
                            header:{
                                'Accept': 'application/json',
                                'Content.type': 'application/json'
                            },
                            body:JSON.stringify({
                                EventName: "testEvent",
                                Data: null,
                                AdminContact: "7818016768"
                            })
                        })
                            .then((response) => response.json)
                            .then((responseJSON) =>{
                                console.log(responseJSON);
                            })
                        } />
            </View>
            </ImageBackground>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});