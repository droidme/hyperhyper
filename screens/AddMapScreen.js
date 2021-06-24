import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, View, Alert, StatusBar, Switch } from "react-native";
import { Input, ListItem, Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import firebase from "firebase";

const AddMapScreen = ({ navigation }) => {
  const [maps, setMaps] = useState([]);
  const [userMaps, setUserMaps] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const userRef = db.collection("users")
      .doc(auth.currentUser.uid);

    userRef.get().then((docSnapshot) => {
      if (!docSnapshot.exists) {
        userRef.set({ maps: [] })
      }
    });

    return userRef.onSnapshot((doc) => setUserMaps(doc.data()?.maps));
  }, []);

  useEffect(() => {
    const unsubscribe = db
      .collection("maps")
      .where("NAME", ">=", filter)
      .where("NAME", "<=", filter + "~")
      .orderBy("NAME")
      .onSnapshot((snapshot) => {
        const maps = snapshot.docs.map((map) => ({
          id: map.id,
          ...map.data(),
        }));
        setMaps(maps);
      });
    return unsubscribe
  }, [filter]);

  const addMap = async (mapId) => {
    if (userMaps.length < 10) {
      await db.collection("users")
        .doc(auth.currentUser.uid)
        .update({
          maps: firebase.firestore.FieldValue.arrayUnion(mapId)
        });
    } else {
      Alert.alert("You can select a maximum of 10 maps!");
    }
  };

  const removeMap = async (mapId) => {
    await db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        maps: firebase.firestore.FieldValue.arrayRemove(mapId)
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add user defined Maps",
      headerBackTitle: "Profile",
    });
  }, [navigation]);

  const keyExtractor = (item, index) => index.toString();

  const renderMapItem = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar source={require("../assets/map.png")} />
      <ListItem.Content>
        <ListItem.Title>{item.NAME}</ListItem.Title>
      </ListItem.Content>
      <Switch
        onValueChange={(value) => value ? addMap(item.id) : removeMap(item.id)}
        value={userMaps?.indexOf(item.id) >= 0}
      />
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light"></StatusBar>
      <Input
        placeholder="Filter for maps"
        leftIcon={<AntDesign name="search1" size={24} color="black" />}
        value={filter}
        onChangeText={setFilter}
      />
      <FlatList
        keyExtractor={keyExtractor}
        data={maps}
        renderItem={renderMapItem}
      />
    </View>
  );
};

export default AddMapScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
