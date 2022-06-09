import 'react-native-gesture-handler';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ChatScreen from './screen/ChatScreen';
import Courses from './screen/Courses';
import AllCourses from './screen/AllCourses';
import WalletScreen from './screen/WalletScreen';
import Affiliate from './screen/Affiliate';
import HomeScreen from './screen/HomeScreen';
import SplashScreen from './screen/SplashScreen';
import LogIn from './screen/LogIn';
import SecondScreen from './screen/SecondScreen';
import Register from './screen/Register';
import NotificationsScreen from './screen/NotificationsScreen';
import KycScreen from './screen/KycScreen';
import Messaging from './screen/Messaging';
import HomeDetails from './screen/HomeDetails';
import MyCourse from './screen/MyCourse';
import ProfileEdit from './screen/ProfileEdit';
import SeeMore from './screen/SeeMore';
import DepositScreen from './screen/DepositScreen';
import SendMoney from './screen/SendMoney';
import TermsScreen from './screen/TermsScreen';
import InviteScreen from './screen/InviteScreen';
import AddBank from './screen/AddBank';
import AddNew from './screen/AddNew';
import SendingMoney from './screen/SendingMoney';
import UpiIdScreen from './screen/UpiIdScreen';
import CryptoScreen from './screen/CryptoScreen';
import Withdraw from './screen/Withdraw';
import About from './screen/About';
import Contact from './screen/Contact';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import NotifyDetail from './screen/NotifyDetail';
import FullScreen from './screen/FullScreen';
import PdfRead from './screen/PdfRead';
import TransactionList from './screen/TransactionList';
import WithdrawHistor from './screen/WithdrawHistor';
//import Profile from "./src/profile.png";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});

const crteStackNav = createStackNavigator();

function TabScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {
          fontSize: 11,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('./src/homa.png')
              : require('./src/homee.png');
          } else if (route.name === 'All Course') {
            iconName = focused
              ? require('./src/book1.png')
              : require('./src/books.png');
          }
          if (route.name === 'Chat') {
            iconName = focused
              ? require('./src/chat.png')
              : require('./src/chats.png');
          } else if (route.name === 'Wallet') {
            iconName = focused
              ? require('./src/wallets.png')
              : require('./src/wallet.png');
          }
          if (route.name === 'Membership') {
            iconName = focused
              ? require('./src/affiliates.png')
              : require('./src/affiliate.png');
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={{width: 25, height: 25}}
              resizeMode="contain"
            />
          );
        },
        activeTintColor: 'tomato',
        inactiveTintColor: 'black',
      })}
      options={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="All Course"
        component={AllCourses}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}
      /> */}
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Membership"
        component={Affiliate}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
const MyTab = ({component}) => (
  <crteStackNav.Navigator>
    <crteStackNav.Screen name={'Home'} options={{headerShown: false}}>
      {component}
    </crteStackNav.Screen>
  </crteStackNav.Navigator>
);

const myTabs = ({navigation}) => <MyTab component={() => TabScreen()} />;

const TabNavigation = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LogIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Second"
        component={SecondScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={myTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="CameraKyc"
        component={CameraKyc}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Messaging"
        component={Messaging}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={HomeDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyCourse"
        component={MyCourse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FullScreen"
        component={FullScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PdfRead"
        component={PdfRead}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileEdit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SeeMore"
        component={SeeMore}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Deposit"
        component={DepositScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bank"
        component={SendMoney}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotifyDetail"
        component={NotifyDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InviteScreen"
        component={InviteScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddBank"
        component={AddBank}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddNew"
        component={AddNew}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SendingMoney"
        component={SendingMoney}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpiIdScreen"
        component={UpiIdScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CryptoScreen"
        component={CryptoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Withdraw"
        component={Withdraw}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = ({navigation}) => {
  const [user, setUser] = useState({});
  const [badge, setBadge] = useState({});

  const getUser = async () => {
    axios
      .get('http://65.0.80.5:5000/api/user/myprofile', {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        const user = response.data.data;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  // View One Badge == == ==  ==== ==== ======

  const getBadge = async () => {
    axios
      .get('http://65.0.80.5:5000/api/user/viewonebatchUser', {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        console.log(response.data.data.lavel_Id.level);
        const badge = response.data.data;
        setBadge(badge);
        //console.log(badge);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getUser();
    getBadge();
  }, []);

  const CustomContentContent = ({navigation}) => {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'column',
            borderBottomColor: '#C8BDBD',
            borderBottomWidth: 5,
            marginBottom: 10,
            height: 200,
          }}>
          <View style={styles.badge}>
            <View style={styles.badgeImage}>
              <Image
                source={{uri: `${badge?.lavel_Id?.icon}`}}
                style={{width: 30, height: 30, borderRadius: 30}}
              />
            </View>
            <View style={styles.badgeText}>
              <Text style={styles.levelText}>{badge?.lavel_Id?.level}</Text>
            </View>
          </View>

          <View style={{alignSelf: 'flex-start'}}>
            {user?.userimg !== '' &&
            user?.userimg !== null &&
            user?.userimg !== undefined ? (
              <TouchableOpacity>
                <Image
                  source={{uri: `${user?.userimg}`}}
                  // resizeMode="contain"
                  style={{width: 60, height: 60, borderRadius: 50}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Image
                  source={require('./src/profile.png')}
                  // resizeMode="contain"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{alignSelf: 'flex-start', marginLeft: 10}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {user?.fullname}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>{user?.email}</Text>
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => navigation.navigate('Profile')}>
                <Icon name="edit" color="black" size={20} />
              </TouchableOpacity>
            </View>
            {/* <View style={styles.badge}>
              <View style={styles.badgeImage}>
                <Image
                  source={{uri: `${badge?.lavel_Id?.icon}`}}
                  style={{width: 20, height: 20, resizeMode: 'center'}}
                />
              </View>
              <View style={styles.badgeText}>
                <Text style={styles.levelText}>{badge?.lavel_Id?.level}</Text>
              </View>
            </View> */}
          </View>
        </View>

        <ScrollView>
          <View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="home" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Home
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="book" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  My Courses
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="list" color="black" size={20} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Transaction')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Deposit History
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="list" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Withdraw')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Withdraw History
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="comment" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Chat
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="check" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Kyc')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Kyc Form
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="user" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('About')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  About Us
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="info" color="black" size={20} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('TermsScreen')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="phone" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Contact Us
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 1,
          }}>
          <View style={{margin: 10}}>
            <Icon name="users" color="black" size={20} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Membership')}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                margin: 10,
              }}>
              Membership
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 1,
          }}>
          <View style={{margin: 10}}>
            <Icon name="money" color="black" size={20} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('InviteScreen')}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                margin: 10,
              }}>
              Refer & earn
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 1,
          }}>
          <View style={{margin: 10}}>
            <Icon name="power-off" color="black" size={20} />
          </View>
          <TouchableOpacity
            onPress={async () => {
              navigation.closeDrawer();
              //navigation.dispatch(StackActions.push('Login'));
              console.log('<<<<<<<<<<<');
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
              // navigation.replace('Login');
              console.log('>>>>>>>>>>>');
              await AsyncStorage.removeItem('user-token');
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                margin: 10,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => CustomContentContent(props)}>
        <Drawer.Screen
          name="Tab"
          component={TabNavigation}
          options={{headerShown: false, swipeEnabled: false}}
        />
        <Drawer.Screen
          name="Notification"
          component={NotificationsScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Courses"
          component={Courses}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Kyc"
          component={KycScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Transaction"
          component={TransactionList}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Withdraw"
          component={WithdrawHistor}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Wallet"
          component={WalletScreen}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#800080',
    marginTop: 10,
    width: 100,
    borderRadius: 50,
    marginLeft: 5,
    padding: 5,
  },
  badgeImage: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  levelText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});
