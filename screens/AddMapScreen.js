import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Alert } from "react-native";
import { auth, db } from "../firebase";

const AddMapScreen = ({ navigation }) => {
  const [map, setMap] = useState("");

  const createMap = async () => {
    await db
      .collection("myMaps")
      .add({
        user: auth.currentUser.email,
        mapNameName: map,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Map",
      headerBackTitle: "Maps",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a map name"
        leftIcon={<AntDesign name="wechat" size={24} color="black" />}
        value={map}
        onChangeText={(text) => setMap(text)}
        onSubmitEditing={createMap}
      />
      <Button title="Create new Map" onPress={createMap} />
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
