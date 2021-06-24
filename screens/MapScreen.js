import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Modal,
    TouchableOpacity
} from 'react-native'
import { Text, Card } from 'react-native-elements';
import { SimpleLineIcons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { db } from '../firebase.js';
import {
    StatusIcon,
    ObjectKeyValueItem,
    ObjectListItem
} from '../components';

const MapScreen = ({ navigation, route }) => {

    const [loading, setLoading] = useState(true);
    const [objects, setObjects] = useState([]);
    const [selected, setSelected] = useState(null);

    const { id, NAME } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: NAME,
            headerBackTitle: "Hyper",
        });
    }, [navigation]);

    // load data
    useEffect(() => {
        const unsubscribe = db
            .collection(`maps/${id}/objects`)
            .orderBy('OBJ_ALARMSTATE')
            .onSnapshot((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setObjects(data);
                setLoading(false);
            });
        return unsubscribe
    }, []);

    const enterObject = (object) => {
        setSelected(object);
    }

    if (loading) {
        return <ActivityIndicator style={styles.activityIndicator} />;
    };

    return (
        <SafeAreaView>
            <StatusBar style="light"></StatusBar>
            <Modal
                animationType="slide"
                transparent={true}
                visible={selected != null}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.modalView}>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.close} onPress={() => setSelected(null)}>
                            <SimpleLineIcons name="close" size={24} color="black" />
                        </TouchableOpacity>

                        <Text h3 style={{ fontWeight: "800" }}>
                            <StatusIcon status={selected?.OBJ_ALARMSTATE} size={36} /> {selected?.OBJ_NAME}
                        </Text>
                        <Card.Divider />
                        <ScrollView>
                            {selected && Object.keys(selected)
                                .filter(k => k !== "id")
                                .map(k =>
                                    <ObjectKeyValueItem key={k} k={k} v={selected[k]} />
                                )}
                        </ScrollView>

                    </View>
                </View>
            </Modal>
            <ScrollView>
                {objects.map(o => <ObjectListItem key={o.id} object={o} enterObject={() => enterObject(o)} />)}
            </ScrollView>
        </SafeAreaView>
    );
};

export default MapScreen

const styles = StyleSheet.create({
    activityIndicator: {
        height: "100%"
    },
    modalView: {
        flex: 1,
        marginTop: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        margin: 10
    },
    close: {
        position: "absolute",
        top: 5,
        right: 10,
        zIndex: 1
    },
})
