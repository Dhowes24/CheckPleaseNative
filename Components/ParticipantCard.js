import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Picker
} from "react-native";

import {Card, CardItem, Left,Body, Right, Button, Icon} from "native-base";


class ParticipantCard extends Component {

    state={
        ParticipantName:this.props.participantName,
        ParticipantNumber:this.props.participantsNumber
    };

    render() {
        return (
            <Card transparent={true}>
                <CardItem >
                    <Left>
                        <Body style={styles.BodyColor}>
                        <Text style={styles.TextStyle} marginRight={'5%'}>
                        {this.state.ParticipantName}
                        </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Body style={styles.BodyColor}>
                        <Text style={styles.TextStyle} marginLeft={'5%'}>
                        {this.state.ParticipantNumber}
                        </Text>
                        </Body>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}

export default ParticipantCard;

const styles = StyleSheet.create({
    TextStyle:{
        fontSize:18,
    },
    BodyColor: {
        flex: 0,
    },

});