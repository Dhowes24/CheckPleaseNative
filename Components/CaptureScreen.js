import React from 'react';
import { StyleSheet,Button, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { Camera, Permissions, FileSystem } from 'expo';

export default class CaptureScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        actualPhoto: null,
    };

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    takePicture = async () => {
        console.log('pressed');
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo.uri);
            this.setState({actualPhoto: photo})
        }
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
    }
}