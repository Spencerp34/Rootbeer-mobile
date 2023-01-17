import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Theme } from './src/constants';
import Header from './src/components/header';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
