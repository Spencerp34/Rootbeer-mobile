import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Theme } from './src/constants';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textInputStyle} >Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.creme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    color: Theme.rbBrown,
  },
});
