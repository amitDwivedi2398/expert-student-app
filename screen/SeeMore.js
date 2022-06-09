import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SeeMore({route, navigation}) {
  const {id} = route.params;

  const [coment, setComent] = useState([]);
  const getComent = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/user/allComment/${id}`)
      .then(response => {
        const coment = response.data.data;
        setComent(coment);
        console.log(coment);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getComent();
  }, []);
  function CustomHeader({title, navigation}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: 'white',
          marginBottom: 5,
        }}>
        <View style={{flex: 1, justifyContent: 'center', margin: 7}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-left" size={20} color="black" />
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
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity>
            <Icon name="bell" color="black" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <CustomHeader title="Comments" navigation={navigation} />
        </View>
        <View>
          {coment?.map(list => (
            <View key={list?._id}>
              <Text style={styles.commentName}>
                {list.staff_id?.fullname}
                {list.user_id?.fullname}
              </Text>
              <Text style={styles.comment}>{list.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  popular: {
    fontSize: 25,
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: 'black',
  },
  commentName: {
    fontSize: 15,
    marginLeft: 12,
    fontWeight: 'bold',
    paddingTop: 15,
    color: 'black',
  },
  comment: {
    marginLeft: 12,
    paddingVertical: 0,
    color: 'black',
  },
});
