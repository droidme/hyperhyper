import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { SimpleLineIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase.js";
import HyperMapListItem from "../components/HyperMapListItem.js";

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
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Avatar rounded source={require("../assets/avatar.png")} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity disabled onPress={() => navigation.navigate("Play")}>
            <SimpleLineIcons name="settings" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddMap")}>
            <SimpleLineIcons name="plus" size={24} color="black" />
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
        console.log(data);
        setMaps(data);
      });
    setLoading(false);
    return unsubscribe
  }, []);

  // some functions

  const enterMap = (map) => {
    navigation.navigate("Map", map);
  }

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  if (loading) {
    return <ActivityIndicator />;
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {maps.map(m => <HyperMapListItem key={m.id} map={m} enterMap={() => enterMap(m)} />)}
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
    width: 80,
    marginRight: 20,
  },
});
