import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { useFonts } from '@expo-google-fonts/lobster';
import { Theme } from '../constants';

export default function Header() {

    const [fontsLoaded, error] = useFonts({
        "Lobster-Regular": require('../../assets/fonts/Lobster-Regular.ttf'),
    });

    if(!fontsLoaded){
        return null;
    }

    return (
      <View style={styles.header} >
        <Text style={styles.text} >Root Beer Ratings</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    header: {
      flex: 0.1,
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    text: {
        color: Theme.rbBrown,
        fontFamily: 'Lobster-Regular',
        fontSize: 40,
    }
});