import { StyleSheet, Text, TextInput, View, ScrollView, RefreshControl, Image, Pressable, Modal } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Logo from "../../assets/logo.png";
import Edit from "../../assets/editIcon.png"
import HalfStar from "../../assets/HalfStar.png";
import xButton from "../../assets/xButton.png";
import {Slider} from '@miblanchard/react-native-slider';
import { Theme } from "../constants";

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
    }
    const [editData, setEditData] = useState(defaultData);

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
                return {uri: `https://rootbeerbe-production.up.railway.app/${review.review_img}`};
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
                        <View style={{justifyContent: "flex-end", alignItems: "flex-end", width: "100%"}}>
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
                            <TextInput value={editData.shop_url==="null"||null ? "" : editData.shop_url} onChangeText={(change) => {setEditData({...editData, shop_url: change}); setEditErrors({...editErrors, shop_url: null})}} placeholder='Shop URL' placeholderTextColor={"#aaa"} style={styles.textInput} />
                            <Text >Review Description</Text>
                            <TextInput value={editData.review_description} onChangeText={(change) => {setEditData({...editData, review_description: change}); setEditErrors({...editErrors, review_description: null})}} placeholder='Review' placeholderTextColor={"#aaa"} style={[styles.textInput, styles.bigTextInput]} multiline numberOfLines={5} />
                            <Text style={{height: 150}} >Picture:</Text>
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