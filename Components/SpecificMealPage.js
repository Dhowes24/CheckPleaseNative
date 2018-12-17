import React from "react";
import {ActivityIndicator, FlatList, ImageBackground, StyleSheet, View} from "react-native";
import SpecificMealCard from "./SpecificMealCard";
import ParticipantCard from "./ParticipantCard";
import {Text} from "react-native-elements";

export default class SpecificMealPage extends React.Component {

    static navigationOptions = {
        header: null
    };

    state = {
        mealData: [{Meal: 'crackersfsadasdasvafads', Price: '4.50'}, {Meal: 'Cheese', Price: '6.00'}],
        participants: [{Name: 'REmmy', Number: 7213123}, {Name: 'Alex', Number: 7818016768}, {Name: 'REmmy', Number: 7213123
        }],
        loading: true,
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
                </View>
                <View style={styles.ParticipantsView}>
                    <Text style={styles.ParticipantsText}>
                        Participants
                    </Text>
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
    PageView:{
      height:'18%'
    },
    ParticipantsView: {
        left: '2.5%',
        height: '15%',
        width: '95%',
        flex: 0,
        backgroundColor: 'white',
    },
    ParticipantsText:{
      marginLeft: '5%',
        marginTop:'2%',
        fontSize:20,
        fontWeight:'bold'
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

    }

});