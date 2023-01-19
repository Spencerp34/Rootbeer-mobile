import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';

export default function Submission() {
    return (
        <View style={styles.header} >
          <Text style={styles.text} >Root Beer Ratings</Text>
        </View>
    );        
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
    }
})