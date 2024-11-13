import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Image } from 'react-native'
import Button from '../components/Button'
import { useRouter, useLocalSearchParams  } from 'expo-router'
import CardAccount from '../components/card'
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { useMovieStore } from '../stores/movieStore';


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function ShowPass() {

    const { id } = useLocalSearchParams();
    const { movies } = useMovieStore();
    const movie = movies.find((m) => m.id === parseInt(id));
    const router = useRouter();

    if (!movie) return <Text>Carregando...</Text>;

    const [showContent, setShowContent] = useState(false);


    const handlePress = () => {
        setShowContent(prevState => !prevState);

    };


    const [txtComent, setTxtComent] = useState('')
    const [txtRating, setTxtRating] = useState('')




    const handleCreateReviews = async () => {
        const review = {
            coment: txtComent,
            rating: txtRating

        }

        const response = await fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })

        if (response.ok) {
            const data = await response.json()
            Alert.alert('Avaliação Criada com Sucesso!')
            setTxtComent('')
            setTxtRating('')
            router.back()
        } else {
            const data = await response.json()
            Alert.alert('Erro ao Criar a avaliação')
            console.log(data?.error)
        }
        return
    }




    return (
        <View style={styles.container}>

            <View style={styles.container}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path || ""}` }}
                    style={styles.poster}
                />
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.releaseDate}>{movie.release_date || "Data não disponível"}</Text>
                <Text style={styles.synopsis}>{movie.sinopse || "Sinopse não disponível"}</Text>
            </View>

            <View style={{ flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between' }}>
                <Button onPress={handlePress} style={styles.Button} ><AntDesign name="star" size={24} color="black" /></Button>
                <Button style={styles.Button}><MaterialCommunityIcons name="movie-open-plus-outline" size={24} color="black" /></Button>
            </View>



            {showContent && (
                <View style={styles.avaliador}>
                    <TextInput style={styles.input} onChangeText={setTxtComent} value={txtComent} />

                    <Button style={styles.Button} onPress={handleCreateReviews} >Avaliar</Button>
                </View>

            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d5d5d5',

        flex: 1
    },

    Button: {
        display: 'flex'


    },

    card: {
        padding: 10,
        flexDirection: 'row',
        gap: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    logo: {
        width: 60,
        height: 60
    },
    content: {
        gap: 6
    },
    service: {
        fontSize: 17
    },
    username: {
        color: '#777777'
    },
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#444444',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginVertical: 5,
        borderRadius: 5,

    },
    avaliador: {
        paddingHorizontal: 20
    }
})