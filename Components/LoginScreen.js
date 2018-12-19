import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    ImageBackground, Image, TextInput, TouchableOpacity
} from "react-native";
import {Badge} from "react-native-elements";

class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state={
      Login:true,
      Phone:'',
      Password:'',
        User:''
    };


    login(){
        //Login.php
            //Parameters [Password, Phone]
            //Check Password to Phone Number
        this.props.navigation.navigate('HomeScreen')
    };
    signUp(){
        //SignupPHP
            //Parameters [User, Password, Phone]
    };

    render() {
        return (
            <ImageBackground source={require('../assets/Mobile_background.png')}
                             style={{width: '100%', height: '100%'}}>
                <Image
                    source={(this.state.Login ?
                        require('../assets/Login_Page_BrassLogin.png') :
                        require('../assets/Login_Page_BrassSignUp.png'))}
                    style={styles.brass}>
                </Image>
                {this.state.Login && <View
                style={styles.contentLogin}>
                    <TextInput placeholderTextColor={'darkgrey'} keyboardType={'numeric'} maxLength={10} placeholder="Enter your phone number"
                               onChangeText={(Phone) => this.setState({Phone:Phone})}
                               style={styles.textInputStyle}/>
                    <Image source={require('../assets/brown_bar.png')}
                           style={styles.barStyle}/>

                    <TextInput placeholderTextColor={'darkgrey'} secureTextEntry={true} maxLength={10} placeholder="Enter your password"
                               onChangeText={(Password) => this.setState({Password:Password})}
                               style={styles.textInputStyle}/>
                    <Image source={require('../assets/brown_bar.png')}
                           style={styles.barStyle}/>

                    <View style={styles.buttonBorderLogin}>
                        <TouchableOpacity
                            onPress={()=>this.login()}>
                            <Text style={styles.clickableText}>
                                {this.state.Login ? 'Login' : 'SignUp'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>}
                {!this.state.Login && <View
                    style={styles.contentSignUp}>
                    <TextInput placeholderTextColor={'darkgrey'} keyboardType={'numeric'} maxLength={10} placeholder="Enter your phone number"
                               onChangeText={(Phone) => this.setState({Phone:Phone})}
                               style={styles.textInputStyle}/>
                    <Image source={require('../assets/brown_bar.png')}
                           style={styles.barStyle}/>

                    <TextInput placeholderTextColor={'darkgrey'} secureTextEntry={true} maxLength={10} placeholder="Enter your password"
                               onChangeText={(Password) => this.setState({Password:Password})}
                               style={styles.textInputStyle}/>
                    <Image source={require('../assets/brown_bar.png')}
                           style={styles.barStyle}/>

                    <TextInput placeholderTextColor={'darkgrey'} secureTextEntry={true} maxLength={10} placeholder="Enter your Username"
                    onChangeText={(User) => this.setState({User:User})}
                    style={styles.textInputStyle}/>
                    <Image source={require('../assets/brown_bar.png')}
                           style={styles.barStyle}/>

                    <View style={styles.buttonBorderSignUp}>
                        <TouchableOpacity
                            onPress={()=>{this.state.Login ? this.login() : this.signUp()}}>
                            <Text style={styles.clickableText}>
                                {this.state.Login ? 'Login' : 'SignUp'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>}
            <View style={styles.container}>
                <Button
                    title={this.state.Login ? "SignUp?" : "Already have an account?"}
                    onPress={()=>
                    this.setState({Login:!this.state.Login})}/>
                <Button title="testDB"
                        onPress={() =>
                        fetch('104.196.70.252/createEvent.php',{
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
                <Button title="Test SpecificMeal Format"
                        onPress={() => this.props.navigation.navigate('SpecificMealPage')} />
            </View>
            </ImageBackground>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    brass:{
        alignSelf: 'center',
        marginTop: '30%',
        width: '64%',
        height: '15%'
    },
    contentLogin:{
        alignSelf:'center',
        marginTop: '10%',
        width: '70.5%',
        height: '25%',
        backgroundColor:'white',
        borderColor: 'gold',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 2
    },
    contentSignUp:{
        alignSelf:'center',
        marginTop: '10%',
        width: '70.5%',
        height: '32%',
        backgroundColor:'white',
        borderColor: 'gold',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 2
    },
    textInputStyle: {
        fontSize: 18,
        autoCorrect: false,
        secureTextEntry: true,
        alignSelf: 'center',
        marginTop:'7%'
    },
    barStyle: {
        width: '70%',
        height: '0.75%',
        alignSelf:'center',
        marginTop:'2%'
    },
    buttonBorderLogin: {
        borderColor: 'gold',
        borderWidth: 3,
        width: '40%',
        height: '24%',
        alignSelf:'center',
        marginTop: '5%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    buttonBorderSignUp: {
        borderColor: 'gold',
        borderWidth: 3,
        width: '40%',
        height: '19%',
        alignSelf:'center',
        marginTop: '5%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    clickableText: {
        fontSize: 20,
        alignSelf:'center'
    },
});