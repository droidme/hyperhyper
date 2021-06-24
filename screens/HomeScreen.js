import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase.js";
import { UserAvatar, MapListItem } from "../components";

const HomeScreen = ({ navigation }) => {

  const [loading, setLoading] = useState(true);
  const [maps, setMaps] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Hyper",
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerTintStyle: styles.headerTintStyle,
      headerLeft: () => (
        <View style={styles.headerLeftContainer}>
          <UserAvatar />
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <SimpleLineIcons name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  // load data
  useEffect(() => {
    const unsubscribe = db
      .collection('maps')
      .orderBy('ALERTS.CRITICAL', 'desc')
      .orderBy('ALERTS.MAJOR', 'desc')
      .orderBy('ALERTS.WARNING', 'desc')
      .orderBy('ALERTS.MINOR', 'desc')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaps(data);
        setLoading(false);
      });
    return unsubscribe
  }, []);

  // some functions

  const enterMap = (map) => {
    navigation.navigate("Map", map);
  }


  if (loading) {
    return <ActivityIndicator />;
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {maps.map(m => <MapListItem key={m.id} map={m} enterMap={() => enterMap(m)} />)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#fff",
  },
  headerTitleStyle: {
    color: "black",
  },
  headerTintStyle: {
    color: "black",
  },
  headerLeftContainer: {
    marginLeft: 20,
  },
  headerRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 30,
    marginRight: 20,
  },
  activityIndicator: {
    height: "100%"
  }
});
