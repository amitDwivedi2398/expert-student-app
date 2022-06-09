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

export default function AddBank({navigation}) {
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
            <TouchableOpacity onPress={() => navigation.navigate('Deposit')}>
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
      <View style={{flex: 0.2}}>
        <StatusBar barStyle="light-content" backgroundColor="white" />
        <CustomHeader title="" navigation={navigation} />
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Text style={styles.aaa}>Select a Saved Bank Account</Text>
        <TouchableOpacity
          style={styles.bbb}
          onPress={() => navigation.navigate('AddNew')}>
          <Text
            style={{alignSelf: 'center', fontWeight: '800', color: '#45A1F4'}}>
            Add new
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => navigation.navigate('Withdraw')}>
          <Image
            style={{width: 380, height: 50, alignSelf: 'center'}}
            source={require('../src/amit.jpg')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  aaa: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
    width: 200,
    alignItems: 'center',
  },
  bbb: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    borderColor: '#45A1F4',
  },
});
