import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, ScrollView, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { Card, Text, ListItem } from "react-native-elements";
import { SimpleLineIcons } from "@expo/vector-icons";
import { db } from "../firebase";
import { generateDB } from "../init-base.js";

const PlayWithFireBase = ({ navigation }) => {

  const [loading, setLoading] = useState(true);
  const [maps, setMaps] = useState([]);

  // set navigation style/options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Play",
      headerBackTitle: "Hyper",
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={() => generateDB()}>
            <SimpleLineIcons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sum_alert = (obj) => {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  }

  // load data
  useEffect(() => {
    const unsubscribe = db
      .collection('_maps')
      .orderBy('alerts.critical', 'desc')
      .orderBy('alerts.major', 'desc')
      .orderBy('alerts.warning', 'desc')
      .orderBy('alerts.minor', 'desc')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        setMaps(data);
      });
    setLoading(false);
    return unsubscribe
  }, []);


  if (loading) {
    return <ActivityIndicator />;
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Count Maps {maps.length}</Text>
      {maps.map(m =>
        <Card key={m.id}>
          <Card.Title>{m.MAPS_NAME}</Card.Title>
          <Card.Divider />
          <View style={styles.mapView}>
            <Text>Objects: {sum_alert(m.alerts)}</Text>
            <Text>Critical: {m.alerts.critical}</Text>
            <Text>Major: {m.alerts.major}</Text>
          </View>
          <View style={styles.mapView}>
            <Text>Warning: {m.alerts.warning}</Text>
            <Text>Minor: {m.alerts.minor}</Text>
            <Text>Clear: {m.alerts.clear}</Text>
          </View>

        </Card>
      )}
    </ScrollView>
  );
};

export default PlayWithFireBase;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
  headerRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 40,
    marginRight: 5,
  },
  mapView: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});
