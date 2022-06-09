import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import {ListItem} from 'react-native-elements/dist/list/ListItem';
import {TextInput} from 'react-native-gesture-handler';
import axiosConfig from '../axiosConfig';
import axios from 'axios';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
//import VideoPlayer from 'react-native-video-controls';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as OpenAnything from 'react-native-openanything';
import Pdf from 'react-native-pdf';
import {useLinkProps} from '@react-navigation/native';
import FullScreen from './FullScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotifyHeader from './header/NotifyHeader';

export default function MyCourse({route, navigation, props}) {
  const {id} = route.params;
  //console.log(id);

  const [detail, setDetail] = useState({});
  const [coment, setComent] = useState([]);
  const [comment, setComment] = useState('');

  const getDetail = async () => {
    axiosConfig
      .get(`/viewone_enroll_course/${id}`, {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        setDetail(response.data.data);
        console.log('@@@@', response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  const getComent = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/user/allComment/${id}`)
      .then(response => {
        const coment = response.data.data;
        setComent(coment);
        //console.log(coment);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getDetail();
    getComent();
  }, []);

  const submit = async comment => {
    axios
      .post(
        `http://65.0.80.5:5000/api/user/addcommentbystudent`,
        {
          comment: comment,
          cource_Id: detail._id,
        },
        {
          headers: {
            'user-token': await AsyncStorage.getItem('user-token'),
          },
        },
      )
      .then(function (response) {
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <NotifyHeader title="DETAIL" navigation={navigation} />
        </View>
        <View>
          <View style={{flex: 1}}>
            <TouchableOpacity>
              <Image
                style={styles.courseImage}
                source={{uri: `${detail?.course_Id?.posterimg}`}}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.courseTitle}>
              {detail?.course_Id?.course_title}
            </Text>
            <Text></Text>
            <Text style={styles.courseDesc}>{detail?.course_Id?.desc}</Text>
            <TouchableOpacity style={styles.enrollBtn}>
              <Button
                title="Enrolled"
                color="#8C0000"
                style={styles.enrollText}
                onPress={() =>
                  Alert.alert('You Are Already Enrolled on this Course')
                }
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              paddingVertical: 5,
            }}>
            <Text style={styles.teacherName}>
              Created by :{' '}
              <Text style={styles.techName}>
                {detail?.course_Id?.teacher?.fullname}
              </Text>
            </Text>
          </View>

          <View style={{paddingVertical: 10}}>
            <View>
              <Text style={styles.popular}>Course Videos</Text>
            </View>
            <ScrollView horizontal={true}>
              {detail?.course_Id?.videolist?.map(list => (
                <View key={list._id}>
                  <TouchableOpacity
                    style={{margin: 10}}
                    onPress={() =>
                      navigation.navigate('FullScreen', {id: list._id})
                    }>
                    <Image
                      style={styles.courseList}
                      source={{uri: `${list.video_image}`}}
                    />
                    <Text
                      style={{
                        marginLeft: 10,
                        fontWeight: 'bold',
                        fontSize: 12,
                        color: 'black',
                        alignSelf: 'center',
                      }}>
                      {list.videoTitle}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={{paddingVertical: 10}}>
            <View>
              <Text style={styles.popular}>Course PDF</Text>
            </View>
            <ScrollView horizontal={true}>
              {detail?.course_Id?.pdflist?.map(list => (
                <View key={list._id}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PdfRead', {id: list?._id})
                    }>
                    <Image
                      style={styles.courseList}
                      source={{uri: `${list.pdf_image}`}}
                    />
                    <Text style={styles.pdfText}>{list?.pdf_title}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* <================= Comment ===============> */}
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
            onPress={() =>
              navigation.navigate('SeeMore', {id: detail?.course_Id?._id})
            }
            style={styles.seeButton}>
            <Text style={styles.seeText}>SEE MORE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cInput}>
          <TextInput
            style={styles.commentbtn}
            multiline={true}
            placeholder="Your Comment here"
            placeholderTextColor={'black'}
            onChangeText={setComment}
            value={comment}
          />
          <View>
            <TouchableOpacity
              style={styles.postBtn}
              onPress={() => {
                submit(comment);
              }}>
              <Text style={styles.textBtn}>Post</Text>
            </TouchableOpacity>
          </View>
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
  reade: {
    fontWeight: 'bold',
    margin: 2,
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
    textTransform: 'capitalize',
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
  commentbtn: {
    width: 340,
    height: 100,
    margin: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 5,
    textAlignVertical: 'top',
    backgroundColor: '#f1f3f6',
  },
  postBtn: {
    backgroundColor: '#8C0000',
    width: 85,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  textBtn: {color: 'white', fontSize: 18, alignSelf: 'auto'},
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  pdfText: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
    alignSelf: 'center',
  },
  cInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
