import { StyleSheet, Text, View, ScrollView, Image, Pressable, TextInput } from 'react-native';
import Logo from "../../assets/logo.png"
import HalfStar from "../../assets/HalfStar.png"

export default function Home(){
    const author_score = 3.5

    const results = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o"]

    const Card =(props)=>{
        const {letter} = props;

        const ratingRender = (rating) => {
            let stars = []
            if(rating%1 === 0.5){
                stars.push( <Image source={HalfStar} alt="half star rating" style={styles.halfStar} />)
            }
            for(let i = 1; i <= rating; i++){
                stars.unshift(<Image source={Logo} alt="star rating" style={styles.star} />)
            }
            return stars
        }

        return(
            <View style={styles.card} >
                <Text>{letter}</Text>
                <Image source={Logo} style={{width: 60, height: 60}} />
                <View style={{flexDirection: "row"}} >
                    {ratingRender(author_score)}
                </View>
            </View>
        )
    }

    return(
        <ScrollView contentContainerStyle={styles.content} >
            <View style={styles.content} >
                {results.map((letter, index) => {
                    return <Card letter={letter} />
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