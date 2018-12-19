import React from 'react';
import {StyleSheet, Button, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import axios from 'axios';

import {Camera, Permissions, FileSystem, ImagePicker} from 'expo';

//API KEY
const cloudVisionKey = 'AIzaSyAubtQznQNsxlTo-jU79XtShR8_Iz_wPaI';

//ENDPOINTS
const cloudvision = 'https://vision.googleapis.com/v1/images:annotate?key=' + cloudVisionKey;


export default class CaptureScreen extends React.Component {

    static navigationOptions = {
        header:null
    };

    state = {
        image: null,
        hasCameraPermission: null,
        hasCamera_rollPermission: null,
        type: Camera.Constants.Type.back,
        mealData:[]
    };

    CreateEvent(){
        //Call after During OCR JSON retrieval
            //CreateEventPHP
                //Parameters[EventName = Null, Data, AdminContact, Date, Time]
        //Get EventID from above parameters ^
            //addParticipantPHP
                //Parameters[Contact, ParticipantName, EventID]
            //Loop
                //addMealPHP for each meal
                    //Parameters [Meal_Owner, Meal_Name, Meal_Price, EventID]
        // Navigate to Specific Meal Page
            //Props [EventID]

    }

    takePicture = async () => {
        console.log('pressed');
        let photo = await ImagePicker.launchCameraAsync({
            base64: true,
        });
        if (!photo.cancelled) {
            this.uploadPhoto(photo.base64);
        }
        // if (this.camera) {
        //     this.camera.takePictureAsync(

        //         {base64: true,}
        //         ).then(newPhoto => {
        //             this.uploadPhoto(newPhoto.base64);
        //     })
        // }
    };
    // renderCamera = () =>
    //     (
    //         <View style={{flex: 1}}>
    //             <Camera
    //                 style={{flex: 1}}
    //                 type={this.state.type}
    //                 ref={ref => {
    //                     this.camera = ref;
    //                 }}
    //             >
    //                 <View
    //                     style={{
    //                         flex: 1,
    //                         backgroundColor: 'transparent',
    //                         flexDirection: 'row',
    //                     }}>
    //                     <TouchableOpacity
    //                         style={{
    //                             flex: 0.1,
    //                             alignSelf: 'flex-end',
    //                             alignItems: 'center',
    //                             justifyContent: 'center',
    //                         }}
    //                         onPress={() => {
    //                             this.takePicture()
    //                         }}>
    //                         <Text
    //                             style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
    //                             {' '}TakePicture{' '}
    //                         </Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </Camera>
    //         </View>
    //     );


    //Vision Area

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
        const {status_Roll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({hasCamera_rollPermission: status_Roll === 'granted'});


    }

    uploadPhoto(photo) {
        let body = {
            "requests": [
                {
                    "image": {
                        "content": photo

                    },
                    "features": [
                        {
                            "type": "TEXT_DETECTION",
                            "maxResults": 1
                        }
                    ]
                }
            ]
        };

        axios.post(cloudvision, body)
            .then(function (response) {
                let text = response.data.responses[0];
                let coveredText = [];
                for (let i = 0; i < text.textAnnotations.length; i++) {
                    coveredText.push(0);
                }
                for (let i = 1; i < text.textAnnotations.length; i++) {
                    let currentLine = text.textAnnotations[i].description;
                    if (coveredText[i] == 0){
                        let upperY = text.textAnnotations[i].boundingPoly.vertices[0].y;
                        for (let j = i+1; j < text.textAnnotations.length; j++) {
                            if (text.textAnnotations[j].boundingPoly.vertices[0].y - upperY <= 10 && text.textAnnotations[j].boundingPoly.vertices[0].y - upperY >= -10){
                                currentLine = currentLine + " " +text.textAnnotations[j].description;
                                coveredText[j] = 1;
                            }
                        }
                        console.log(currentLine);
                        coveredText[i] = 1;
                    }
                }
                //console.log(response.data.responses[0].textAnnotations[i].description.toLowerCase())

            })

    };

    render() {
        //This lets me previ ew but not crop vv
        //     const {hasCameraPermission} = this.state;
        //     if (hasCameraPermission === null) {
        //         return <View/>;
        //     } else if (hasCameraPermission === false) {
        //         return <Text>No access to camera</Text>;
        //     } else {
        //         return (
        //             this.renderCamera()
        //         );
        //     }
        // };
        let {image} = this.state;

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
                        Take Picture
                    </Text>
                </View>
                <View style={styles.content}>
                <Image source={require('../assets/PictureCaptureOnBoarding.png')}
                style={styles.onBoarding}>
                </Image>
            <View style={styles.buttonBorder}>
                <TouchableOpacity
                    onPress={() => this.takePicture()}>
                    <Text style={styles.clickableText}>
                        Take Picture
                    </Text>
                </TouchableOpacity>
                {image &&
                <Image source={{uri: image}} style={{width: 200, height: 200}}/>}
            </View>
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    content:{
        marginTop: '6%',
        marginBottom: '10%',
        left: '5%',
        width: '90%',
        flex: 1,
        backgroundColor: 'white',
        scrollEnabled: false,
    },
    buttonBorder: {
        marginTop:'10%',
        borderColor: 'brown',
        borderWidth: 3,
        alignSelf:'center',
        flex:0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    onBoarding:{
        marginTop: '30%',
        alignSelf: 'center',
        width:'100%',
        height:'40%',
        flex:0
    },
    PageView: {
        height: '18%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    BackButton: {
        marginTop:'15%',
        marginLeft: '5%'
    },
    BackButtonImage: {
        width:30,
        height:30
    },
    TitleText: {
        fontSize: 40,
        color: 'white',
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '25%',
    },
    clickableText: {
        fontSize: 20,
        marginTop: '5%',
    },
});