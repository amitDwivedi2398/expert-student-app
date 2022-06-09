import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const NotifyDetail = ({route, navigation}) => {
  const {id} = route.params;

  const [notifyD, setNotifyD] = useState({});
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
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationsScreen')}>
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
        <View style={{flex: 1, justifyContent: 'center'}}></View>
      </View>
    );
  }

  const getOne = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/admin/viewoneNotificationUser/${id}`)
      .then(response => {
        const notifyD = response.data.data;
        setNotifyD(notifyD);
        console.log(notifyD);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getOne();
  }, []);
  return (
    <View style={styles.container}>
      <CustomHeader title="Notification" navigation={navigation} />
      <SafeAreaView>
        <View>
          <Text style={styles.noteText}>{notifyD?.noti_title}</Text>
        </View>
        <View>
          <Text style={styles.noteDesc}>{notifyD?.desc}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 10,
  },
  noteText: {
    margin: 10,
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  noteDesc: {
    margin: 10,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
});

export default NotifyDetail;
