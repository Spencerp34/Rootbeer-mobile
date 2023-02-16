import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';

export default function Home(){

    const results = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"]

    const Card =(props)=>{
        const {letter} = props;
        return(
            <View style={styles.card} >

                <Text>{letter}</Text>
            </View>
        )
    }

    return(
        <View style={styles.content} >
            {results.map((letter, index) => {
                return <Card letter={letter} />
            })}
        </View>
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
    }
})