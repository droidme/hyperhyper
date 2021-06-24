import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Image, Button, Input, Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase.js";
import firebase from "firebase";
import { Alert } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log('authUser:' + authUser?.email);
      if (authUser) {

        const userRef = db.collection("users")
          .doc(authUser.uid);

        userRef.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            userRef.set({
              uid: authUser.uid,
              maps: []
            })
          }
          userRef.update({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
          });
        });

        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);


  const signInGoogle = async () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light"></StatusBar>
      <Image
        source={require("../assets/hyper.png")}
        style={{ width: 150, height: 150, marginBottom: 50 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.btn} title="Login" onPress={signIn} />
      <Button containerStyle={styles.btn} title=" Login"
        icon={
          <Icon name="google" type="antdesign" color="white" />
        }
        onPress={signInGoogle} />
      <Button
        containerStyle={styles.btn}
        type="outline"
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <View style={{ height: 120 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  btn: {
    width: 200,
    marginTop: 10
  },
});
