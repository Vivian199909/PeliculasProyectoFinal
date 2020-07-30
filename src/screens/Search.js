import React, {useState, useEffect} from 'react';
import {Title, TextInput,Button} from "react-native-paper";
import {StyleSheet,View,ScrollView, Text} from 'react-native';
import CarouselVertical from '../components/CarouselVertical';
import { getAllGenereApi, getVideoSearch} from '../api/movies';
import {map} from 'lodash';
import CarouselMulti from '../components/CarouselMulti';
// Es la expotacion por defecto de la clase Search 
    export default function Search(props) {

        const {navigation} = props;
        // El searchList es donde va a estar la lista de peliculas encontradas 
        const [searchList,setSearchList] = useState([]);
        // El inputSearch es  la variable donde va a tener el texto que se queire buscar
        const [inputSearch,setInputSearch] = useState("");
        useEffect(() => {
            getVideoSearch(inputSearch).then((response)=>{
                setSearchList(response);
                console.log(response);
            });
        },[]);
        // Es la accion para el boton buscar 
        const buscar = ()=>{
            getVideoSearch(inputSearch).then((response)=>{
                setSearchList(response.results);
                console.log(response);
            });
        }
        //Retornamos todas las etiquetas renderizadas
    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
        {searchList && (
            <View style={styles.news}>
                <Title style= {styles.newsTitle}>Peliculas </Title>
                <CarouselVertical
                
                    data={searchList}
                    navigation={navigation}

                />
                {/* Aqui es donde colocamos el texto y se guarda en la variable inputSearch */}
                <TextInput label={"buscar"} value={inputSearch} onChange={(e)=>setInputSearch(e.nativeEvent.text)}/>
                <Button style={styles.buttonSearch} onPress={buscar}>Buscar</Button>
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
            buttonSearch:{
                backgroundColor: '#000',
                color:'#fff',
            }

        }
    );

