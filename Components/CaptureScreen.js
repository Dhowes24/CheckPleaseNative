import React from 'react';
import {StyleSheet, Button, Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import axios from 'axios';

import {Camera, Permissions, FileSystem} from 'expo';

//API KEY
const cloudVisionKey = 'AIzaSyAubtQznQNsxlTo-jU79XtShR8_Iz_wPaI';

//ENDPOINTS
const cloudvision = 'https://vision.googleapis.com/v1/images:annotate?key=' + cloudVisionKey;


export default class CaptureScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };
    takePicture = async () => {
        console.log('pressed');
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            this.uploadPhoto(photo)
        }
    };
    renderCamera = () =>
        (
            <View style={{flex: 1}}>
                <Camera
                    style={{flex: 1}}
                    type={this.state.type}
                    ref={ref => {
                        this.camera = ref;
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                this.takePicture()
                            }}>
                            <Text
                                style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                                {' '}TakePicture{' '}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );


    //Vision Area

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    uploadPhoto(photo) {
        // Instantiate a FormData() object
        const imgBody = new FormData();
        imgBody.append('image', photo);
        const url = `http://your-api.com/image-upload`;
        // Perform the request. Note the content type - very important
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: imgBody
        }).then((response) => {
            let body = {
                "requests": [
                    {
                        "image": {
                            "source": {
                                "imageUri": response
                            } //Needs to be either, 64-bit (Can't fucking do in expo), public URL, or in Google storage

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
                    console.log(response.data)
                })
        })
    };

    render() {
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                this.renderCamera()
            );
        }
    };
}