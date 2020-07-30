import React, {useState, useEffect} from 'react';
import {Title} from "react-native-paper";
import {StyleSheet,View,ScrollView, Text} from 'react-native';
import CarouselVertical from '../components/CarouselVertical';
import { getVideoMoviePopular } from '../api/movies';
import {map} from 'lodash';
import CarouselMulti from '../components/CarouselMulti';

    export default function Popular(props) {

        const {navigation} = props;
        const [popularMovies, setPopularMovies] = useState(null);

        useEffect(() => {
            getVideoMoviePopular().then((response)=>{
                setPopularMovies(response.results);
                console.log(response.results);
            });
        },[]);
    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
        {popularMovies && (
            <View style={styles.news}>
                <Title style= {styles.newsTitle}>Peliculas Populares</Title>
                <CarouselVertical
                    data={popularMovies}
                    navigation={navigation}
                />
            </View>


        )}
        </ScrollView>

    );
    }

    const styles = StyleSheet.create (
        {
            news: {
                marginVertical: 10,
            },
            newsTitle:{
                marginBottom:15,
                marginHorizontal:20,
                fontWeight: "bold",
                fontSize:22,
            },
            genre:{
                marginTop:20,
                marginBottom: 16,
                padding:10,
            },
            genres: {
                marginTop:20,
                marginBottom: 16,
            },
            genreList:{
                marginTop:5,
                marginBottom:15,
                marginHorizontal:20,
                padding:10,
            },
            genresTitle:{
                marginHorizontal: 20,
                fontWeight: 'bold',
                fontSize: 22,
            },

        }
    );

