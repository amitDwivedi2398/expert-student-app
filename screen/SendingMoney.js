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
import React from 'react';

export default function SendingMoney({navigation}) {
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
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <CustomHeader title="" navigation={navigation} />
      <View style={{flex: 0.2}}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 18,
            paddingHorizontal: 30,
            color: 'black',
            paddingVertical: 20,
          }}>
          Sending money from Wallet to
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 300, paddingHorizontal: 30}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
              amit Dwivedi
            </Text>
            <Text>PUNJAB NATIONAL BANK A/c No. XX XX 4565</Text>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Image
              style={{width: 40, height: 40, alignSelf: 'center'}}
              source={require('../src/bank.png')}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          width: 310,
          alignSelf: 'center',
          marginTop: 20,
          borderColor: '#CFCFCF',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 200,
            alignSelf: 'center',
            paddingVertical: 10,
          }}>
          <Text>Amount to be send</Text>
          <Text>$00</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 200,
            alignSelf: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#CFCFCF',
          }}>
          <Text>Charges (0%)</Text>
          <Text>$0</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 200,
            alignSelf: 'center',
            paddingVertical: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 14, color: 'black'}}>
            Total Payable
          </Text>
          <Text style={{color: 'black'}}>$00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
