import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import Affiliate from './Affiliate';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';

export default function ProfileEdit({navigation}) {
  const [user, setUser] = useState({});
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [fullname, setFullname] = useState({});
  const [email, setEmail] = useState({});
  const [mobile, setMobile] = useState({});
  const [password, setPassword] = useState({});
  const [confirmPassword, setConfirmPassword] = useState({});
  const [singleFile, setSingleFile] = useState('');

  function CustomHeader({title, navigation}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: 'white',
          marginBottom: 5,
        }}>
        <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-left" color="black" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '800',
              fontSize: 20,
              color: 'black',
            }}>
            {title}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}></View>
      </View>
    );
  }
  const getUser = async () => {
    axios
      .get('http://65.0.80.5:5000/api/user/myprofile', {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        const user = response.data.data;

        {
          setFullname(user.fullname);
          setEmail(user.email);
          setMobile(user.mobile);
          setPassword(user.password);
          setConfirmPassword(user.cnfmPassword);
        }
        setUser(user);
        console.log(user);
        {
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const selectFile = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        presentationStyle: 'fullScreen',
      });
      console.log(response[0]);
      setSingleFile(response[0]);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleSubmit = async () => {
    console.log(
      singleFile.name,
      singleFile.uri,
      fullname,
      email,
      mobile,
      password,
    );
    const data = new FormData();
    data.append('fullname', fullname);
    data.append('email', email);
    data.append('mobile', mobile);
    data.append('password', password);
    data.append('cnfmPassword', confirmPassword);
    if (singleFile !== null) {
      data.append('userimg', singleFile.name, singleFile.uri);
    }

    axios
      .post(`http://65.0.80.5:5000/api/user/edituserbytoken`, data, {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        //console.log(response.data);
        console.log('@@@@@', response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Profile" navigation={navigation} />
      <ScrollView>
        <View>
          <View style={styles.inputView}>
            <Icon name="user" color="black" size={20} />
            <TextInput
              style={{paddingHorizontal: 12, flex: 1}}
              placeholder="Full Name"
              onChangeText={setFullname}
              value={fullname}
              textContentType="text"
              placeholderTextColor={'#7A7A81'}
              color="black"
              keyboardType="default"
            />
          </View>

          <View style={styles.inputView}>
            <Icon name="envelope" color="black" size={20} />
            <TextInput
              style={{paddingHorizontal: 12, flex: 1}}
              placeholder="Email"
              textContentType="Email"
              onChangeText={setEmail}
              value={email}
              placeholderTextColor={'#7A7A81'}
              color="black"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputView}>
            <Icon name="phone" color="black" size={20} />
            <TextInput
              style={{paddingHorizontal: 12, flex: 1}}
              placeholder="Mobile"
              textContentType="telephoneNumber"
              onChangeText={setMobile}
              value={mobile}
              placeholderTextColor={'#7A7A81'}
              color="black"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputView}>
            <Icon name="lock" color="black" size={20} />
            <TextInput
              style={{flex: 1, paddingHorizontal: 12}}
              placeholder={'password'}
              secureTextEntry={passwordSecured}
              onChangeText={setPassword}
              value={password}
              textContentType="password"
              placeholderTextColor={'#7A7A81'}
              color="black"
            />
            <TouchableOpacity
              style={{padding: 4}}
              onPress={() => {
                setPasswordSecured(!passwordSecured);
              }}>
              <Icon name="eye" color="black" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
            <Icon name="lock" color="black" size={20} />
            <TextInput
              style={{flex: 1, paddingHorizontal: 12}}
              placeholder={'confirm password'}
              secureTextEntry={passwordSecured}
              textContentType="password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholderTextColor={'#7A7A81'}
              color="black"
            />
            <TouchableOpacity
              style={{padding: 4}}
              onPress={() => {
                setPasswordSecured(!passwordSecured);
              }}>
              <Icon name="eye" color="black" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.imagetext}>
            <Text style={styles.textimage}>Upload Image</Text>
          </View>
          <View style={styles.inputImage}>
            <View style={styles.inputimage1}>
              <TouchableOpacity style={{padding: 4}} onPress={selectFile}>
                <Icon name="camera" color="black" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputimage2}>
              <Image
                source={{uri: `${user?.userimg}`}}
                resizeMode="stretch"
                style={{width: 100, height: 100}}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.logbut} onPress={handleSubmit}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
        <Text>{'\n'}</Text>
      </ScrollView>
    </View>
  );
}
// const Login = ({navigation, route}) => {
//   return;
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputView: {
    marginTop: 20,
    width: '90%',
    height: 55,
    backgroundColor: '#f1f3f6',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  logbut: {
    width: '90%',
    height: 45,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 10,
    elevation: 10,
  },
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f6',
    height: 55,
    width: '90%',
    marginLeft: 20,
  },
  chosepht: {
    backgroundColor: '#f1f3f6',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  state: {
    backgroundColor: '#f1f3f6',
    width: '90%',
    height: 50,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cemra: {
    backgroundColor: '#f1f3f6',
    width: '90%',
    height: 50,
    marginLeft: 20,
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  form: {
    backgroundColor: '#f1f3f6',
    height: 100,
    width: '50%',
    margin: 10,
    flex: 1,
  },
  inputImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  inputimage1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 100,
  },
  inputimage2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  imagetext: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  textimage: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
});
