import React from 'react';
import { StyleSheet,Button, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { Camera, Permissions, FileSystem } from 'expo';

export default class CaptureScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    componentDidMount() {
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
            console.log(e, 'Directory exists');
        });
    }

    takePicture = async() => {
        console.log(this.camera)
        if (this.camera) {
            this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
        }
        else {
            console.log('camera no operino')
        }
    };

    handleMountError = ({ message }) => console.error(message);

    onPictureSaved = async photo => {
        await FileSystem.moveAsync({
            from: photo.uri,
            to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
        });
        this.setState({ newPhotos: true });
    }

    renderCamera = () =>
        (
            <View style={{flex: 1}}>
                <Camera
                    style={{flex: 1}}
                    type={this.state.type}>
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
                            onPress={this.takePicture}>
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