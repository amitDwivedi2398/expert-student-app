//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from './header/CustomHeader';
// create a component
const Contact = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <CustomHeader title="CONTACT US" navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: scale(300), height: moderateScale(200)}}
          source={require('../src/contact.png')}
        />
      </View>
      <View style={{flex: 1}}>
        <View>
          <View style={styles.inputView}>
            <Icon name="user" size={20} color="black" />
            <TextInput
              style={styles.aaa}
              placeholder="Name"
              placeholderTextColor="#003f5c"
              color="black"
            />
          </View>
          <View style={styles.inputView}>
            <Icon name="user" size={20} color="black" />
            <TextInput
              style={styles.aaa}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              color="black"
            />
          </View>
          <View style={styles.inputView}>
            <Icon name="phone" color="black" size={20} />
            <TextInput
              style={styles.aaa}
              placeholder="Phone no."
              placeholderTextColor="#003f5c"
              keyboardType="number"
              color="black"
            />
          </View>
          <View style={styles.inputView}>
            <Icon name="user" size={20} color="black" />
            <TextInput
              style={styles.aaa}
              placeholder="Description"
              placeholderTextColor="#003f5c"
              color="black"
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          height: 80,
          justifyContent: 'center',
          alignSelf: 'center',
          width: '90%',
        }}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputView: {
    width: '90%',
    height: 55,
    backgroundColor: '#f1f3f6',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: verticalScale(10),
    alignSelf: 'center',
  },
  aaa: {
    flex: 1,
    paddingHorizontal: 12,
  },
  btn: {
    width: '90%',
    height: 50,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 10,
    elevation: 10,
    alignSelf: 'center',
  },
  submit: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});

//make this component available to the app
export default Contact;
