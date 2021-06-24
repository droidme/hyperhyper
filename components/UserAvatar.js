import React from 'react'
import { Avatar } from 'react-native-elements';
import { auth } from '../firebase.js';

const UserAvatar = (props) => {

    if (auth.currentUser?.photoURL) {
        return (
            <Avatar rounded source={{ uri: auth.currentUser.photoURL }}  {...props} />
        );
    };

    return (
        <Avatar rounded source={require("../assets/avatar.png")}  {...props} />
    );
}

export default UserAvatar;