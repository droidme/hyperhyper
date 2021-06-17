import React, { useLayoutEffect } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

const MapScreen = ({ navigation, route }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.name,
            headerBackTitle: "Maps",
        });
    }, [navigation]);

    return (
        <View>
            <StatusBar style="light"></StatusBar>
            <Text>Maps {route.params.name}</Text>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})
