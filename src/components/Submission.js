import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { Theme } from "../constants"
import axios from 'axios';

export default function Submission() {
    const initialFormData = {
        brand_name: null,
        author_review: 2,
        img_url: null,
        shop_url: null,
        review_description: null,
    }
    const [formData, setFormData] = useState(initialFormData)

    const submit = () =>{
        console.log(formData)
        axios.post(`https://rootbeerbe-production.up.railway.app/reviews`, formData)
            .then((response) => {
                setFormData(initialFormData)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <View style={styles.form} >
            <Text style={{color: Theme.rbBrown}} >New Submission</Text>
            <TextInput value={formData.brand_name} onChangeText={(change) => setFormData({...formData, brand_name: change})} placeholder='Brand Name' placeholderTextColor={"#aaa"} style={styles.textInput} />
            <Text style={{textAlign: "center", color: Theme.rbBrown, fontWeight: "bold"}} >{formData.author_review}</Text>
            <Slider maximumValue={5} minimumValue={1} value={formData.author_review} step={0.5} onValueChange={(change)=> setFormData({...formData, author_review: change[0]})} />
            <TextInput value={formData.img_url} onChangeText={(change) => setFormData({...formData, img_url: change})} placeholder='Image URL' placeholderTextColor={"#aaa"} style={styles.textInput} />
            <TextInput value={formData.shop_url} onChangeText={(change) => setFormData({...formData, shop_url: change})} placeholder='URL' placeholderTextColor={"#aaa"} style={styles.textInput} />
            <TextInput value={formData.review_description} onChangeText={(change) => setFormData({...formData, review_description: change})} placeholder='Review' placeholderTextColor={"#aaa"} style={[styles.textInput, styles.bigTextInput]} multiline numberOfLines={5} />
            <Pressable onPress={() => submit()} color={Theme.rbBrown} style={styles.button} >
                <Text style={styles.buttonText} >Submit Review</Text>
            </Pressable>
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
        height: 40,
    },
    bigTextInput: {
        height: 100,
    },
    button: {
        width: "100%",
        backgroundColor: Theme.rbBrown,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        margin: 10
    },
    buttonText: {
        color: Theme.creme,
        fontWeight: "500",
    }
})