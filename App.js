import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Theme } from './src/constants';
import Swiper from "react-native-swiper";
import Header from './src/components/header';
import Submission from './src/components/Submission';
import Home from "./src/components/home";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Swiper showsPagination={false} >
        <Home />
        <Submission />
      </Swiper>
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
