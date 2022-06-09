import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import HomeScreen from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}) {
  setTimeout(async () => {
    const value = await AsyncStorage.getItem('user-token');
    if (value !== null) {
      navigation.replace('Home');
    } else {
      navigation.replace('Second');
      //navigation.replace('Login', { name: 'Login' })
    }
  }, 1000);
  return (
    <View style={styles.container}>
      <ImageBackground resizeMode="cover" style={styles.image}>
        <Image style={styles.splash} source={require('../src/ELogo.png')} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  splash: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
