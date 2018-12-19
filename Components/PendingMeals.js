import {Image, ImageBackground, StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";

import {
    Container, Content,
} from 'native-base'

import React from "react";
import PendingMealsCards from './PendingMealsCards'
import TouchableItem from "react-navigation/src/views/TouchableItem";
import {List, ListItem, Text} from "react-native-elements"


export default class PendingMeals extends React.Component {
state={
    owned: true,
    ownedData: [{EventName: 'PoolParty', DateTime: '4/20 - 4:20', EventID: 1}, {EventName: 'PoolParty', DateTime: '4/23 - 4:20', EventID: 2}],
    unOwnedData: [{EventName: 'Jakes Pool Party', DateTime:'3/27 - 2:30', EventID: 3}],
    loading:true

};

    static navigationOptions = {
        header:null
    };

    componentWillMount() {
        //UnOwnedEventsList.php
            //Parameters[AdminContact, Phone]
        //Parse Return JSON

        //OwnedEventsList.php
            //Parameters[AdminContact]
        //Parse Return JSON

    }

    parseOwned(){
        const currentData = [];
        //set State after parse
    }

    parseUnOwned(){
        const currentData = [];
        //set State after parse
    }

    componentDidMount() {
    //Make Request for Owned & UnOwned Data
        //Put into respective arrays


    //if current Query Data is NUll... which will be set to null upon entry on page
    //Query Database for
    //Select * from events where AdminContact = 781; -- for owned Meals
    //Select Events.EventID, Events.Data, Events.AdminContact from events left join Participants on Participants.EventID = Events.EventID Where Participants.Contact = 781 and Events.AdminContact!= 781;
    //781 is the CONTACT info
    //Else just use old Query Data for respective Toggle


    this.setState({loading:false})
}

renderFooter = () => {
    if (!this.state.loading) return null;
    return(
        <View>
            <ActivityIndicator animating size={"large"}/>
        </View>
    )
};
    render() {
        return (
            <ImageBackground source={require('../assets/Mobile_background.png')}
                             style={{width: '100%', height: '100%'}}>
                <View style={styles.PageView}>
                    <TouchableOpacity  onPress={() =>
                        this.props.navigation.navigate('HomeScreen')
                    }
                                       style={styles.BackButton}>
                        <Image source={require('../assets/Back_arrow.png')}
                               style={styles.BackButtonImage}/>
                    </TouchableOpacity>
                    <Text style={styles.TitleText}>
                        PendingMeals
                    </Text>
                </View>
                <View style={styles.Toggle}>
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
                    <List containerStyle={{borderTopWidth:0, borderBottomWidth:0, marginTop: 0}}>
                        <FlatList
                        data={this.state.owned ? this.state.ownedData : this.state.unOwnedData}
                        renderItem={({ item }) => (
                            <PendingMealsCards Meal={item.EventName} DateTime={item.DateTime}/>
                        )}
                        keyExtractor={item => item.EventID}
                        ListFooterComponent={this.renderFooter()}/>
                    </List>
                </Content>

            </ImageBackground>
        )
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
        height: '85%',
        marginLeft: '15%',
        top: '20%'
    },
    Toggle:{
        left: '2.5%',
        height: '10%',
        width: '95%',
        flex:0,
        backgroundColor: 'white',
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
        fontSize: 40,
        color: 'white',
        marginTop: '13%',
        marginRight:'15%',
    }
});
