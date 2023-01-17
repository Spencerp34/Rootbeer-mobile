import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../constants';

export default function Header() {
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
    },
    text: {
        color: Theme.rbBrown,
        fontWeight: "700"
    }
});