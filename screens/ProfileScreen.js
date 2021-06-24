import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Text, ListItem, Switch } from 'react-native-elements';
import { auth, db } from '../firebase.js';
import { UserAvatar } from '../components';


const ProfileScreen = ({ navigation }) => {

    const [userDefinedMaps, setUserDefinedMaps] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Profile",
            headerBackTitle: "Hyper",
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .onSnapshot((snap) => setUserDefinedMaps(snap.data()?.userDefinedMaps));

        return unsubscribe;
    }, []);

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };

    const changeUserDefinedMaps = async (value) => {
        await db.collection("users")
            .doc(auth.currentUser.uid)
            .update({
                userDefinedMaps: value
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"></StatusBar>

            <View style={styles.profileTopSection}>
                <View style={{ alignItems: 'center' }}>
                    <UserAvatar size={100} />
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={styles.title}>{auth.currentUser.displayName}</Text>
                        <Text style={styles.caption}>{auth.currentUser.email}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.profileSettingsSection}>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Only use defined Maps</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        onValueChange={changeUserDefinedMaps}
                        value={userDefinedMaps}
                    />
                </ListItem>
                {userDefinedMaps &&
                    <ListItem bottomDivider onPress={() => navigation.navigate("AddMap")}>
                        <ListItem.Content>
                            <ListItem.Title>Add user defined Maps</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                }

            </View>

            <View style={styles.profileButtonsSection}>
                <ListItem bottomDivider topDivider onPress={signOut}>
                    <ListItem.Content style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <ListItem.Title style={{ color: 'red' }}>Logout</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

            </View>

        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    profileTopSection: {
        flex: 2,
        padding: 20,
        backgroundColor: 'lightgrey'
    },
    profileSettingsSection: {
        flex: 5,
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
