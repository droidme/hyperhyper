import React, { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { auth } from "../firebase.js";
import HyperMapListItem from "../components/HyperMapListItem.js";

const HomeScreen = ({ navigation }) => {

  const maps = [
    {
      "id": 1,
      "name": "CAMT",
      "description": "some informational text about camt",
      "coria-id": "xx-xx-xx",
      "objects": 10,
      "critical": 2,
      "warnings": 1
    },
    {
      "id": 2,
      "name": "ICS",
      "description": "some informational text about ics",
      "coria-id": "xx-xx-xx",
      "objects": 12,
      "critical": 1,
      "warnings": 0
    },
    {
      "id": 3,
      "name": "CEDRS",
      "description": "LUXCil Products run always without errors",
      "coria-id": "xx-xx-xx",
      "objects": 6,
      "critical": 0,
      "warnings": 0
    },
    {
      "id": 4,
      "name": "LOANIQ",
      "description": "Always in a good shape",
      "coria-id": "xx-xx-xx",
      "objects": 10,
      "critical": 0,
      "warnings": 0
    }
  ]

  //Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "HyperHyper",
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
          <TouchableOpacity onPress={() => navigation.navigate("Play")}>
            <SimpleLineIcons name="settings" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddMap")}>
            <SimpleLineIcons name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterMap = (map) => {
    navigation.navigate("Map", map);
  }

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
