import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import * as ImagePicker from "expo-image-picker";
import FormData from 'form-data';
import { useState } from 'react';
import { Theme } from "../constants";
import axios from 'axios';
import ImageIcon from "../../assets/imageIcon.png";
import CameraIcon from "../../assets/cameraIcon.png";
import schema from './validation';

export default function Submission() {
    const initialFormData = {
        brand_name: null,
        author_review: 2,
        shop_url: null,
        review_description: null,
        review_img: null,
    };
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState({...initialFormData, author_review: null})

    const handleUploadImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality:0,
        })
        if(!result.canceled){
            setFormData({...formData, review_img: result.assets[0]})
        }
    }

    const handleTakeImg = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality:0,
        })
        if(!result.canceled){
            setFormData({...formData, review_img: result.assets})
        }
    }

    const submit = async() =>{
        await schema.validate(formData, {abortEarly: false})
            .then((res)=> {
                const submissionData = new FormData();
                submissionData.append("brand_name", formData.brand_name)
                submissionData.append("author_review", formData.author_review)
                submissionData.append("shop_url", formData.shop_url)
                submissionData.append("review_description", formData.review_description)
                if(formData.review_img){
                    submissionData.append("review_img", {
                        name: formData.review_img.fileName || "test",
                        uri: formData.review_img.uri,
                        type: "image/jpg",
                    })
                }
        
                axios.post(`https://rootbeerbe-production.up.railway.app/reviews`, submissionData, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then((response) => {
                        setFormData(initialFormData)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                err.inner.forEach((e) => {
                    formErrors[e.path] = e.message;
                })
            })
    }

    return (
        <View style={styles.form} >
            <View>
                <Text style={{color: Theme.rbBrown}} >New Submission</Text>
                <TextInput value={formData.brand_name} onChangeText={(change) => {setFormData({...formData, brand_name: change}); setFormErrors({...formErrors, brand_name: null})}} placeholder='Brand Name' placeholderTextColor={"#aaa"} style={styles.textInput} />
                <Text style={styles.error}>{formErrors.brand_name}</Text>
                <Text style={{textAlign: "center", color: Theme.rbBrown, fontWeight: "bold"}} >{formData.author_review}</Text>
                <Slider maximumValue={5} minimumValue={1} value={formData.author_review} step={0.5} onValueChange={(change)=> setFormData({...formData, author_review: change[0]})} />
                <TextInput value={formData.shop_url} onChangeText={(change) => setFormData({...formData, shop_url: change})} placeholder='Shop URL' placeholderTextColor={"#aaa"} style={styles.textInput} />
                <Text style={styles.error}>{formErrors.shop_url}</Text>
                <TextInput value={formData.review_description} onChangeText={(change) => setFormData({...formData, review_description: change})} placeholder='Review' placeholderTextColor={"#aaa"} style={[styles.textInput, styles.bigTextInput]} multiline numberOfLines={5} />
                <Text style={styles.error}>{formErrors.review_description}</Text>
                <Text style={{textAlign: "center", color: Theme.rbBrown, fontWeight: "bold"}} >Optional: Attach Image</Text>
                <View style={{flexDirection: "row", justifyContent: "space-evenly"}} >
                    <View style={{width:200, height:200, margin: 10}} >
                        {formData.review_img && <Image source={{uri: formData.review_img.uri}} style={{width:200, height:200}} /> }
                    </View>
                    <View style={{justifyContent: "space-evenly"}} >
                        <Pressable onPress={handleUploadImg}>
                            <Image source={ImageIcon} style={{width:50, height: 50}} />
                        </Pressable>
                        <Pressable onPress={handleTakeImg}>
                            <Image source={CameraIcon} style={{width:50, height: 50}} />
                        </Pressable>
                    </View>
                </View>
            </View>
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
    },
    error:{
        color: "red",
        justifyContent: "center",
        marginLeft: 15,
    }
})