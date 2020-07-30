// Son librerias del ract native para crear las aplicaciones
import React, {useState,useEffect} from 'react';
// Importamos las etiquetas como los estilos, las vistas, el scroll y los textos 
import {View,StyleSheet,Image} from 'react-native';
//Importamos los metodos de la clase movies.js
import {getMovieByIdApi} from '../api/movies'
// Imprtamos una variable de la constante 
import { BASE_PATH_IMG } from '../utils/constants';
//
import { ScrollView } from 'react-native-gesture-handler';
//Importamos este modal para que nos reporduzca el link de un video
import ModalVideo from '../components/ModalVideo';
//Importamos botones, titulos y textos 
import { IconButton,Title, Text } from 'react-native-paper';
//Se usa para simplificar el manejo y edición de objetos, arrays, etc. 
import {map} from 'lodash';
// Es la expotacion por defecto de la clase Movie
    export default function Movie(props) {
        //console.log(props);
        //retorna las propiedades hacia el router 
        const {route} = props;
        //Los parametros de ruta los guarda en id
        const {id} = route.params;
        //Donde estan relacionado los datos de la pelicula 
        const [movie, setMovie]= useState(null);
        //Declaramos una constante para que nos traiga el video 
        const [showVideo, setShowVideo] = useState(true)
        useEffect(()=> {
            getMovieByIdApi(id).then((response)=>{
                //console.log(response);
                setMovie(response);
            })
        },[])
        // si no existe la pelicula retorna valores nulos 
        if(!movie)
        return null;
        // Retorna la etiquetas 
    return (
        <> 
        {/* Aqui estamos poniendo false para que no aparezca el scrollVertical  */}
        <ScrollView showsVerticalScrollIndicator={false}>
            
            <MovieImage posterPath={movie.poster_path}/>
            <MovieTrailer setShowVideo={setShowVideo}/>
            <MovieTitle movie={movie} />
            <ModalVideo 
        show={showVideo} 
        setShow={setShowVideo}
        idMovie={id}
        />
        </ScrollView>
        
        </>
    );
    }
    // Nos muestra la imagen de la pelicula 
    function MovieImage(props) {
        const{posterPath} = props;
    
        return (
            <View style={styles.viewPoster}>
                <Image 
                style={styles.poster}
                source={{uri: `${BASE_PATH_IMG}/w500${posterPath}`}}
            />
            </View>
        );
    }
    // Nos muestra el video de la pelicula 
    function MovieTrailer(props){
        const { setShowVideo } =props;
        return (
            
            <View style ={styles.viewPlay}>
                <IconButton
                    icon="play"
                    color="#000"
                    size={30}
                    onPress={() => setShowVideo(true)}
                    style={styles.play}
                />
            </View>
        )
    }
    // Nos muestra el titulo de la pelicula 
    function MovieTitle(props) { const { movie } = props;
    return (
    <View style={styles.viewInfo}>
    <Title>{movie.title}</Title>
    <View style={styles.viewGenres}>
    {map(movie.genres, (genre) => (
    <Text key={genre.id} style={styles.genre}>
    {genre.name}
    </Text>
    ))}
    </View>
    </View>
    );
    }               
    const styles = StyleSheet.create({
        viewPoster: {
            shadowColor: "#000",
            shadowOffset: {
                width:0,
                height:10
            },
            shadowOpacity:1,
            textShadowRadius:10,
        },

        poster:{
            width: "100%",
            height:500,
            borderBottomRightRadius:30,
            borderBottomLeftRadius:30,
        },
        viewPlay:{
            
            justifyContent: "flex-end",
            alignItems:"flex-end",
        },
        play:{
            backgroundColor:"#fff",
            marginTop:0,
            marginRight:30,
            width:60,
            height:60,
            borderRadius:100,
    
        },
            viewInfo: {
                marginHorizontal: 30,
                },
                viewGenres: {
                flexDirection: 'row',
                }, genre: {
                marginRight: 20,
                color: '#8697a5',
                },
    })
