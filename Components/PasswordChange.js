import React from "react";
import {
    Content,
    Body,
    Toast,
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
        User: this.props.user,
        Password: this.props.password,
        Phone: this.props.phone,
        currentPassword: '',
        newPassword: '',
        reEnterPassword: '',
    };

    changePassword(){
        //
    }

    static navigationOptions = {
        header:null
    };

    render() {
        return (
            <ImageBackground source={require('../assets/Mobile_background.png')}
                             style={{width: '100%', height: '100%'}}>
                <View style={styles.PageView}>
                    <TouchableOpacity  onPress={() =>
                        this.props.navigation.navigate('AccountPage')
                    }
                                       style={styles.BackButton}>
                        <Image source={require('../assets/Back_arrow.png')}
                               style={styles.BackButtonImage}/>
                    </TouchableOpacity>
                    <Text style={styles.TitleText}>
                        Password
                    </Text>
                </View>
                <Content style={styles.Screen}>
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
                                } else if (this.state.currentPassword !== this.state.Password) {
                                    //Password stored from AsyncStorage and passed in as prop through app
                                    Toast.show({
                                        text: "Current password incorrect",
                                        duration: 2000
                                    })
                                } else{
                                    //Change Password for user in database
                                        //Find way to pass password back through app
                                            //Maybe in go back function
                                    Toast.show({
                                        text: "Password successfully changed",
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
    Screen:{
        marginTop: '11%',
        marginBottom: '10%',
        left: '5%',
        width: '90%',
        flex: 1,
        backgroundColor: 'white',
        scrollEnabled: false,
    },
    textInputStyle: {
        fontSize: 18,
        alignSelf: 'flex-start',
        left: '4%'
    },
    barStyle: {
        width: '90%',
        height: '0.75%',
        marginTop: '0%',
        marginLeft: '5%'
    },
    BackButton: {
        marginTop:'15%',
        marginLeft: '5%'
    },
    BackButtonImage: {
        width:30,
        height:30
    },
    PageView: {
        height: '18%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    TitleText: {
        fontSize: 50,
        color: 'white',
        marginTop: '10%',
        marginRight:'22%',
    }
});
