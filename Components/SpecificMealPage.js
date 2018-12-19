import React from "react";
import {
    ActivityIndicator,
    FlatList,
    ImageBackground,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Picker,
    TextInput
} from "react-native";
import {Card, CardItem, Body, Left, Right, Content} from "native-base";
import ParticipantCard from "./ParticipantCard";
import SummaryCard from "./SummaryCard";
import {Icon, Text} from "react-native-elements";
import Dropdown from "react-native-material-dropdown/src/components/dropdown";

export default class SpecificMealPage extends React.Component {

    static navigationOptions = {
        header: null
    };

    state = {
        EventID: this.props.EventID,

        mealData: [{Meal: 'crackersfsadasdasvafads', Price: '4.50'}, {Meal: 'Cheese', Price: '6.00'}],
        participants: [{Name: 'REmmy', Number: 7213123}, {Name: 'Alex', Number: 7818016768}, {
            Name: 'REmmy', Number: 7213123
        }],
        loading: true,
        title: this.props.eventName,

        pickerNames: this.props.Participants,

        ParticipantEdits:false,
        NewName:'',
        NewNumber:null,
    };

    //All Names must be attributed to 'value' for dropdown to read it

    componentWillMount() {
        //Call getParticipantsList.php
            //Parameters [EventID]
            //call parseMealData() with JSON

        //Call getMealList.php
            //Parameters [EventID]
            //call parseParticipantData() with JSON
    }

    componentDidMount() {
        this.setState({loading: false})
            //SetState with all new Data^^
    }

    parseMealData(){
        //Parse Data
        this.setState({mealData:[{Meal:'Casserole', Price:'11.00'}]})
    }

    parseParticipantData(ParticipantData){
        //Parse Data
        //This.setstate({ParticipantData:ParsedData})
    }

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View>
                <ActivityIndicator animating size={"large"}/>
            </View>
        )
    };

    specificMealCard = ({item}) => (
        <Card transparent={true}>
            <CardItem>
                <Left>
                    <Body style={styles.BodyColor}>
                    <Text style={styles.MealName}>
                        {item.Meal}
                    </Text>
                    <Text style={styles.MealName}>
                        {item.Price}
                    </Text>
                    </Body>
                </Left>
                <Right>
                    <View width={'50%'} marginRight={'60%'} marginBottom={'20%'}>
                        <Dropdown
                            label={'Assign'}
                            data={this.state.pickerNames}
                            baseColor={'black'}
                        >
                        </Dropdown>
                    </View>
                    <TouchableOpacity onPress={() => {
                        //Are You Sure Modal
                        //Learn to make
                            //call removemeal.php
                            //this.setState(MealList.result of Meallist.php Call)
                        console.log('pressed');
                        this.setState({mealData:[{Meal:'Casserole', Price:'11.00'}]});
                    }}
                    >
                        <Image source={require('../assets/Delete_Button.png')}
                               style={styles.iconStyle}/>
                    </TouchableOpacity>
                </Right>
            </CardItem>
        </Card>
    );

    render() {

        return (
            <ImageBackground source={require('../assets/Mobile_background.png')}
                             style={{width: '100%', height: '100%'}}>

                <View style={styles.PageView}>
                    <TouchableOpacity onPress={() =>
                        //Also Should Update Database
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
                {!this.state.ParticipantEdits &&<View style={styles.ParticipantsView}>
                    <View style={styles.ParticipantHeaderView}>
                        <Text style={styles.ParticipantsText}>
                            Participants
                        </Text>
                        <TouchableOpacity onPress={() =>
                        {
                            this.setState({ParticipantEdits:true})
                            //Open Form to enter new name and number
                                //or choose from contacts
                            //Add to participant Array and insert with Query
                                //Then re-render
                        }}>
                            <Text style={styles.EditText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.participants}
                        renderItem={({item}) => (
                            <ParticipantCard participantName={item.Name} participantsNumber={item.Number}/>
                        )}
                    />
                </View>}

                {this.state.ParticipantEdits && <View style={styles.ParticipantsView}>
                    <View style={styles.ParticipantHeaderView}>
                        <Text style={styles.ParticipantsText}>
                            Participants
                        </Text>
                        <TouchableOpacity onPress={() =>
                        {
                            //Query to add Participant
                                //params [Event ID, ParticipantName, ParticipantNumber]
                            //rerender
                        }}>
                            <Text style={styles.AddExitText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>
                        {
                            this.setState({ParticipantEdits:false})
                        }}>
                            <Text style={styles.AddExitText}>
                                Exit
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View flexDirection={'row'}>
                        <TextInput placeholderTextColor={'darkgrey'} autoCorrect={false} placeholder="Name"
                                   onChange={(Name) => this.setState({NewName:Name})}
                                   style={styles.textNameInput}/>

                        <TextInput placeholderTextColor={'darkgrey'} autoCorrect={false} keyboardType={'numeric'}
                                   maxLength={10} placeholder="Number"
                                   onChange={(Number) => this.setState({NewNumber:Number})}
                                   style={styles.textNumberInput}/>

                    </View>
                    <View flexDirection={'row'}>
                        <Image source={require('../assets/black_bar.png')}
                        style={styles.nameBarStyle}/>
                        <Image source={require('../assets/black_bar.png')}
                        style={styles.numberBarStyle}/>
                    </View>
                </View>}

                <View style={styles.MealsView}>
                    <FlatList
                        data={this.state.mealData}
                        renderItem={this.specificMealCard}
                        keyExtractor={item => item.EventID}
                        ListFooterComponent={this.renderFooter()}
                        style={styles.FlatListStyle}
                    />
                </View>

                <View style={styles.SummaryView}>
                    <Text style={styles.ParticipantsText}>
                        Summary
                    </Text>
                    <FlatList
                        data={this.state.participants}
                        renderItem={({item}) => (
                            <SummaryCard participantName={item.Name}/>
                        )}
                    />
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
    ParticipantAddition:{
      flexDirection:'row',
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
    AddExitText: {
        marginLeft: '30%',
        marginTop: '4%',
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
    },
    barStyle: {
        width: '95%',
        marginLeft: '2.5%',
        height: 3,
        marginTop: '-5%'
    },
    iconStyle: {
        marginRight: '10%',
        width: 25,
        height: 25,
        marginTop: '-45%'
    },
    MealName: {
        fontSize: 18,
        paddingBottom: '8%',
        color: 'white',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
    },
    BodyColor: {
        backgroundColor: 'green',
        flex: 0,
        width: '80%',
        marginTop: '-10%',
        marginLeft: '-3%'
    },

    PickerStyle: {
        marginTop: '-15%',
        marginRight: '90%',
        width: '40%',
        baseColor: 'black'
    },
    textNameInput: {
        fontSize: 20,
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginTop:'5%',
        width:'40%'
    },
    textNumberInput: {
        fontSize: 20,
        alignSelf: 'flex-end',
        marginLeft: '5%',
        marginTop:'5%',
        width:'40%',
    },
    nameBarStyle: {
        width: '40%',
        marginLeft: '2.5%',
        height: 2,
        alignSelf: 'left',
        flex:0

    },
    numberBarStyle: {
        width: '40%',
        marginLeft: '10%',
        height: 2,
        alignSelf: 'center',
        flex:0
    },

});