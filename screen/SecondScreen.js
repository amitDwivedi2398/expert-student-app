import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SecondScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1 }}>
        <Swiper style={styles.wrapper}>
          <View style={styles.slide1}>
            <Image
              style={{ width: 300, height: 300 }}
              source={require('../src/book.png')}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                margin: 8,
                alignSelf: 'center',
              }}>
              Welcome to Expert Education
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                alignSelf: 'center',
              }}>
              Your Go-to app for all your learning needs
            </Text>
          </View>
          <View style={styles.slide2}>
            <Image
              style={{ width: 300, height: 300 }}
              source={require('../src/knowleg.png')}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              Structured content and learn from experts
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              Access study material from Experts to help you succeed
            </Text>
          </View>
          <View style={styles.slide3}>
            <Image
              style={{ width: 300, height: 300 }}
              source={require('../src/teacher.png')}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                margin: 8,
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              Learn And Earn Platform
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              Join with a membership and enjoy rewards with affiliate
            </Text>
          </View>
        </Swiper>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.logbtn}
          onPress={() => navigation.replace('Register', { name: 'Register' })}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logbtn}
          onPress={() => 
              navigation.replace('Login', { name: 'Login' })}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const Login = ({ navigation, route }) => {
  return;
};
const Register = ({ navigation, route }) => {
  return;
};
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  logbtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#6D214F',
    backgroundColor: 'black',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
});
