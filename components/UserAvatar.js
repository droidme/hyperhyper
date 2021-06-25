import React from 'react'
import { Avatar } from 'react-native-elements';
import { auth } from '../firebase.js';

const UserAvatar = (props) => {

    return (
        !auth.currentUser?.photoURL ?
            <Avatar rounded source={require("../assets/avatar.png")}  {...props} /> :
            <Avatar rounded source={{ uri: auth.currentUser.photoURL }}  {...props} />
    );
}

export default UserAvatar;