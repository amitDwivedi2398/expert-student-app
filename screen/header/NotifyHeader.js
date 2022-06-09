import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

function NotifyHeader({title, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        marginBottom: 5,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          margin: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-left" color="black" size={22} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 15,
            color: 'black',
          }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          margin: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationsScreen')}>
          <Icon name="bell" color="black" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default NotifyHeader;
