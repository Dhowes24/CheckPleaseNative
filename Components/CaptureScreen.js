import React from 'react';
import { StyleSheet,Button, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

import { Camera, Permissions, FileSystem } from 'expo';

//API KEY
const cloudVisionKey ='AIzaSyAubtQznQNsxlTo-jU79XtShR8_Iz_wPaI';

//ENDPOINTS
const cloudvision = 'https://vision.googleapis.com/v1/images:annotate?key=' + cloudVisionKey;

//BUCKETS
const imageBucket = 'checkpleaseimagebucket';

export default class CaptureScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    takePicture = async () => {
        console.log('pressed');
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            this.detectText(photo)
        }
    };



    //Vision Area

    detectText(photo) {
        this.uploadPhoto(photo);
        console.log('made it');
        let body = {
            "requests": [
                {
                    "image": {
                        "source": {
                            "imageUri": "gs://"+imageBucket+photo.uri
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
        }

        axios.post(cloudvision, body)
            .then(function (response) {
                console.log(response.data)
            })
    }

    //TODO: Fix for this importing Node Stand Library Mod "Stream", Isnt supported by React Native
    uploadPhoto(photo){
            // format the image data
            const image = {
                uri: photo.uri,
                type: 'image/jpeg',
                name:'Check',
            };
            // Instantiate a FormData() object
            const imgBody = new FormData();
            const url = `/Router`;
            // Perform the request. Note the content type - very important
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: imgBody
            }).then(res => res.json()).then(results => {
                // Just me assigning the image url to be seen in the view
                const source = { uri: photo.uri, isStatic: true };
                const images = this.state.images;
                images[index] = source;
                this.setState({ images });
            }).catch(error => {
                console.error(error);
            });
        };


    renderCamera = () =>
        (
            <View style={{flex: 1}}>
                <Camera
                    style={{flex: 1}}
                    type={this.state.type}
                    ref={ref => { this.camera = ref; }}
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
        )

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