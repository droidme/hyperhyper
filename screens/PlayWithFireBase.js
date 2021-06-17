import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import { Card, Text } from "react-native-elements";
import { db } from "../firebase";

const PlayWithFireBase = ({ navigation }) => {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('myMaps')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        setMaps(data);
      });
    return unsubscribe

  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Play with Firestore"
    });
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Text>Count Maps {maps.length}</Text>
      <Card>
        <Card.Title>Test</Card.Title>
      </Card>
    </View>
  );
};

export default PlayWithFireBase;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
