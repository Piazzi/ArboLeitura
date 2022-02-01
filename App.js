import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const driveId = "1W8wD_e3knzbh0IdhkPRmEFZ0_cxV4vvR";
const apiKey = "AIzaSyAMOp34R_D_PTAiwrBY_xwjOnMzImPAbdA";

const getFilesFromDrive = () => {
  return fetch('https://www.googleapis.com/drive/v3/drives/'+ driveId)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

console.log(getFilesFromDrive());

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
