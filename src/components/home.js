import { StyleSheet, Text, View, ScrollView, RefreshControl, Image, Pressable } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Logo from "../../assets/logo.png";
import HalfStar from "../../assets/HalfStar.png";
import { Theme } from "../constants";

export default function Home(){
    const [results, setResults] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

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


    const Card =(props)=>{
        const {review} = props;
        const [isFlipped, setIsFlipped] = useState(false);
        const [editData, setEditData] = useState({
            brand_name: review.brand_name,
            author_review: review.author_review,
            shop_url: review.shop_url,
            review_description: review.review_description,
            review_img: review.review_img,
        });

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
                        <Text style={styles.textColor} >{review.brand_name}</Text>
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
})