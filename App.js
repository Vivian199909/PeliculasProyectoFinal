import React, {useState,useMemo} from 'react';
import { Provider as PapperProvider, 
  DarkTheme as DarkThemePaper, 
  DefaultTheme as DefaultThemePaper  } from 'react-native-paper';
import { NavigationContainer, 
  DarkTheme as DarkThemeNavigation, 
  DefaultTheme as DefaultThemeNavigation } from "@react-navigation/native";
import Navigation from './src/navigation/Navigation';
import { StatusBar, YellowBox } from 'react-native';
import PreferencesContext from './src/Context/PreferencesContext';
YellowBox.ignoreWarnings(['Calling `getNode()`'])

export default function App() { 
  //console.log("hola como estas");
  const [theme,setTheme] = useState('dark')
  DefaultThemeNavigation.colors.background='#fff';
  DefaultThemeNavigation.colors.card='#c62828'; 
  DefaultThemeNavigation.colors.text='#fff'; 
  DefaultThemeNavigation.colors.notification='#fff'; 
  DefaultThemePaper.colors.accent="#fff";
  DefaultThemePaper.colors.text="#000";
  DefaultThemePaper.colors.disabled="#fff";
  DefaultThemePaper.colors.primary="#fff";


  DarkThemePaper.colors.primary="#1ae1f2";
  DarkThemePaper.colors.accent="#1ae1f2";
  DarkThemeNavigation.colors.background='#6d6d6d';
  DarkThemeNavigation.colors.card='#1b1b1b';
  
  const toggleTheme = () =>{
    setTheme(theme === 'dark'? 'light' : 'dark');
  }
  const preference = useMemo(
    () => ({
  toggleTheme,
  theme,
  
    }),
    [theme],
  );
  return (
    <PreferencesContext.Provider value={preference}>
    <PapperProvider theme = {theme === 'dark' ? DarkThemePaper : DefaultThemePaper}>
      <StatusBar 
      translucent
      backgroundColor={theme === 'dark' ? '#000' : '#c62828'}
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}/>
      <NavigationContainer 
      theme={theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation}>

        
        <Navigation/>
      </NavigationContainer>
    </PapperProvider>    
    </PreferencesContext.Provider>
  );
}