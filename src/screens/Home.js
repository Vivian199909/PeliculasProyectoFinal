// Son librerias del ract native para crear las aplicaciones 
import React, {useState, useEffect} from 'react';
// Es una etiqueta donde se crea los titulos
import {Title} from "react-native-paper";
// importamos las etiquetas como los estilos, las vistas, el scroll y los textos 
import {StyleSheet,View,ScrollView, Text} from 'react-native';
// Se importa el carusel la parte que da forma a la lista de peliculas
import CarouselVertical from '../components/CarouselVertical';
//Importamos los metodos de la clase movies.js 
import { getNewsMovieAPi, getAllGenereApi,getGenreMoviesApi } from '../api/movies';
// Se usa para simplificar el manejo y edición de objetos, arrays, etc. 
import {map} from 'lodash';
// Aqui nos trae el carusel por medio de los generos.
import CarouselMulti from '../components/CarouselMulti';
// Es la expotacion por defecto de la clase home 
// los props reciben como parametro las propiedades 
    export default function Home(props) {
        // Declaramos una constante del navigation y guarda sus propiedades
        const {navigation} = props;
        // Declaramos la constante newmovies donde se van almacenar las peliculas nuevas
        const [newMovies, setNewMovies] = useState(null);
        // Declaramos la constante genreList donde se van almacenar la lista de generos
        const [genreList,setGenreList] = useState([]);
        // Declaramos una constante del genero seleccionado 
        // La id 28 es un genero por defecto
        const [genreSelected, setGenreSelected] = useState(28)
        // Declaramos una constante para que nos traiga el genero de las peliculas 
        const [genreMovies, setGenreMovies] = useState(null);
        // console.log(genreMovies);
        // Hace que todo lo que este adentro se ejecute automaticamente
        useEffect(() => {
            // hace un llamado a la funcion y nos manda la respusta a la variable response
            getNewsMovieAPi().then((response)=>{
                // guarda en la variable movies que haya en la varible result 
                setNewMovies(response.results);
            });
        },[]);
        
        
            useEffect(() => { 
                getAllGenereApi().then((response)=>{
                    setGenreList(response.genres);
                    //console.log(response);
                });
            },[]);
            //Creamos un useEffect para obtener las peliculas dependiendo el genero
            useEffect(() => {
                getGenreMoviesApi(genreSelected).then((response)=>{
                    setGenreMovies(response.results);
                    //console.log(response);
                });
        },[genreSelected]);
        const onChangeGenre = (newGenreId) =>{
            setGenreSelected(newGenreId);
        };
        // Retornamos todas las etiquetas renderizadas
    return (
        // Aqui estamos poniendo false para que no aparezca el scrollhorizontal
        <ScrollView showsHorizontalScrollIndicator={false}>
            {newMovies && (
                <View style={styles.news}>
                    <Title style= {styles.newsTitle}>Nuevas Peliculas</Title>
                    <CarouselVertical
                        data={newMovies}
                        navigation={navigation}
                    />
                </View>
            )}
            {/* Es la vista de los generos  */}

        <View style={styles.genres}>
            <Title style={styles.genresTitle}>Películas por Género</Title>
                <ScrollView horizontal showsVerticalScrollIndicator ={false} style={styles.genreList}>
                {map(genreList, (genre) =>(
                    <Text key={genre.id} style={[styles.genre,
                    {color: genre.id !== genreSelected ? '#8697a5' : '#fff'},]}
                    onPress={() => onChangeGenre(genre.id)}>
                        {genre.name}   </Text>
                ))}
                </ScrollView>

                {genreMovies && (
                    <CarouselMulti data ={genreMovies} navigation = {navigation}/>
                )}
        </View>
        </ScrollView>
        
    );
    }
    // Aqui son los estilos 
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
                // Es el espacio 
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
