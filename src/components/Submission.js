import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Submission() {
    return (
        <View style={styles.form} >
            <Text>New Submission</Text>
            <TextInput placeholder='Brand Name' placeholderTextColor={"#aaa"} style={styles.textInput} />
            <TextInput placeholder='Score' placeholderTextColor={"#aaa"} style={styles.textInput} />
            <TextInput placeholder='image' placeholderTextColor={"#aaa"} style={styles.textInput} />
            <TextInput placeholder='URL' placeholderTextColor={"#aaa"} style={styles.textInput} />
            <TextInput placeholder='Review' placeholderTextColor={"#aaa"} style={styles.textInput} />
        </View>
    );        
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        width: "80%",
    },
    textInput: {
        width: 100,
        borderColor: "skyblue",
        borderWidth: 2,
        textAlign: "center"
    }    
})