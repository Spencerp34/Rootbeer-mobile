import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from "../../assets/logo.png";
import HalfStar from "../../assets/HalfStar.png";

export default function Home(){
    const [results, setResults] = useState([]);

    useEffect(()=>{
        axios.get(`https://rootbeerbe-production.up.railway.app/reviews`)
            .then((res) => {
                setResults(res.data);
            });
    }, []);


    const Card =(props)=>{
        const {review} = props;

        const ratingRender = (rating) => {
            let stars = []
            if(rating%1 === 0.5){
                stars.push( <Image source={HalfStar} alt="half star rating" style={styles.halfStar} key={`half star`}/>)
            }
            for(let i = 1; i <= rating; i++){
                stars.unshift(<Image source={Logo} alt="star rating" style={styles.star} key={`Star ${i}/5`} />)
            }
            return stars
        }

        return(
            <View style={styles.card} >
                <Text>{review.brand_name}</Text>
                <Image source={ review.review_img ? {uri: `https://rootbeerbe-production.up.railway.app/${review.review_img}`} : Logo} style={{width: 60, height: 60}} />
                <View style={{flexDirection: "row"}} >
                    {ratingRender(review.author_review)}
                </View>
            </View>
        )
    }

    return(
        <ScrollView contentContainerStyle={styles.content} >
            <View style={styles.content} >
                {results.map((review, index) => {
                    return <Card review={review} key={review.review_id} />
                })}
            </View>
        </ScrollView>
    )
}

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
        borderColor: "black",
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
})