import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({navigation}) {
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referral_code, setReferral_code] = useState('');

  const _storeData = async token => {
    try {
      await AsyncStorage.setItem('user-token', token);
      console.log('token saved success');
    } catch (error) {
      console.log('Some error in setting token');
    }
  };
  const signUp = (
    fullname,
    email,
    mobile,
    password,
    confirmPassword,
    referral_code,
  ) => {
    console.log(
      fullname,
      email,
      mobile,
      password,
      confirmPassword,
      referral_code,
    );
    axios
      .post(`http://65.0.80.5:5000/api/user/signup`, {
        fullname: fullname,
        email: email,
        mobile: mobile,
        password: password,
        confirmPassword: confirmPassword,
        referral_code: referral_code,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.msg === 'success' || response.data.msg == 'success') {
          ToastAndroid.show('Register Successfull....', ToastAndroid.SHORT);
        }
        console.log(response.data.token);

        if (response.data.token != null) {
          _storeData(response.data.token);
          navigation.navigate('Home');
        } else {
          console.log('no token!');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          height: verticalScale(80),
        }}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
          Create an account
        </Text>
      </View>
      <View>
        <View style={styles.inputView}>
          <Icon name="user" size={20} color="black" />
          <TextInput
            style={{paddingHorizontal: 12, flex: 1}}
            placeholder="Full Name"
            textContentType="name"
            onChangeText={setFullname}
            value={fullname}
            placeholderTextColor="#003f5c"
            color="black"
          />
        </View>
        <View style={styles.inputView}>
          <Icon name="envelope" size={20} color="black" />
          <TextInput
            style={{paddingHorizontal: 12, flex: 1}}
            placeholder="Email"
            textContentType="emailAddress"
            onChangeText={setEmail}
            value={email}
            placeholderTextColor="#003f5c"
            color="black"
          />
        </View>
        <View style={styles.inputView}>
          <Icon name="phone" size={20} color="black" />
          <TextInput
            keyboardType="numeric"
            style={{paddingHorizontal: 12, flex: 1}}
            placeholder="Mobile No."
            textContentType="telephoneNumber"
            onChangeText={setMobile}
            value={mobile}
            placeholderTextColor="#003f5c"
            color="black"
          />
        </View>
        <View style={styles.inputView}>
          <Icon name="lock" size={20} color="black" />
          <TextInput
            style={{flex: 1, paddingHorizontal: 12}}
            placeholder={'password'}
            secureTextEntry={passwordSecured}
            textContentType="password"
            onChangeText={setPassword}
            value={password}
            placeholderTextColor="#003f5c"
            color="black"
          />
          <TouchableOpacity
            style={{padding: 4}}
            onPress={() => {
              setPasswordSecured(!passwordSecured);
            }}>
            <Icon name="eye" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
          <Icon name="lock" size={20} color="black" />
          <TextInput
            style={{flex: 1, paddingHorizontal: 12}}
            placeholder={'confirm password'}
            secureTextEntry={passwordSecured}
            textContentType="password"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholderTextColor="#003f5c"
            color="black"
          />
          <TouchableOpacity
            style={{padding: 4}}
            onPress={() => {
              setPasswordSecured(!passwordSecured);
            }}>
            <Icon name="eye" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
          <Icon name="money" size={20} color="black" />
          <TextInput
            keyboardType="numeric"
            style={{paddingHorizontal: 12, flex: 1}}
            placeholder="Referral Code (optional)"
            textContentType="telephoneNumber"
            onChangeText={setReferral_code}
            value={referral_code}
            placeholderTextColor="#003f5c"
            color="black"
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            width: 250,
            margin: moderateScale(20),
            flexDirection: 'row',
          }}>
          <View>
            <CheckBox
              required
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              tintColors={{true: '#F15927', false: 'black'}}
            />
          </View>
          <View
            style={{justifyContent: 'center', alignSelf: 'center', width: 250}}>
            <Text style={{color: '#7A7A81'}}>
              By Using our services you are agreeing to our
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Terms
              </Text>{' '}
              and{' '}
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Privacy Statement
              </Text>{' '}
            </Text>
          </View>
        </View>
        {fullname && email && mobile && password && confirmPassword ? (
          <TouchableOpacity
            style={styles.logbut}
            onPress={() => {
              signUp(
                fullname,
                email,
                mobile,
                password,
                confirmPassword,
                referral_code,
              );
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Create account
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.logbut}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
              Please Enter Details
            </Text>
          </TouchableOpacity>
        )}
        <View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: moderateScale(30),
            }}
            onPress={() => navigation.navigate('Login', {name: 'Login'})}>
            <Text style={{margin: 8, color: 'black'}}>
              Already Have An Accound?
            </Text>
            <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const Login = ({navigation, route}) => {
  return;
};

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
    alignSelf: 'center',
    margin: moderateScale(8),
  },
  logbut: {
    width: '90%',
    height: 45,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 10,
    elevation: 10,
  },
});
