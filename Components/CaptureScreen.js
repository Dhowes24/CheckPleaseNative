import React from 'react';
import {StyleSheet, Button, Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import axios from 'axios';

import {Camera, Permissions, FileSystem, ImagePicker} from 'expo';

//API KEY
const cloudVisionKey = 'AIzaSyAubtQznQNsxlTo-jU79XtShR8_Iz_wPaI';

//ENDPOINTS
const cloudvision = 'https://vision.googleapis.com/v1/images:annotate?key=' + cloudVisionKey;


export default class CaptureScreen extends React.Component {
    state = {
        image: null,
        hasCameraPermission: null,
        hasCamera_rollPermission: null,
        type: Camera.Constants.Type.back,
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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    title="Take Picture"
                    onPress={this.takePicture}
                />
                {image &&
                <Image source={{uri: image}} style={{width: 200, height: 200}}/>}
            </View>
        );
    }
}