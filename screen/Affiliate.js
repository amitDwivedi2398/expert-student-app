import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
//import {Icon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
//import {PricingCard} from 'react-native-elements';
import {PricingCard, colors} from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotifyHeader from './header/NotifyHeader';

export default function Affiliate({navigation}) {
  const [user, setUser] = useState({});
  const [id, setId] = useState('');
  const getUser = async () => {
    axios
      .get('http://65.0.80.5:5000/api/user/myprofile', {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        const user = response.data.data;
        {
          setId(user._id);
        }

        setUser(user);
        {
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const freePlan = async () => {
    axios
      .post(
        `http://65.0.80.5:5000/api/user/addmembership/6268e0e125aa2a69cac0a82c/${id}`,
      )
      .then(response => {
        console.log(response.data);
        if (
          response.data.message == 'success' &&
          response.data.message === 'success'
        ) {
          Alert.alert('Membership Registered Successfull');
        }
      })
      .catch(error => {
        console.log(error.response.data);
        if (
          error.response.data.message == 'already exists' &&
          error.response.data.message === 'already exists'
        ) {
          Alert.alert('You Already Have This MemberShip');
        }
      });
  };

  const firstPlan = async () => {
    axios
      .post(
        `http://65.0.80.5:5000/api/user/addmembership/6268e0ed25aa2a69cac0a82f/${id}`,
      )
      .then(response => {
        console.log(response.data);
        if (
          response.data.message == 'success' &&
          response.data.message === 'success'
        ) {
          Alert.alert('Membership Registered Successfull');
        }
      })
      .catch(error => {
        console.log(error.response.data);
        if (
          error.response.data.message == 'already exists' &&
          error.response.data.message === 'already exists'
        ) {
          Alert.alert('You Already Have This MemberShip');
        }
      });
  };

  const secondPlan = async () => {
    axios
      .post(
        `http://65.0.80.5:5000/api/user/addmembership/6268e0f225aa2a69cac0a832/${id}`,
      )
      .then(response => {
        console.log(response.data.data);
        if (
          response.data.message == 'success' &&
          response.data.message === 'success'
        ) {
          Alert.alert('Membership Registered Successfull');
        }
      })
      .catch(error => {
        console.log(error.response.data);
        if (
          error.response.data.message == 'already exists' &&
          error.response.data.message === 'already exists'
        ) {
          Alert.alert('You Already Have This MemberShip');
        }
      });
  };

  const thirdPlan = async () => {
    axios
      .post(
        `http://65.0.80.5:5000/api/user/addmembership/6268e0f825aa2a69cac0a835/${id}`,
      )
      .then(response => {
        console.log(response.data.data);
        if (
          response.data.message == 'success' &&
          response.data.message === 'success'
        ) {
          Alert.alert('Membership Registered Successfull');
        }
      })
      .catch(error => {
        console.log(error.response);
        if (
          error.response.data.message == 'already exists' &&
          error.response.data.message === 'already exists'
        ) {
          Alert.alert('You Already Have This MemberShip');
        }
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <NotifyHeader title="MEMBERSHIP" navigation={navigation} />
        </View>
        <View>
          <PricingCard
            containerStyle={{height: 300}}
            color="#4f9deb"
            title="FREE PACK"
            titleStyle={{fontSize: 23}}
            price="Free"
            info={['Student Can Access Only Free Courses']}
            infoStyle={{fontSize: 15, color: 'black'}}
            button={{title: 'BUY NOW', color: 'red'}}
            onButtonPress={freePlan}
          />
        </View>

        <View>
          <PricingCard
            color="#4f9deb"
            title="BEGINNERS PACK"
            titleStyle={{fontSize: 23}}
            price="$15"
            info={[
              'Guidence For Foreign Education',
              'Chat Facility',
              'Student can Access only one course',
              //'Passive income',
            ]}
            infoStyle={{
              fontSize: 15,
              color: 'black',
              textAlign: 'auto',
              marginLeft: 40,
            }}
            button={{title: 'BUY NOW', color: 'blue'}}
            onButtonPress={firstPlan}
          />
        </View>
        <View>
          <PricingCard
            color="#4f9deb"
            title="SKILLED PACK"
            titleStyle={{fontSize: 23}}
            price="$28"
            info={[
              'Student can access 2 course',
              'Job Opportunities',
              'Courses Download Facility',
              //'Live class',
              //'Passive income',
            ]}
            infoStyle={{
              fontSize: 15,
              color: 'black',
              textAlign: 'auto',
              marginLeft: 40,
            }}
            button={{title: 'BUY NOW', color: 'cyan'}}
            onButtonPress={secondPlan}
          />
        </View>
        <View>
          <PricingCard
            color="#4f9deb"
            title="EXPERT PACK"
            titleStyle={{fontSize: 23}}
            price="$110"
            info={[
              'Student can access 5 course',
              // 'Passive income',
              // 'Crypto Rewards',
              'Opportunity to participate in world skill',
              //'Live class',
              'Guidance for higher education',
              'Job opportunity',
              'Course download Facilities',
            ]}
            infoStyle={{
              fontSize: 15,
              color: 'black',
              textAlign: 'auto',
              marginLeft: 40,
            }}
            button={{title: 'BUY NOW', color: 'green'}}
            onButtonPress={thirdPlan}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
