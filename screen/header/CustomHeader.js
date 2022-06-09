import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

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
          <Icon name="arrow-left" color="black" size={22} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 3, justifyContent: 'center'}}>
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
      <View style={{flex: 1, justifyContent: 'center'}}></View>
    </View>
  );
}
export default CustomHeader;
