import React, {Component} from "react";
import {
    Text,
    StyleSheet,
} from "react-native";

import {Card, CardItem, Left, Body, Right} from "native-base";


class SummaryCard extends Component {

    state = {
        ParticipantName: this.props.participantName,
        cost: 0,
    };

    render() {
        //Call Database to see all meals Associated to Users in Meals WHERE User == this.props.participantName
        //Map and add costs
        //Set State with Cost
        return (
            <Card transparent={true}>
                <CardItem>
                    <Left>
                        <Body style={styles.BodyColor}>
                        <Text style={styles.TextStyle} marginRight={'5%'}>
                            {this.state.ParticipantName}
                        </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Body style={styles.BodyColor}>
                        <Text style={styles.TextStyle} marginRight={'5%'}>
                            ${this.state.cost}
                        </Text>
                        </Body>
                    </Right>

                </CardItem>
            </Card>
        )
    }
}

export default SummaryCard;

const styles = StyleSheet.create({
    TextStyle: {
        fontSize: 18,
    },
    BodyColor: {
        flex: 0,
    },

});