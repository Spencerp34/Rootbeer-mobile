import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Theme } from './src/constants';
import Header from './src/components/header';
import Submission from './src/components/Submission';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Submission />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.creme,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
