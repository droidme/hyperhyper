import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MapScreen = ({ navigation, route }) => {

    console.log(route);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.name,
            headerBackTitle: "Maps",
        });
    }, [navigation]);

    return (
        <View>
            <Text>Maps {route.params.name}</Text>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})
