import { StyleSheet, Text, TextInput, View, ScrollView, RefreshControl, Image, Pressable, Modal } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import * as ImagePicker from "expo-image-picker";
import Logo from "../../assets/logo.png";
import Edit from "../../assets/editIcon.png";
import ImageIcon from "../../assets/imageIcon.png";
import CameraIcon from "../../assets/cameraIcon.png";
import HalfStar from "../../assets/HalfStar.png";
import xButton from "../../assets/xButton.png";
import {Slider} from '@miblanchard/react-native-slider';
import { Theme } from "../constants";
import schema from './validation';

export default function Home(){
    const [results, setResults] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalReview, setModalReview] = useState({});
    const defaultData = {
        brand_name: "",
        author_review: "",
        shop_url: "",
        review_description: "",
        review_img: "",
        review_id: "",
    }
    const [editData, setEditData] = useState(defaultData);
    const [formErrors, setFormErrors] = useState({...defaultData, author_review: null});

    useEffect(()=>{
        getAxios();
    }, []);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        getAxios()
            .then((res) => {
                setRefreshing(false);
            });
    });

    const getAxios = async() => {
        await axios.get(`https://rootbeerbe-production.up.railway.app/reviews`)
            .then((res) => {
                setResults(res.data);
                return res.data;
            });
            
    }
        
    const closeEditModal = ()=>{
        setEditModal(false);
        setModalReview({});
        setEditData(defaultData)
    }

    const handleUploadImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality:0,
        })
        if(!result.canceled){
            setEditData({...editData, review_img: result.assets[0]});
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
            setEditData({...editData, review_img: result.assets});
        }
    }

    const handleRemove = () =>{
        setEditData({...editData, review_img: null});
    }

    const submit = async() =>{
                const submissionData = new FormData();
                submissionData.append("review_id", editData.review_id)
                submissionData.append("brand_name", editData.brand_name)
                submissionData.append("author_review", editData.author_review)
                submissionData.append("shop_url", editData.shop_url)
                submissionData.append("review_description", editData.review_description)
                if(editData.review_img){
                    submissionData.append("review_img", {
                        name: editData.review_img.fileName || "test",
                        uri: editData.review_img.uri,
                        type: "image/jpg",
                    });
                };
        
                axios.put(`https://rootbeerbe-production.up.railway.app/reviews`, submissionData, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then((response) => {
                        setEditModal(false)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            
    }

    const Card =(props)=>{
        const {review} = props;
        const [isFlipped, setIsFlipped] = useState(false);

        const ratingRender = (rating) => {
            let stars = [];
            if(rating%1 === 0.5){
                stars.push( <Image source={HalfStar} alt="half star rating" style={styles.halfStar} key={`half star`}/>)
            };
            for(let i = 1; i <= rating; i++){
                stars.unshift(<Image source={Logo} alt="star rating" style={styles.star} key={`Star ${i}/5`} />)
            };
            return stars;
        };

        const openEditModal = (rev) =>{
            setModalReview(rev);
            setEditModal(true);
            setEditData(rev);
        }


        const fallBackPic = (uri) =>{
            if(uri){
                return {uri: `https://rootbeerbe-production.up.railway.app/${review.review_id}`};
            }else{
                return Logo;
            };
        };

        const edit = (id) => {
            return id;
        }

        return(
            <Pressable onPress={()=> { setIsFlipped(!isFlipped) }} >
                { isFlipped 
                ? 
                    <View style={styles.card}>
                        <View style={{flexDirection: "row"}} >
                            <Text style={styles.textColor} >{review.brand_name}</Text>
                            <Pressable onPress={()=> {openEditModal(review)}} >
                                <Image source={Edit} style={{width:30, height: 30, marginTop: -10}} />
                            </Pressable>
                        </View>
                        <Text style={styles.textColor}>{review.review_description} </Text>
                    </View>
                : 
                    <View style={styles.card} >
                        <Text style={styles.textColor}>{review.brand_name}</Text>
                        <Image source={ review.review_img ? {uri: `https://rootbeerbe-production.up.railway.app/${review.review_img}`} : Logo} style={{width: 60, height: 60}} />
                        <View style={{flexDirection: "row"}} >
                            {ratingRender(review.author_review)}
                        </View>
                    </View>

                }
            </Pressable>
        )
    }

    return(
        <View>
            <View style={{marginLeft: 55}} >
                <Text style={[styles.textColor, {fontWeight: "bold"}]} >Ratings</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            } >
                <Modal 
                    animationType='slide' 
                    transparent={true} visible={editModal} 
                    onRequestClose={() => setEditModal(false)}>
                    <View style={{
                        flex: 0.75,
                        justifyContent: "space-between",
                        alignItems: 'center',
                        marginTop: 100,
                        backgroundColor: "white",
                        padding: 30,
                    }} >
                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                            <Pressable onPress={() => {submit()}} >
                                <Text style={{...styles.textInput, height: "auto", padding: 5, color: Theme.rbBrown}} >Update</Text>
                            </Pressable>
                            <Pressable onPress={() => {closeEditModal()}} >
                                <Image source={xButton} style={{height: 30, width: 30}} />
                            </Pressable>
                        </View>
                        <View style={{flexDirection: "column", justifyContent: "space-evenly", width: "100%"}} >
                            <Text>Brand Name</Text>
                            <TextInput value={editData.brand_name} onChangeText={(change) => {setEditData({...editData, brand_name: change}); setFormErrors({...formErrors, brand_name: null})}} placeholder='Brand Name' placeholderTextColor={"#aaa"} style={styles.textInput} />
                            <Text> Rating: {editData.author_review} </Text>
                            <Slider maximumValue={5} minimumValue={1} value={editData.author_review} step={0.5} onValueChange={(change)=> setEditData({...editData, author_review: change[0]})} />
                            <Text>Shop URL</Text>
                            <TextInput value={editData.shop_url==="null"||null ? "" : editData.shop_url} onChangeText={(change) => {setEditData({...editData, shop_url: change}); setFormErrors({...formErrors, shop_url: null})}} placeholder='Shop URL' placeholderTextColor={"#aaa"} style={styles.textInput} />
                            <Text >Review Description</Text>
                            <TextInput value={editData.review_description} onChangeText={(change) => {setEditData({...editData, review_description: change}); setFormErrors({...formErrors, review_description: null})}} placeholder='Review' placeholderTextColor={"#aaa"} style={[styles.textInput, styles.bigTextInput]} multiline numberOfLines={5} />
                            <Text>Picture:</Text>
                            <View style={{flexDirection: "row", justifyContent: "space-evenly"}} >
                                <View style={{width:"80%", height:80, margin: 15}} >
                                    {editData.review_img &&
                                        <View style={{flexDirection: "row", justifyContent: "center", alignContent: "center"}} >
                                            <Image source={{uri: editData.review_img.uri}} style={{width:100, height:100}} />
                                            <Pressable onPress={handleRemove} style={{position: 'absolute', right:55, top:-10}} >
                                                <Image source={xButton} style={{width:25, height:25}} />
                                            </Pressable>
                                        </View>
                                    }
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
                    </View>
                </Modal>
                <View style={styles.content} >
                    {results.map((review, index) => {
                        return <Card review={review} key={review.review_id} />
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    content:{
        margin: 15,
        minHeight: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    card:{
        height: 150,
        width: 150,
        borderColor: Theme.rbBrown,
        borderWidth: "1px",
        borderRadius: "5%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    star:{
        width: 20,
        height: 20,
    },
    halfStar:{
        width: 10,
        height: 20,
    },
    textColor:{
        color: Theme.rbBrown,
    },
    textInput: {
        width: "95%",
        borderColor: Theme.rbBrown,
        borderWidth: 2,
        textAlign: "center",
        margin: 10,
        height: 40,
    },
    bigTextInput: {
        height: 100,
    },
})