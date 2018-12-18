import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Picker
} from "react-native";
import {Dropdown} from 'react-native-material-dropdown';

import {Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon} from "native-base";

class SpecificMealCard extends Component {

    state = {
        selected: '',
        pickerNames: this.props.Participants,
    };

    renderPickerVariables = () => {
        return this.state.pickerNames.map((Name, Number) => (
            <Picker.Item label={Name} value={Number}/>
        ))
    };

    render() {

        return (
            <Card transparent={true}>
                <CardItem>
                    <Left>
                        <Body style={styles.BodyColor}>
                        <Text style={styles.MealName}>
                            {this.props.Meal}
                        </Text>
                        <Text style={styles.MealName}>
                            {this.props.Price}
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
                            //Modal Deletes from Database and calls again then sets state
                        }}
                        >
                            <Image source={require('../assets/Delete_Button.png')}
                                   style={styles.iconStyle}/>
                        </TouchableOpacity>
                    </Right>
                </CardItem>
            </Card>
        )
    }

}


export default SpecificMealCard;

const styles = StyleSheet.create({

    barStyle: {
        width: '95%', marginLeft: '2.5%', height: 3, marginTop: '-5%'
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
    }

});