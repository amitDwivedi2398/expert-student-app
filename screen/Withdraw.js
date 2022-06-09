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
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export default function Withdraw({navigation}) {
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
          Withdraw money from Wallet to
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 300, paddingHorizontal: 30}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
              amit Dwivedi
            </Text>
            <Text style={{color: 'black'}}>
              PUNJAB NATIONAL BANK A/c No. XX XX 4565
            </Text>
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
          flexDirection: 'row',
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: scale(150),
            borderWidth: 1,
            height: verticalScale(100),
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'black',
          }}>
          <Text style={{padding: moderateScale(10), color: 'black'}}>
            Available Balance
          </Text>
          <Text style={{padding: moderateScale(10), color: 'black'}}>0.00</Text>
          <Text style={{padding: moderateScale(10), color: 'black'}}>100</Text>
        </View>
        <View
          style={{
            width: scale(150),
            borderWidth: 1,
            height: verticalScale(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{padding: moderateScale(10), color: 'black'}}>
            Withdraw Balance
          </Text>
          <Text style={{padding: moderateScale(10), color: 'black'}}>0.00</Text>
          <Text style={{padding: moderateScale(10), color: 'black'}}>100</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Withdraw')}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 18,
            color: 'white',
            alignSelf: 'center',
          }}>
          Withdraw
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  btn: {
    width: 310,
    height: 50,
    backgroundColor: '#45A1F4',
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
});
