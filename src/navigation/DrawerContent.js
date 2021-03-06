    import React, {useState} from 'react';
    import {StyleSheet, View, Text} from 'react-native';
    import {DrawerContentScrollView} from '@react-navigation/drawer';
    import {Drawer, Switch, TouchableRipple} from 'react-native-paper';
    import Navigation from './Navigation';
    import usePreference from '../hooks/usePreferences';

    export default function DrawerContent(props) {
    const {navigation} = props;
    const [active, setActive] = useState('home');
    //console.log(props);

    const {theme, toggleTheme} = usePreference();
    const onChangeScreen = screen => {
        setActive(screen);
        navigation.navigate(screen);
    };

    return (
        <DrawerContentScrollView>
        <Drawer.Section>
            <Drawer.Item
            label="Inicio"
            icon="home"
            active={active === 'home'}
            onPress={() => onChangeScreen('home')}
            />
            <Drawer.Item
            label="Peliculas Populares"
            icon="movie"
            active={active === 'popular'}
            onPress={() => onChangeScreen('popular')}
            />
            
            <Drawer.Item
            label="Peliculas Mas Valoradas"
            icon="youtube" 
            active={active === 'news'}
            onPress={() => onChangeScreen('news')}
            />
        </Drawer.Section>

        <Drawer.Section title="Opciones">
            <TouchableRipple>
            <View style={StyleSheet.preferences}>
                <Text>Tema Oscuro</Text>
                <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
            </View>
            </TouchableRipple>
        </Drawer.Section>
        </DrawerContentScrollView>
    );
    }

    const styles = StyleSheet.create({
    preferences: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    });