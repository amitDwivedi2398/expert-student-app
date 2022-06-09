import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import React from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from './header/CustomHeader';

export default function TermsScreen({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <CustomHeader title="TERMS & CONDITION" navigation={navigation} />
      <View style={{flex: 1}}>
        <Text style={styles.heding}>Terms & Conditions</Text>
        <Text style={styles.heding2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
        <Text style={styles.heding2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
        <Text style={styles.heding2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
        <Text style={styles.heding2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
        <Text style={styles.heding2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
        <Text style={styles.heding2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heding: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#349FFE',
    alignSelf: 'center',
    padding: moderateScale(20),
  },
  heding2: {
    width: scale(320),
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    color: 'black',
  },
});
