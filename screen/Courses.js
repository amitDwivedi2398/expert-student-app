import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  AppRegistry,
  Alert,
  Platform,
  SearchBar,
  TextInput,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Icon} from 'react-native-elements';
import axiosConfig from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotifyHeader from './header/NotifyHeader';

const myTabs = ({navigation, route}) => {
  return;
};
export default function Courses({navigation}) {
  const [playing, setPlaying] = useState(false);

  const [course, setCourse] = useState([]);

  // All Courses
  const getenrollCourse = async () => {
    axiosConfig
      .get(`/Studentenroll_couses`, {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        setCourse(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    if (AsyncStorage.getItem('user-token')) {
      getenrollCourse();
    }
  }, []);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f1f3f6'}}>
      <NotifyHeader title="MY COURSE" navigation={navigation} />
      <ScrollView>
        {course.map(courses => (
          <View key={courses._id} style={styles.mainView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MyCourse', {
                  id: courses?.course_Id?._id,
                })
              }>
              <Image
                style={{width: 150, height: 100, margin: 10, borderRadius: 5}}
                source={{uri: `${courses?.course_Id?.course_image}`}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MyCourse', {
                  id: courses?.course_Id?._id,
                })
              }>
              <Text style={styles.courseTitle}>
                {courses.course_Id?.course_title}
              </Text>

              <View style={styles.teacherView}>
                <Image
                  style={{width: 30, height: 30, borderRadius: 30}}
                  source={{uri: `${courses?.course_Id?.teacher?.image}`}}
                />
                <Text style={{margin: 10, color: 'black', fontWeight: 'bold'}}>
                  {courses.course_Id?.teacher?.fullname}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 5,
    borderWidth: 0,
    shadowColor: '#171717',
    shadowOffset: {width: -3, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  courseTitle: {
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    textTransform: 'capitalize',
  },

  teacherView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
