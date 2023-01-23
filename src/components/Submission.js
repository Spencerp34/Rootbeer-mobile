import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';

export default function Submission() {
    const [formData, setFormData] = useState({
        brand_name: "",
        author_score: 1,
        image_url: null,
        shop_url: null,
        review_description: "",
    })

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