import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Image, Button, ButtonGroup, Input, Text, Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase.js";
import firebase from "firebase";
import { Alert } from "react-native";
import * as Google from 'expo-google-app-auth';
import * as Analytics from 'expo-firebase-analytics';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        try {
          Analytics.setUserId(authUser.uid);
          Analytics.logEvent('login', {
            platform_os: Platform.OS,
            platform_version: Platform.Version
          });
        } catch (error) {
          console.log(error.message);
        }

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

  const signIn = async (index) => {
    try {
      switch (index) {
        case 0:
          await auth.signInWithEmailAndPassword(email, password);
          break;
        case 1:

          const config = {
            expoClientId: "652220259634-ac0ktaoodg1k886vra2ucn8p62r29k3j.apps.googleusercontent.com",
            iosClientId: "652220259634-rfnkede9osrftut4k0ie6670fdil7ikq.apps.googleusercontent.com",
            iosStandaloneAppClientId: "652220259634-v039dc3can3s6242qs8uct3ph4ls1qb9.apps.googleusercontent.com",
            androidClientId: "652220259634-ac0ktaoodg1k886vra2ucn8p62r29k3j.apps.googleusercontent.com",
            androidStandaloneAppClientId: "652220259634-ac0ktaoodg1k886vra2ucn8p62r29k3j.apps.googleusercontent.com",
            scopes: ['profile', 'email']
          };

          const { type, idToken, accessToken } = await Google.logInAsync(config);
          if (type === "success") {
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            await firebase.auth().signInWithCredential(credential);
          }
          break;
        default:
          Alert.alert("undefind sign in methods!");
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }


  const buttons = [{
    element: () => <Text>Sign in</Text>
  }, {
    element: () => <Icon name="google" type="font-awesome" />
  }]

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
          onSubmitEditing={() => signIn(0)}
        />
      </View>
      <ButtonGroup
        buttons={buttons}
        onPress={signIn}
        containerStyle={styles.btn}
      />

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
