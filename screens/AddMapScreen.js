import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import { Input, Text, ListItem, Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase";

const AddMapScreen = ({ navigation }) => {
  const [maps, setMaps] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection('maps')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaps(data);
      });
    return unsubscribe
  }, []);

  const addMap = async (map) => {
    await db
      .collection("userMaps")
      .add({
        user: auth.currentUser.uid,
        map: map.id,
      })
      .then(() => {
        //navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Map",
      headerBackTitle: "Maps",
    });
  }, [navigation]);


  const keyExtractor = (item, index) => index.toString();

  const renderMapItem = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar source={require('../assets/map.png')} />
      <ListItem.Content>
        <ListItem.Title>{item.MAPS_NAME}</ListItem.Title>
      </ListItem.Content>
      <TouchableOpacity onPress={() => addMap(item)}>
        <SimpleLineIcons name="plus" size={24} color="black" />
      </TouchableOpacity>
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
      <Text>{filter}</Text>
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
