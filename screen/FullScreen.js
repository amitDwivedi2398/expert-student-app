import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import axiosConfig from '../axiosConfig';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

export default function FullScreen({route, navigation}) {
  const {id} = route.params;
  const {width, height} = Dimensions.get('screen');
  const [videoList, setVideoList] = useState([]);

  const getDetail = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/admin/viewonevideo/${id}`)
      .then(response => {
        setVideoList(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: 'gray',
            width: '100%',
            height: height / 2.5,
          }}>
          <VideoPlayer
            controls={true}
            toggleResizeModeOnFullscreen={true}
            seekColor="red"
            source={{
              uri: `${videoList.video_file}`,
            }}
            style={styles.video}
          />
        </View>

        <View>
          <Text>dffdfdfd</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
