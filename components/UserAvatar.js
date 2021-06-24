import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, storage } from '../firebase.js';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const UserAvatar = (props) => {

    const { changeable } = props;

    const pickImage = async () => {
        return await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    };

    const uploadImage = async ({ uri }, name) => {
        let ref = storage.ref(name);
        //await ref.put(new File(uri));
        Alert.alert('not implemented yet');
    }

    const setAvatar = async () => {
        if (changeable) {
            try {
                result = await pickImage();
                if (result && !result.cancelled) {
                    console.log(result);
                    await uploadImage(result, 'test.jpg');
                }

            } catch (error) {
                Alert.alert(error.message);
            }
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => setAvatar()} >
            {
                !auth.currentUser?.photoURL ?
                    <Avatar rounded source={require("../assets/avatar.png")}  {...props} /> :
                    <Avatar rounded source={{ uri: auth.currentUser.photoURL }}  {...props} />
            }
        </TouchableOpacity>
    );
}

export default UserAvatar;