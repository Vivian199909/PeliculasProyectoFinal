    import {API_HOST, API_KEY, LANG} from '../utils/constants';
    import {result} from 'lodash';
    import {Item} from 'react-native-paper';
    
    export function getNewsMovieAPi(page = 1) {
    const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;
    //console.log(url);

    return fetch(url)
        .then(response => {
        return response.json();
        })
        .then((result) => {
        return result;
        });
    }

    //Funcio para obtener los géneros de nuestra película
    export function getGenreMovieApi(idGenres) {
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;

    return fetch(url)
        .then(response => {
        return response.json();
        })
        .then((result) => {
        //return result;
        const arrayGenres = [];
        idGenres.forEach((id) => {
            //console.log(id);
            result.genres.forEach((item) => {
            if (item.id === id) arrayGenres.push(item.name);
            });
        });
        return arrayGenres;
        });
    }

    export function getAllGenereApi() {
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;

    return fetch(url)
        .then(response => {
        return response.json();
        })
        .then((result) => {
        return result;
        });
    }

    export function getGenreMoviesApi(idGenres) {
    const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenres}&language=${LANG}`;

    return fetch(url)
        .then(response => {
        return response.json();
        })
        .then((result) => {
        return result;
        });
    }
// Vamos a crear una funcion para obtener la pelicula mediante su
    export function getMovieByIdApi(idMovie){
        const url =`${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&language=${LANG}`;
        return fetch(url).then((response) => {
            return response.json();
        }).then((result) =>{
            return result;

        });
    }
    // Trae los videos mediante la url de solo las peliculas 
    export function getVideoMovieApi(idMovie){
        
        const url =`${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${LANG}`;
        
        return fetch(url).then((response) => {
            return response.json();
            //console.log(url);
        }).then((result) =>{
            
            return result;

        });
    }
    // Traemos las peliculas poplulares desde la API 
    export function getVideoMoviePopular(){
        
        const url =`${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}`;
        //console.log(url);
        return fetch(url).then((response) => {
            return response.json();
            //console.log(url);
        }).then((result) =>{
            //console.log(result);
            return result;
        });
    }

    export function getVideoMovieLast(){ 
        // La peliculas mas valoradas por el top_rated
        const url =`${API_HOST}/movie/top_rated?api_key=${API_KEY}&language=${LANG}`;
        console.log(url);
        return fetch(url).then((response) => {
            return response.json();
            //console.log(url);
        }).then((result) =>{
            console.log(result);
            return result;
        });
    }
    // Buscamos videos por uno o mas palabras claves 
    export function getVideoSearch(query){
        //Declaramos la constante donde nos buscara la url de la pelicula con el query
        const url =`${API_HOST}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${query}`;
        console.log(url);
        return fetch(url).then((response) => {
            return response.json();
            //console.log(url);
        }).then((result) =>{
            console.log(result);
            return result;
        });
    }
    