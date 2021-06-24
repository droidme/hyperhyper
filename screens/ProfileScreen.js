import React, { useLayoutEffect } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native-elements';

import { auth } from '../firebase.js';
import { UserAvatar } from '../components';

const ProfileScreen = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Profile",
            headerBackTitle: "Hyper",
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"></StatusBar>

            <View style={styles.profileTopSection}>
                <View style={{ flexDirection: 'row', marginTop: 25 }}>
                    <UserAvatar size={100} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{auth.currentUser.displayName}</Text>
                        <Text style={styles.caption}>{auth.currentUser.email}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.profileSettingsSection}>
                <View style={{ flexDirection: 'row', marginTop: 25 }}>
                    <UserAvatar size={100} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{auth.currentUser.displayName}</Text>
                        <Text style={styles.caption}>{auth.currentUser.email}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.profileButtonsSection}>
                <View style={{ flexDirection: 'row', marginTop: 25 }}>
                    <UserAvatar size={100} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{auth.currentUser.displayName}</Text>
                        <Text style={styles.caption}>{auth.currentUser.email}</Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileTopSection: {
        flex: 1,
        padding: 20,
        backgroundColor: 'lightgrey',
        borderBottomWidth: 1
    },
    profileSettingsSection: {
        flex: 3,
        padding: 20,
        borderBottomWidth: 1
    },
    profileButtonsSection: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
    },
    caption: {
        fontSize: 14
    }
});
