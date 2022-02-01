import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const credentials = require('./credentials.json');
const driveId = credentials.DRIVE_ID;
const apiKey = credentials.API_KEY;
const clientId = credentials.CLIENT_ID;

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


 // Array of API discovery doc URLs for APIs used by the quickstart
 var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

 // Authorization scopes required by the API; multiple scopes can be
 // included, separated by spaces.
 var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

 /**
  *  Initializes the API client library and sets up sign-in state
  *  listeners.
  */
 function initClient() {
   gapi.client.init({
     apiKey: apiKey,
     clientId: clientId,
     discoveryDocs: DISCOVERY_DOCS,
     scope: SCOPES
   }).then(function () {
     // Listen for sign-in state changes.
     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

     // Handle the initial sign-in state.
     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
     authorizeButton.onclick = handleAuthClick;
     signoutButton.onclick = handleSignoutClick;
   }, function(error) {
     appendPre(JSON.stringify(error, null, 2));
   });
 }

 gapi.load('client:auth2', initClient);
 gapi.auth2.getAuthInstance().signIn();
 
 /**
  * Append a pre element to the body containing the given message
  * as its text node. Used to display the results of the API call.
  *
  * @param {string} message Text to be placed in pre element.
  */
 function appendPre(message) {
   var pre = document.getElementById('content');
   var textContent = document.createTextNode(message + '\n');
   pre.appendChild(textContent);
 }

 /**
  * Print files.
  */
 function listFiles() {
   gapi.client.drive.files.list({
     'pageSize': 10,
     'fields': "nextPageToken, files(id, name)"
   }).then(function(response) {
     appendPre('Files:');
     var files = response.result.files;
     if (files && files.length > 0) {
       for (var i = 0; i < files.length; i++) {
         var file = files[i];
         appendPre(file.name + ' (' + file.id + ')');
       }
     } else {
       appendPre('No files found.');
     }
   });
 }

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
