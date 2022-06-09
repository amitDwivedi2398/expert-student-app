import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Swiper from 'react-native-swiper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListItem, Image} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationScreen({navigation}) {
  const [notify, setNotify] = useState([]);

  const getNotify = async () => {
    axios
      .get('http://65.0.80.5:5000/api/user/allUserNotification', {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        const notify = response.data.data;
        setNotify(notify);
        console.log(notify);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    if (AsyncStorage.getItem('user-token')) {
      getNotify();
    }
  }, []);

  function CustomHeader({title, navigation}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: '#f1f3f6',
          marginBottom: 5,
        }}>
        <View style={{flex: 1, justifyContent: 'center', marginLeft: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-left" color="black" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '800',
              fontSize: 20,
              color: '#000',
            }}>
            {title}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {/* <TouchableOpacity>
            <Image
              style={{
                width: 30,
                height: 30,
                marginLeft: 20,
              }}
              source={require('../src/bell.png')}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <View style={{}}>
        <CustomHeader title="Notification" navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {notify?.map(note => (
              <ListItem
                key={note?._id}
                bottomDivider
                onPress={() =>
                  navigation.navigate('NotifyDetail', {id: note._id})
                }>
                <Icon name="bell" color="black" size={25} />
                <ListItem.Content>
                  <ListItem.Title>{note?.noti_title}</ListItem.Title>
                  {/* <ListItem.Subtitle>{note?.desc}</ListItem.Subtitle> */}
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  storiesView: {
    paddingVertical: 10,
    paddingRight: 10,
    backgroundColor: '#fafafa',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  storyContentView: {
    width: 90,
    height: 130,
    borderRadius: 10,
    borderColor: '#dfe4ea',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyUserImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
