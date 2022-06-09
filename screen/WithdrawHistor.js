import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListItem} from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';
import NotifyHeader from './header/NotifyHeader';

export default function WithdrawHistor({navigation}) {
  const [trans, setTrans] = useState([]);

  const getTrans = async () => {
    axios
      .get('http://65.0.80.5:5000/api/user/withdrawal_listbytoken', {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        const trans = response.data.data;
        setTrans(trans);
        console.log('data', trans);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    if (AsyncStorage.getItem('user-token')) {
      getTrans();
    }
  }, []);

  return (
    <View>
      <View>
        <NotifyHeader title="WITHDRAW LIST" navigation={navigation} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            borderBottomWidth: 1,
          }}>
          {trans?.map(tra => (
            <ListItem key={tra?._id} bottomDivider>
              <Icon name="money" color="black" size={25} />
              <ListItem.Content>
                <ListItem.Title style={{color: 'black', fontSize: 17}}>
                  Transaction ID : {tra?.transectionId}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{
                    color: 'black',
                    fontSize: 18,
                    margin: 3,
                    fontWeight: '600',
                  }}>
                  INR: {tra?.inr} | USDT: {tra?.usd} Status : {tra?.status}
                  {/* Amount : {tra?.amount} */}
                </ListItem.Subtitle>
                <ListItem.Subtitle
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  Date : {moment(tra?.createdAt).format('MMMM Do YYYY, h:mm a')}{' '}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  transation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B008B',
  },
  transText: {
    color: 'white',
    fontSize: 25,
  },
});
