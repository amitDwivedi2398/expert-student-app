import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {Icon} from 'react-native-elements';
import React from 'react';
import CustomHeader from './header/CustomHeader';

export default function TermsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{flex: 0.5}}>
        <CustomHeader title="INVITE FRIEND" navigation={navigation} />
      </View>
      <View style={{flex: 1.7}}>
        <Image
          style={{
            width: 350,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
          source={require('../src/undraw_Subscriber_re_om92.png')}
        />
      </View>
      <View style={{flex: 2}}>
        <View>
          <TouchableOpacity style={styles.codebtn}>
            <Text
              style={{
                fontWeight: 'bold',
                alignSelf: 'center',
                fontSize: 17,
                color: 'black',
              }}>
              000000
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 22,
              color: 'black',
            }}>
            Invite your Friends for
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 15,
              paddingVertical: 2,
              color: 'black',
            }}>
            Eligibility To Withdraw
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 15,
              color: 'black',
            }}>
            {' '}
            The company shares
          </Text>
        </View>

        <Text style={{alignSelf: 'center', fontWeight: '600', color: 'black'}}>
          For every Friends who joins
        </Text>
        <Text style={{alignSelf: 'center', fontWeight: '600', color: 'black'}}>
          ReferUP we will give you money
        </Text>
        <View style={{paddingVertical: 20}}>
          <TouchableOpacity style={styles.intfbtn}>
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                fontSize: 18,
              }}>
              Invite Friends
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  intfbtn: {
    width: 230,
    height: 50,
    backgroundColor: '#349FFE',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  codebtn: {
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 150,
    height: 35,
    borderRadius: 10,
  },
});
