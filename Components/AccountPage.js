import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image, ImageBackground
} from "react-native";

import {Container, Content, Card, CardItem, Body, Left, Right, Button, Footer, Icon} from 'native-base'

export default class AccountPage extends React.Component {
//Call Database and Fill in accordingly
    state = {
        //User
        //Password
        //Phone

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
                    height: '100%',
                    flex: 1,
                    backgroundColor: 'white'
                }}>
                    <Button full={true} transparent={true} style={{height: 100}}>
                        <Left>
                            <Text style={styles.baseText}>
                                Name
                            </Text>
                        </Left>
                    </Button>
                    <Image source={require('../assets/brown_bar.png')}
                           style={styles.barStyle}/>
                    <Button full={true} transparent={true} style={{height: 100}}
                            onPress={() => this.props.navigation.navigate('PasswordChange')}>
                        <Left>
                            <Text style={styles.baseText}>
                                Password
                            </Text>
                        </Left>
                    </Button>
                    <Image source={require('../assets/brown_bar.png')}
                           style={styles.barStyle}/>
                    <Button full={true} transparent={true} style={{height: 100}}>
                        <Left>
                            <Text style={styles.baseText}>
                                Past Orders
                            </Text>
                        </Left>
                    </Button>
                    <Image source={require('../assets/brown_bar.png')}
                           style={styles.barStyle}/>
                    <Body marginTop={'45%'}>
                    <Button full={true} transparent={true}
                            onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.signOut}>
                            Sign Out
                        </Text>
                    </Button>
                    </Body>
                </Content>
            </ImageBackground>
        )
    }

    //Page for Past Orders
    //Must make table for this as well
    //decide on that later
}
const styles = StyleSheet.create({
    baseText: {
        fontSize: 30,
        paddingLeft: '5%'
    },
    signOut: {
        fontSize: 18,
        color: 'darkred',
        textDecorationLine: 'underline',
    },
    barStyle: {
        width: '90%', height: '0.75%', marginTop: '-8%', marginLeft: '5%'
    }
});