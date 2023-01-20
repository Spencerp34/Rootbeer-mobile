import { StyleSheet, Text, View, Platform, StatusBar, TextInput, SliderComponent } from 'react-native';

export default function Submission() {
    return (
        <View style={styles.form} >
            <TextInput></TextInput>
            <SliderComponent maximumValue={5} minimumValue={1} step={0.5} />
          <Text style={styles.text} >Root Beer Ratings</Text>
        </View>
    );        
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
    }
})