import React from "react";
import {
    Container,
    Content,
    Card,
    CardItem,
    Body,
    Button,
    Form,
    Item,
    Input,
    Toast,
    Left,
    Right,
    Icon
} from 'native-base'
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground
} from "react-native";

export default class PasswordChange extends React.Component {
    state = {
        //User
        //Password
        //Phone
        currentPassword: '',
        newPassword: '',
        reEnterPassword: '',
    };

    static navigationOptions = {
        headerStyle: {}
    };

    render() {
        return (
            <ImageBackground source={require('../assets/Mobile_background.png')}
                             style={{width: '100%', height: '100%'}}>

                <Content style={{
                    marginTop: '30%',
                    marginBottom: '10%',
                    left: '5%',
                    width: '90%',
                    flex: 1,
                    backgroundColor: 'white',
                    scrollEnabled: false,
                }}>
                    <Body style={styles.formStyle}>
                    <TextInput placeholderTextColor={'darkgrey'} autoCorrect={false} secureTextEntry={true} placeholder="Enter Current Password"
                               onChangeText={(password) => this.onChangeCurrent(password)}
                               style={styles.textInputStyle}/>
                    </Body>
                    <Image source={require('../assets/black_bar.png')}
                           style={styles.barStyle}/>
                    <Body style={styles.formStyle}>
                    <TextInput placeholderTextColor={'darkgrey'} autoCorrect={false} secureTextEntry={true} placeholder="Enter New Password"
                               onChangeText={(password) => this.onChangeNew(password)}
                               style={styles.textInputStyle}/>
                    </Body>
                    <Image source={require('../assets/black_bar.png')}
                           style={styles.barStyle}/>
                    <Body style={styles.formStyle}>
                    <TextInput placeholderTextColor={'darkgrey'} autoCorrect={false} secureTextEntry={true} placeholder="Re-enter New Password" onChangeText={(password) => this.onChangeReEntered(password)}
                               style={styles.textInputStyle} />
                    </Body>
                    <Image source={require('../assets/black_bar.png')}
                           style={styles.barStyle}/>
                    <Body marginTop={'40%'}>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.checkFields()) {
                                if (this.state.reEnterPassword !== this.state.newPassword) {
                                    Toast.show({
                                        text: "New passwords do not match!",
                                        duration: 2000
                                    })
                                } else if (this.state.currentPassword) {
                                    //TODO after acessing Database, Check Database for correct Password
                                    Toast.show({
                                        text: "Current password incorrect",
                                        duration: 2000
                                    })
                                }
                            }
                        }}>
                        <Image
                            source={(this.checkFields() ?
                                require('../assets/changePassword_Active.png') :
                                require('../assets/changePassword_Inactive.png'))}
                            style={{width: 195, height: 60}}/>
                    </TouchableOpacity>
                    </Body>
                </Content>

            </ImageBackground>
        )
    }

    onChangeCurrent(password) {
        this.setState({currentPassword: password});
        this.checkFields()
    }

    onChangeNew(password) {
        this.setState({newPassword: password});
        this.checkFields()
    }

    onChangeReEntered(password) {
        this.setState({reEnterPassword: password});
        this.checkFields()
    }

    checkFields() {
        return this.state.currentPassword !== '' && this.state.newPassword !== '' && this.state.reEnterPassword !== '';
    }
}
//3.2611 X button Height is appropriate height


const styles = StyleSheet.create({
    buttonBody: {
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: '20%',
    },
    formStyle: {
        borderColor: 'transparent',
        paddingBottom: 5,
        paddingTop: 30,
        justifyContent: 'left',
        alignContent: 'left',
        width: '90%'
    },
    textInputStyle: {
        fontSize: 18,
        autoCorrect: false, secureTextEntry: true, alignSelf: 'flex-start', left: '4%'
    },
    barStyle: {
        width: '90%', height: '0.75%', marginTop: '0%', marginLeft: '5%'
    }
});
