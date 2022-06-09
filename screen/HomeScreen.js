import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  AppRegistry,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import axiosConfig from '../axiosConfig';
import {Badge} from 'react-native-paper';
import axios from 'axios';

import HomeDetails from './HomeDetails';

export default function HomeScreen({navigation}) {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [course, setCourse] = useState([]);
  const [recent, setRecent] = useState([]);
  const [free, setFree] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    // All Courses
    axiosConfig
      .get('/allcourse')
      .then(response => {
        setCourse(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
    // Recent Course
    axiosConfig
      .get('/allcoursebyrecent')
      .then(response => {
        setRecent(response.data.data);
        //console.log(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
    // Recent Course
    axios
      .get('http://65.0.80.5:5000/api/user/allcoursefree')
      .then(response => {
        setFree(response.data.data);
        //console.log(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
    // CAtegory List Api
    axiosConfig
      .get('/allCat')
      .then(response => {
        setCategory(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  const scrollRef = useRef();
  let intervalId = null;

  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {};
  });

  const onSlideChange = useCallback(() => {
    // Calculate newIndex here and use it to update your state and to scroll to the new slide
    const newIndex =
      selectedIndex === carouselImages.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: dimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, 3000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();

    return () => {
      // Clear the interval when component unmounts, otherwise you could have memory leaks
      clearInterval(intervalId);
    };
  }, [onSlideChange]);

  const onTouchStart = () => {
    // As soon as the user touches the slide, stop the automatic sliding
    clearInterval(intervalId);
  };

  const onTouchEnd = () => {
    // As soon as the user stops touching the slide, releases it, start the automatic sliding again
    startInterval();
  };

  const carouselImages = [
    {image: require('../src/edu1.png')},
    {image: require('../src/edu2.png')},
    {image: require('../src/edu3.png')},
  ];

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  function CustomHeader({title, navigation}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: '#f1f3f6',
          marginBottom: 5,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="indent" type="font-awesome" size={22} />
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
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationsScreen')}>
            <Icon name="bell" type="font-awesome" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f1f3f6'}}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <CustomHeader title="Home" navigation={navigation} />
      <ScrollView>
        <View>
          {/* Top Banner Section Starts from Here */}
          <View
            style={{
              width: dimension.width,
              borderWidth: 0,
              marginBottom: 20,
              borderColor: 'lightgreen',
            }}>
            <ScrollView
              horizontal
              ref={scrollRef}
              onMomentumScrollEnd={setIndex}
              showsHorizontalScrollIndicator={false}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              pagingEnabled>
              {carouselImages.map((value, key) => (
                <Image
                  source={value.image}
                  style={{
                    width: dimension?.width,
                    height: 180,
                    resizeMode: 'cover',
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              ))}
            </ScrollView>
          </View>
          {/* Latest Course Tab Starts From Here */}
          <View>
            <Text style={styles.popular}>Latest Courses</Text>
            <ScrollView horizontal={true}>
              {recent.map(recents => (
                <View key={recents._id} style={styles.first1}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Details', {id: recents._id})
                    }>
                    <View style={styles.second}>
                      <Image
                        style={styles.latestImg}
                        source={{uri: `${recents.course_image}`}}
                      />
                      <Text style={styles.coursetitle1}>
                        {recents.course_title}
                      </Text>
                    </View>
                    <View style={styles.teachcat}>
                      <View style={styles.third}>
                        <Image
                          style={{width: 30, height: 30, borderRadius: 50}}
                          source={{uri: `${recents.teacher?.image}`}}
                        />
                        <Text style={styles.teacherText1}>
                          {recents.teacher?.fullname}
                        </Text>
                      </View>
                      <View style={styles.third}>
                        <Text style={styles.teacherText}>
                          {recents.category_id?.catName}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          {/* Category Tab Starts From Here */}
          <View>
            <Text style={styles.popular}>Top Categories</Text>
            <ScrollView horizontal={true}>
              {category.map(cat => (
                <View key={cat._id} style={styles.catmain}>
                  <TouchableOpacity>
                    <View style={styles.catview}>
                      <Image
                        style={styles.banner}
                        source={{uri: `${cat?.icon}`}}
                      />
                      <Text style={styles.cattext}>{cat?.catName}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          {/* Trending Courses Kist Starts from Here */}
          <View>
            <Text style={styles.popular}>Trending Courses</Text>
            <ScrollView horizontal={true}>
              {course.map(courses => (
                <View key={courses._id} style={styles.first}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Details', {id: courses._id})
                    }>
                    <View style={styles.second}>
                      <Image
                        style={styles.banner}
                        source={{uri: `${courses.course_image}`}}
                      />
                      <Text style={styles.coursetitle}>
                        {courses.course_title}
                      </Text>
                    </View>
                    <View style={styles.third}>
                      <Image
                        style={{width: 30, height: 30, borderRadius: 50}}
                        source={{uri: `${courses.teacher?.image}`}}
                      />
                      <Text style={styles.teacherText}>
                        {courses.teacher?.fullname}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          {/* Free Courses Kist Starts from Here */}
          <View>
            <Text style={styles.popular}>Free Courses</Text>
            <ScrollView horizontal={true}>
              {free.map(freeCourse => (
                <View key={freeCourse._id} style={styles.first}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Details', {id: freeCourse._id})
                    }>
                    <View style={styles.second}>
                      <Image
                        style={styles.banner}
                        source={{uri: `${freeCourse.course_image}`}}
                      />
                      <Text style={styles.coursetitle}>
                        {freeCourse.course_title}
                      </Text>
                    </View>
                    <View style={styles.third}>
                      <Image
                        style={{width: 30, height: 30, borderRadius: 50}}
                        source={{uri: `${freeCourse.teacher?.image}`}}
                      />
                      <Text style={styles.teacherText}>
                        {freeCourse.teacher?.fullname}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  first1: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
  },
  first: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  second: {
    flex: 1,
    flexDirection: 'column',
  },
  third: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  teacherText: {
    marginLeft: 5,
    fontWeight: '600',
    color: 'black',
  },
  teacherText1: {
    marginLeft: 5,
    fontWeight: '600',
    color: 'black',
  },
  catmain: {
    padding: 15,
  },
  catview: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 2,
  },
  cattext: {padding: 15, color: 'black', fontWeight: '500'},
  latestImg: {
    width: 250,
    height: 160,
    resizeMode: 'cover',
    margin: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgreen',
  },
  banner: {
    width: 200,
    height: 140,

    margin: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgreen',
  },
  coursetitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    textTransform: 'capitalize',
  },
  coursetitle1: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    textTransform: 'capitalize',
  },
  popular: {
    fontSize: 25,
    marginLeft: 10,
    color: 'black',
    fontWeight: '700',
    fontFamily: 'Quintessential-Regular',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  teachcat: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
