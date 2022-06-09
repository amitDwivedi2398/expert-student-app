import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-elements';
import React from 'react';

export default function AddNew({navigation}) {
  function CustomHeader({title, navigation}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          marginBottom: 5,
        }}>
        <ScrollView>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('AddBank')}>
              <Image
                style={{width: 35, height: 35, marginLeft: 20}}
                source={require('../src/back.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <Text
              style={{textAlign: 'center', fontWeight: '800', fontSize: 20}}>
              {title}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 0.1}}>
        <StatusBar barStyle="light-content" backgroundColor="white" />
        <CustomHeader title="" navigation={navigation} />
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 18,
            paddingHorizontal: 35,
            color: 'black',
          }}>
          Add New Bank Account
        </Text>
        <View>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#45A1F4'}
            placeholder="Enter Account No."
            keyboardType="text"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#45A1F4'}
            placeholder="IFSC Code"
            keyboardType="text"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#45A1F4'}
            placeholder="Account Holder's Name"
            keyboardType="text"
          />
        </View>
        <View>
          <View style={{paddingVertical: 20}}>
            <TouchableOpacity style={styles.btn}>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 18,
                  color: 'white',
                  alignSelf: 'center',
                }}>
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View style={{flex: 1}}>
        <View style={{}}>
          <Text style={{alignSelf: 'center', fontSize: 16, fontWeight: 'bold'}}>
            or
          </Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <View>
            <Image source={require('../src/upi.png')} />
          </View>
          <View></View>
        </View>
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    width: 300,
    height: 40,
    margin: 12,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#45A1F4',
    color: 'black',
    fontSize: 16,
  },
  btn: {
    width: 310,
    height: 50,
    backgroundColor: '#45A1F4',
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
});
