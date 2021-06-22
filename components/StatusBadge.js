import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { Badge } from 'react-native-elements';

const StatusBadge = (props) => {

    const { CRITICAL, MAJOR, WARNING, MINOR, CLEAR } = props.alerts;

    if (CRITICAL > 0)
        return <Badge value={CRITICAL} {...props} status="error" />;

    if (MAJOR > 0)
        return <Badge value={MAJOR} {...props} status="warning" />;

    if (WARNING > 0)
        return <Badge value={WARNING} {...props} status="warning" />;

    if (MINOR > 0)
        return <Badge value={MINOR} {...props} status="primary" />;


    return <Badge value={CLEAR} {...props} status="success" />;

}

export default StatusBadge

const styles = StyleSheet.create({})
