import React from 'react'
import { StyleSheet } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const StatusIcon = ({ status, size = 24 }) => {
    switch (status) {
        case "1":
            return <AntDesign name="exclamationcircleo" size={size} color="red" />;
        case "2":
            return <AntDesign name="warning" size={size} color="orange" />;
        case "3":
        case "4":
            return <AntDesign name="warning" size={size} color="#FDC12A" />;
        default:
            return <AntDesign name="checkcircleo" size={size} color="green" />;
    }
}

export default StatusIcon

const styles = StyleSheet.create({})
