import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListItem} from 'react-native-elements/dist/list/ListItem';
import axiosConfig from '../axiosConfig';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotifyHeader from './header/NotifyHeader';

export default function HomeDetails({route, navigation}) {
  const {id} = route.params;

  const [detail, setDetail] = useState({});
  const [coment, setComent] = useState([]);
  const [plan, setPlan] = useState({});

  // <=============== Course Detail =======>
  const getDetail = async () => {
    axiosConfig
      .get(`/viewonecoursep/${id}`)
      .then(response => {
        setDetail(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  // <=============== Comments =======>
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
  // <=============== Membership plan =======>
  const getPlan = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/user/viewone_mem_plan`, {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        const plan = response.data.data.plan_Id._id;
        setPlan(plan);
        console.log('@@@sss', plan);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getDetail();
    getComent();
    if (AsyncStorage.getItem('user-token')) {
      getPlan();
    }
  }, []);

  console.log('####', detail._id);

  const enrollNow = async () => {
    axios
      .post(
        `http://65.0.80.5:5000/api/admin/addenrollStudent`,
        {
          plan_Id: plan,
          course_Id: detail._id,
        },
        {
          headers: {
            'user-token': await AsyncStorage.getItem('user-token'),
          },
        },
      )
      .then(response => {
        console.log(response.data);
        if (
          response.data.message == 'success' &&
          response.data.message === 'success'
        ) {
          Alert.alert('Enrolled SuccessFully');
        }
      })
      .catch(error => {
        console.log(error.response.data);
        if (
          error.response.data.message == 'already exists' &&
          error.response.data.message === 'already exists'
        ) {
          Alert.alert('You Already Enrolled this Course');
        }
      });
  };

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <NotifyHeader title="DETAIL" navigation={navigation} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
        <View style={{flex: 1}}>
          <TouchableOpacity>
            <Image
              style={styles.courseImage}
              source={{uri: `${detail.posterimg}`}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.courseTitle}>{detail.course_title}</Text>
         
          <Text style={styles.courseDesc}>{detail.desc}</Text>
          <TouchableOpacity style={styles.enrollBtn}>
            <Button
              title="Enroll Now"
              color="black"
              style={styles.enrollText}
              onPress={enrollNow}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{flexDirection: 'row', marginLeft: 10, paddingVertical: 5}}>
          <Text style={styles.teacherName}>
            Course Type :{' '}
            <Text style={styles.techName}>{detail?.course_type}</Text>
          </Text>
        </View>

        <View
          style={{flexDirection: 'row', marginLeft: 10, paddingVertical: 5}}>
          <Text style={styles.teacherName}>
            Created by :{' '}
            <Text style={styles.techName}>{detail.teacher?.fullname}</Text>
          </Text>
        </View>

        <View>
          <Text style={styles.popular}>Comments</Text>
          {coment?.slice(0, 3).map(list => (
            <View key={list?._id}>
              <Text style={styles.commentName}>
                {list.staff_id?.fullname}
                {list.user_id?.fullname}
              </Text>
              <Text style={styles.comment}>{list.comment}</Text>
            </View>
          ))}
        </View>
        {/* See More Button */}
        <View style={styles.seeView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SeeMore', {id: detail._id})}
            style={styles.seeButton}>
            <Text style={styles.seeText}>SEE MORE</Text>
          </TouchableOpacity>
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

  courseImage: {
    width: 350,
    height: 200,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
  },
  courseTitle: {
    fontSize: 25,
    marginLeft: 10,
    width: 300,
    color: 'black',
    fontWeight: 'bold',
  },
  courseDesc: {
    fontWeight: 'bold',
    marginLeft: 10,
    paddingVertical: 10,
    color: 'black',
  },
  enrollBtn: {
    flex: 1,
    height: 50,
    // backgroundColor: 'yellow',
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 15,
  },
  enrollText: {
    // color: 'black',
    // fontWeight: '700',
  },
  teacherName: {
    color: 'black',
    fontWeight: '500',
  },
  techName: {
    color: 'purple',
    fontWeight: '900',
  },
  courseList: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  icon: {
    width: 15,
    height: 15,
    margin: 5,
  },
  popular: {
    fontSize: 25,
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: 'black',
  },

  containers: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
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
  seeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  seeButton: {
    width: 300,
    height: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  seeText: {
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
  },
});
