import React from 'react';
import {StyleSheet, Button, Text, View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import CaptureScreen from './CaptureScreen';


export default class HomeScreen extends React.Component {
    static navigationOptions ={
        header:null
    };

    render() {
        return (
            <ImageBackground source={require('../assets/Home_Page_Background.png')}
                             style={{width: '100%', height: '100%'}}>
                <Image
                    source={require('../assets/Home_Page_Logo.png')}
                    style={{alignContent:'center', marginTop: '10%', marginLeft: '17.5%', width: '65%', height:'35%'}}>
                </Image>
            <View style={HomeBackground.container}>
                <View style={HomeBackground.buttonBorder}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('CaptureScreen')}
                >
                    <Text style={HomeBackground.clickableText}>
                        New Receipt
                    </Text>
                </TouchableOpacity>
                </View>
                <View style={HomeBackground.buttonBorder}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('PendingMeals')}
                    >
                        <Text style={HomeBackground.clickableText}>
                            Pending Receipt
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={HomeBackground.buttonBorder}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AccountPage')}
                    >
                        <Text style={HomeBackground.clickableText}>
                            Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        );
    }
}

const HomeBackground = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'-60%'
    },
    buttonBorder:{
        borderColor:'brown',
        borderWidth: 3,
        width:'65%',
        height:'7%',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: '3%'
    },
    clickableText:{
        fontSize: 20,
        marginTop: '5%'
    }
});