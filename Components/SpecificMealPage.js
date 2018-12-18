import React from "react";
import {ActivityIndicator, FlatList, ImageBackground, StyleSheet, View, Image, TouchableOpacity,} from "react-native";
import SpecificMealCard from "./SpecificMealCard";
import ParticipantCard from "./ParticipantCard";
import {Icon, Text} from "react-native-elements";
import * as navigation from "react-native";

export default class SpecificMealPage extends React.Component {

    static navigationOptions = {
        header: null
    };

    state = {
        mealData: [{Meal: 'crackersfsadasdasvafads', Price: '4.50'}, {Meal: 'Cheese', Price: '6.00'}],
        participants: [{Name: 'REmmy', Number: 7213123}, {Name: 'Alex', Number: 7818016768}, {
            Name: 'REmmy', Number: 7213123
        }],
        loading: true,
        title: this.props.eventName
    };

    //All Names must be attributed to 'value' for dropdown to read it

    componentDidMount() {

        this.setState({loading: false})
    }

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
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
                    <TouchableOpacity onPress={() =>
                        this.props.navigation.navigate('HomeScreen')
                    }
                                      style={styles.BackButton}>
                        <Image source={require('../assets/Back_arrow.png')}
                               style={styles.BackButtonImage}/>
                    </TouchableOpacity>
                    <Text style={styles.TitleText}>
                        {this.state.title != null ? this.state.title : 'Untitled'}
                    </Text>
                </View>
                <View style={styles.ParticipantsView}>
                    <View style={styles.ParticipantHeaderView}>
                        <Text style={styles.ParticipantsText}>
                            Participants
                        </Text>
                        <TouchableOpacity onPress={() =>
                        {
                            //Open Form to enter new name and number
                                //or choose from contacts
                            //Add to participant Array and insert with Query
                                //Then re-render
                        }}>
                            <Text style={styles.EditText}>
                                Edit
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.participants}
                        renderItem={({item}) => (
                            <ParticipantCard participantName={item.Name} participantsNumber={item.Number}/>
                        )}
                    />
                </View>

                <View style={styles.MealsView}>
                    <FlatList
                        data={this.state.mealData}
                        renderItem={({item}) => (
                            <SpecificMealCard Meal={item.Meal} Price={item.Price}
                                              Participants={this.state.participants}/>
                        )}
                        keyExtractor={item => item.EventID}
                        ListFooterComponent={this.renderFooter()}
                        style={styles.FlatListStyle}
                    />
                </View>

                <View style={styles.SummaryView}>

                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    PageView: {
        height: '18%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ParticipantsView: {
        left: '2.5%',
        height: '15%',
        width: '95%',
        flex: 0,
        backgroundColor: 'white',
    },
    ParticipantHeaderView: {
        flexDirection: 'row'
    },
    ParticipantsText: {
        marginLeft: '5%',
        marginTop: '2%',
        fontSize: 20,
        fontWeight: 'bold',
    },
    EditText: {
        marginLeft: '60%',
        marginTop: '3%',
        fontSize: 18,
        textDecorationLine: 'underline',
        color: 'darkblue'
    },
    MealsView: {
        marginTop: '5%',
        left: '2.5%',
        height: '40%',
        width: '95%',
        flex: 0,
        backgroundColor: 'white',
    },
    SummaryView: {
        marginTop: '5%',
        left: '2.5%',
        height: '20%',
        width: '95%',
        flex: 0,
        backgroundColor: 'white',
    },
    FlatListStyle: {
        marginTop: '5%',
    },
    BackButton: {
        marginTop: '15%',
        marginLeft: '5%'
    },
    BackButtonImage: {
        width: 30,
        height: 30
    },
    TitleText: {
        fontSize: 50,
        color: 'white',
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '25%',
    }

});