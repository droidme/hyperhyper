import React, { useLayoutEffect } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

const ProfileScreen = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Profile",
            headerBackTitle: "Hyper",
        });
    }, [navigation]);

    return (
        <View>
            <StatusBar style="light"></StatusBar>
            <Text>Profile</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
