import React, {useState, useEffect} from 'react';
import {Title} from "react-native-paper";
import {StyleSheet,View,ScrollView, Text} from 'react-native';
import CarouselVertical from '../components/CarouselVertical';
import { getVideoMovieLast } from '../api/movies';
import {map} from 'lodash';
import CarouselMulti from '../components/CarouselMulti';

    export default function News(props) {

        const {navigation} = props;
        const [newsMovies, setNewsMovies] = useState(null);

        useEffect(() => {
            getVideoMovieLast().then((response)=>{
                setNewsMovies(response.results);
                console.log(response);
            });
        },[]);
    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
        {newsMovies && (
            <View style={styles.news}>
                <Title style= {styles.newsTitle}>Las mas Valoradas</Title>
                <CarouselVertical
                    data={newsMovies}
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

