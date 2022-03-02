
import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, View, ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';

const ActivityIndicatorElement = () => {
    return (
        <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator color="#207344" size="large" />
        </View>
    );
};

const App = () => {
    const [visible, setVisible] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#DFF2E7' }}>
            <View style={styles.container}>
                <WebView
                    style={{ flex: 1 }}
                    source={{ uri: 'https://drive.google.com/drive/folders/1W8wD_e3knzbh0IdhkPRmEFZ0_cxV4vvR?usp=sharing' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onLoadStart={() => setVisible(true)}
                    onLoad={() => setVisible(false)}
                    injectedJavaScript={cssChanges}
                />
                {visible ? <ActivityIndicatorElement /> : null}
            </View>
        </SafeAreaView>
    );
};

const cssChanges = `
         document.getElementsByClassName('a-s-tb-sc-Ja a-s-tb-Kg a-N-l-Ba a-s-tb-sc-Ja-J')[0].style.backgroundColor = "#DFF2E7";
         document.getElementsByClassName('h-sb-Ic h-R-d a-vu-w-d a-c-d a-N-l-Ba-d-ga')[0].remove();
         document.getElementsByClassName('D-B')[0].style.borderBottom = "0px";
    `

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DFF2E7',
        marginTop: 20,
        flex: 1,

    },
    activityIndicatorStyle: {
        flex: 1,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
});

export default App;
