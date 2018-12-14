import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

import {Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon} from "native-base";

class PendingMealsCards extends Component {
    render() {

        return (
            <Card transparent={true}>
                <CardItem>
                    <Left>
                        <Body>
                        <Text style={styles.MealName}>
                            {this.props.Meal}
                        </Text>
                        <Text note>
                            {this.props.DateTime}
                        </Text>
                        </Body>
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={() => {
                            //Get meal Info
                            //Render SpecificMealPage with Data associated the click
                        }}
                                          style={styles.iconStyle}>
                            <Image source={require('../assets/info_icon.png')}/>
                        </TouchableOpacity>
                    </Right>
                </CardItem>
                <CardItem>
                    <Image style={styles.barStyle} source={require("../assets/brown_bar.png")}/>
                </CardItem>
            </Card>
        )
    }

}

export default PendingMealsCards;

const styles = StyleSheet.create({

    barStyle: {
        width: '95%', marginLeft: '2.5%', height: 3, marginTop: '-5%'
    },
    iconStyle: {
        marginTop: '0%',
        marginRight: '10%',
    },
    MealName: {
        fontSize: 25,
        paddingBottom: '8%'

    }
});