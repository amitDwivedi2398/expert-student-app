//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {color} from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import {Icon} from 'react-native-elements';
import CustomHeader from './header/CustomHeader';

// create a component
const About = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader title="ABOUT" navigation={navigation} />
      <View>
        <Text style={styles.aa}>Introduction</Text>
        <Text style={styles.bb}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
      </View>
      <View>
        <Text style={styles.aa}>Value</Text>
        <Text style={styles.bb}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
      </View>
      <View>
        <Text style={styles.aa}>Brands</Text>
        <Text style={styles.bb}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
      </View>
      <View>
        <Text style={styles.aa}>Recognitions</Text>
        <Text style={styles.bb}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  aa: {
    fontSize: 25,
    marginLeft: moderateScale(20),
    color: '#349FFE',
    fontWeight: '500',
    paddingVertical: moderateScale(15),
  },
  bb: {
    marginLeft: moderateScale(20),
    color: 'black',
  },
});

//make this component available to the app
export default About;
