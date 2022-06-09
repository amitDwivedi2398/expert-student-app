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
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

export default function UpiIdScreen({navigation}) {
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
            <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
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
      <View style={{flex: 0.4}}>
        <StatusBar barStyle="light-content" backgroundColor="white" />
        <CustomHeader title="" navigation={navigation} />
      </View>
      <View style={{flex: 2}}>
        <Text style={styles.hediingbtn}>Enter UPI Id</Text>
        <View>
          <TextInput
            style={{
              width: 310,
              alignSelf: 'center',
              borderBottomWidth: 1,
              borderColor: '#349FFE',
              fontSize: 20,
              fontWeight: '800',
              paddingHorizontal: 10,
              color: 'black',
            }}
            placeholderTextColor="#D3DFEA"
            placeholder="Enter UPI Id"
            keyboardType="text"
          />
        </View>
        <View style={{paddingVertical: 20}}>
          <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('Withdraw')} >
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
  );
}
const styles = StyleSheet.create({
  hediingbtn: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  bbb: {
    alignSelf: 'center',
    width: 280,
    paddingVertical: 15,
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
