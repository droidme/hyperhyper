import React, { useState } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { auth, storage } from '../firebase.js';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import UserAvatar from './UserAvatar.js';


const ChangeableAvatar = (props) => {
    const [uri, setUri] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        return await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    };

    const uploadImage = async ({ uri }, name) => {

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed')); // error occurred, rejecting
            };
            xhr.responseType = 'blob'; // use BlobModule's UriHandler
            xhr.open('GET', uri, true); // fetch the blob from uri in async mode
            xhr.send(null); // no initial data
        });

        const ref = storage
            .ref("profile-pictures")
            .child(name);
        const snapshot = await ref.put(blob);
        const remoteUri = await snapshot.ref.getDownloadURL();

        // when we're done sending it, close and release the blob
        blob.close();

        // return the result, eg. remote URI to the image
        return remoteUri;
    }

    const setAvatar = async () => {
        try {
            result = await pickImage();
            if (result && !result.cancelled) {
                setLoading(true);
                const remoteURI = await uploadImage(result, auth.currentUser.uid);
                await auth.currentUser.updateProfile({
                    photoURL: remoteURI
                });
                setUri(remoteURI);
            }
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <ActivityIndicator />;
    };

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => setAvatar()} >
            {uri ? <UserAvatar source={{ uri }}{...props} /> : <UserAvatar {...props} />}
        </TouchableOpacity>
    );
}

export default ChangeableAvatar;