import React, { useLayoutEffect } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Text, Button } from 'react-native-elements';
import { auth } from '../firebase.js';
import { UserAvatar } from '../components';


const ProfileScreen = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Profile",
            headerBackTitle: "Hyper",
        });
    }, [navigation]);

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"></StatusBar>

            <View style={styles.profileTopSection}>
                <View style={{ flexDirection: 'row' }}>
                    <UserAvatar size={100} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.title}>{auth.currentUser.displayName}</Text>
                        <Text style={styles.caption}>{auth.currentUser.email}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.profileSettingsSection}>
                <Text>Settings</Text>
            </View>

            <View style={styles.profileButtonsSection}>
                <Button containerStyle={styles.btn} title="Logout" onPress={signOut} />
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
        flex: 4,
        padding: 20
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
