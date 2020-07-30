// son librerias del ract native para crear las aplicaciones 
import React, {useState,useMemo} from 'react';
// Es una libreria extendida del react native que sirve para poner temas
import { Provider as PapperProvider, 
  DarkTheme as DarkThemePaper, 
  DefaultTheme as DefaultThemePaper  } from 'react-native-paper';
// Son los temas para el navigation, sirven para navegar por cada ventana
import { NavigationContainer, 
  DarkTheme as DarkThemeNavigation, 
  DefaultTheme as DefaultThemeNavigation } from "@react-navigation/native";
// Aqui importamos la clase Navigation.js 
import Navigation from './src/navigation/Navigation';
// Aqui llamamos a los elementos
import { StatusBar, YellowBox } from 'react-native';
// Aqui llamamos a la clase PreferencesContext.js
import PreferencesContext from './src/Context/PreferencesContext';

// Esto sirve para mostrar notificaciones 
YellowBox.ignoreWarnings(['Calling `getNode()`'])
//aqui es donde comienza a exportar la aplicacion principal 
export default function App() { 
  //console.log("hola como estas"); 
// Aqui creamos una constante de los temas y que por defecto este el tema blanco 
  const [theme,setTheme] = useState('light')
  // Aqui son los colores de cada elemento del tema blanco 
  DefaultThemeNavigation.colors.background='#fff';
  DefaultThemeNavigation.colors.card='#c62828'; 
  DefaultThemeNavigation.colors.text='#fff'; 
  DefaultThemeNavigation.colors.notification='#fff'; 
  DefaultThemePaper.colors.accent="#fff";
  DefaultThemePaper.colors.text="#000";
  DefaultThemePaper.colors.disabled="#fff";
  DefaultThemePaper.colors.primary="#fff";

// Aqui son los colores de cada elemento del tema oscuro 
  DarkThemePaper.colors.primary="#1ae1f2";
  DarkThemePaper.colors.accent="#1ae1f2";
  DarkThemeNavigation.colors.background='#6d6d6d';
  DarkThemeNavigation.colors.card='#1b1b1b';
// Aqui definimos el tema con el toggleTheme
  const toggleTheme = () =>{
// Aqui ponemos la condicion del Swicth
    setTheme(theme === 'dark'? 'light' : 'dark');
  }
// Aqui usamos el useMemo para una optimización del rendimiento 
  const preference = useMemo(
    () => ({
  toggleTheme,
  theme,
  
    }),
    [theme],
  );
// Retornamos todas las etiquetas renderizadas
  return (
    // Es para poner temas
    <PreferencesContext.Provider value={preference}>
    {/* Es un provedor de los temas del paper */}
    <PapperProvider theme = {theme === 'dark' ? DarkThemePaper : DefaultThemePaper}>
     {/* Ponemos los colores dependiendo del tema */} 
      <StatusBar 
      translucent
      backgroundColor={theme === 'dark' ? '#000' : '#c62828'}
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}/>
      {/* Ponemos el tema y llamando al navigation container */}
      <NavigationContainer 
      theme={theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation}>

        
        <Navigation/>
      </NavigationContainer>
    </PapperProvider>    
    </PreferencesContext.Provider>
  );
}