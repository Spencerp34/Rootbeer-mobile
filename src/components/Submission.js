import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { Theme } from "../constants"

export default function Submission() {
    const [formData, setFormData] = useState({
        brand_name: "",
        author_score: 1,
        image_url: null,
        shop_url: null,
        review_description: "",
    })

    const loggin = () =>{
        console.log(formData)
    }

    return (
        <View style={styles.form} >
            <Text style={{color: Theme.rbBrown}} >New Submission</Text>
            <TextInput onChangeText={(change) => setFormData({...formData, brand_name: change})} placeholder='Brand Name' placeholderTextColor={"#aaa"} style={styles.textInput} />
            <TextInput onChangeText={(change) => setFormData({...formData, author_score: change})} placeholder='Score' placeholderTextColor={"#aaa"} style={styles.textInput} />
            <TextInput onChangeText={(change) => setFormData({...formData, image_url: change})} placeholder='Image URL' placeholderTextColor={"#aaa"} style={styles.textInput} />
            <TextInput onChangeText={(change) => setFormData({...formData, shop_url: change})} placeholder='URL' placeholderTextColor={"#aaa"} style={styles.textInput} />
            <TextInput onChangeText={(change) => setFormData({...formData, review_description: change})} placeholder='Review' placeholderTextColor={"#aaa"} style={[styles.textInput, styles.bigTextInput]} multiline numberOfLines={5} />
            <Button title='Log' onPress={() => loggin()} color={Theme.rbBrown} />
        </View>
    );        
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        width: "80%",
    },
    textInput: {
        width: "100%",
        borderColor: Theme.rbBrown,
        borderWidth: 2,
        textAlign: "center",
        margin: 10,
    },
    bigTextInput: {
        height: 100,
    },
})