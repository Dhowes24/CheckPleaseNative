import {Image, ImageBackground, StyleSheet, View} from "react-native";

import {
    Container, Content,
} from 'native-base'

import React from "react";
import PendingMealsCards from './PendingMealsCards'
import TouchableItem from "react-navigation/src/views/TouchableItem";


export default class PendingMeals extends React.Component {
state={
    owned: true
};

    render() {
        return (
            <ImageBackground source={require('../assets/Mobile_background.png')}
                             style={{width: '100%', height: '100%'}}>
                <View style={{
                    marginTop:'10%',
                    left: '2.5%',
                    height: '10%',
                    width: '95%',
                    flex:0,
                    backgroundColor: 'white',
                }}>
                    <TouchableItem onPress={() => {
                        this.setState({owned: !this.state.owned})}
                    } >
                    <Image
                        source={(this.state.owned ?
                            require('../assets/pending-switch-button-Owed.png') :
                            require('../assets/pending-switch-button.png'))}
                        style={styles.imageButton}/>
                    </TouchableItem>
                </View>

                <Content style={{
                    marginTop: '5%',
                    marginBottom: '5%',
                    left: '2.5%',
                    width: '95%',
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                    <PendingMealsCards Meal={'Pool Party'} DateTime={'4/20 - 4:20'}/>
                    <PendingMealsCards/>
                    <PendingMealsCards/>
                    <PendingMealsCards/>
                    <PendingMealsCards/>
                    <PendingMealsCards/>
                    <PendingMealsCards/>
                    <PendingMealsCards/>
                </Content>

            </ImageBackground>
        )
    }

    findMeals(){
     //if current Query Data is NUll... which will be set to null upon entry on page
        //Query Database for
            //Select * from events where AdminContact = 781; -- for owned Meals
            //Select Events.EventID, Events.Data, Events.AdminContact from events left join Participants on Participants.EventID = Events.EventID Where Participants.Contact = 781 and Events.AdminContact!= 781;
            //781 is the CONTACT info
     //Else just use old Query Data for respective Toggle
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageButton: {
        alignContent: 'center',
        justifyContent: 'center',
        flex:0,
        width: '70%',
        height: '110%',
        marginLeft: '15%',
        top: '20%'


    }
});
