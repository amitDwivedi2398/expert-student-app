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
export default function AllCourses({navigation}) {
  const [playing, setPlaying] = useState(false);
  const [course, setCourse] = useState([]);

  // All Courses
  const getAllCourse = async () => {
    axiosConfig
      .get(`/allcourse`)
      .then(response => {
        setCourse(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getAllCourse();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#F2F2F5'}}>
      <NotifyHeader title="ALL COURSE" navigation={navigation} />
      <ScrollView>
        {course.map(courses => (
          <View key={courses._id} style={styles.mainView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {
                  id: courses?._id,
                })
              }>
              <Image
                style={{width: 150, height: 100, margin: 10, borderRadius: 5}}
                source={{uri: `${courses?.course_image}`}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {
                  id: courses?._id,
                })
              }>
              <Text style={styles.courseTitle}>{courses?.course_title}</Text>

              <View style={styles.teacherView}>
                <Image
                  style={{width: 30, height: 30, borderRadius: 30}}
                  source={{uri: `${courses?.teacher?.image}`}}
                />
                <Text style={{margin: 10, color: 'black', fontWeight: 'bold'}}>
                  {courses.teacher?.fullname}
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
    marginBottom: 20,
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
