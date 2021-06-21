import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

const StatusIcon = ({ status, size = 24 }) => {
    switch (status) {
        case "1":
            return <MaterialIcons name="error" size={size} color="red" />;
        case "2":
            return <MaterialIcons name="warning" size={size} color="orange" />;
        case "3", "4":
            return <MaterialIcons name="warning" size={size} color="yellow" />;
        default:
            return <></>;
    }
}

export default StatusIcon

const styles = StyleSheet.create({})
