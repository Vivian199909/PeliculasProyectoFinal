import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton} from 'react-native-paper';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';
import Menu from '../screens/Menu';
//import Navigation from './Navigation';
const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const {navigation} = props;

  //Creamos nuestro botón para el buscador
  const buttonRight = () => {
    return (
      <IconButton
        icon="magnify"
        color="#fff"
        onPress={() => navigation.navigate('search')}
      />
    );
  };

  //Creamos el boton izquierdo para nuestro menú
  const buttonLeft = screen => {
    //Crear una condicio para desaparecer mi boton
    switch (screen) {
      case 'search':
      case 'movie':
        return (
          <IconButton
            icon="arrow-left"
            color="#fff"
            onPress={() => navigation.goBack()} 
          />
        );
      default:
        return (
          <IconButton icon="menu" color="#fff" onPress={() => navigation.openDrawer()} />
        );
        //break;
    }
  };
  return (
    <Stack.Navigator color="#fff">
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'TheMovieApp',
          headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: '',
          headerTransparent:true,
          headerLeft: () => buttonLeft("movie"),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="MenuAlt"
        component={Menu}
        options={{
          title: '',
          headerTransparent:true,
          headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{
          title: 'News',
          headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name="popular"
        component={Popular}
        option={{
          title: 'Popular',
          headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        option={{
          title: '',
          headerLeft: () => buttonLeft('search'),
        }}
      />
    </Stack.Navigator>
  );
}
