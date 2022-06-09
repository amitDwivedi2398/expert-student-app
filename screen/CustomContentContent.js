// import {
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import React, {Component} from 'react';

// export default class CustomContentContent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   async componentDidMount() {
//     axios
//       .get('http://65.0.80.5:5000/api/user/myprofile', {
//         headers: {
//           'user-token': await AsyncStorage.getItem('user-token'),
//         },
//       })
//       .then(response => {
//         console.log(response.data.data);
//       })
//       .catch(error => {
//         console.log(error.response);
//       });
//   }
//   render() {
//     return (
//       <SafeAreaView>
//         <View
//           style={{
//             flexDirection: 'row',
//             borderBottomColor: '#C8BDBD',
//             borderBottomWidth: 1,
//             height: 150,
//           }}>
//           <View style={{alignSelf: 'center'}}>
//             <TouchableOpacity>
//               {/* <Image
//                 source={require('./src/profile.png')}
//                 resizeMode="contain"
//               /> */}
//             </TouchableOpacity>
//           </View>
//           <View style={{alignSelf: 'center', marginLeft: 10}}>
//             <Text
//               style={{
//                 fontSize: 25,
//                 fontWeight: 'bold',
//                 color: 'black',
//               }}>
//               Amit Dwivedi
//             </Text>
//             <View style={{flexDirection: 'row'}}>
//               <Text style={{color: 'black'}}>amit@gmail.com</Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//                 <Icon name="edit" color="black" size={20} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//         <ScrollView>
//           <View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 borderBottomColor: '#D3D3D3',
//                 borderBottomWidth: 1,
//               }}>
//               <View style={{margin: 10}}>
//                 <Icon name="home" color="black" size={20} />
//               </View>
//               <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//                 <Text
//                   style={{
//                     fontSize: 18,
//                     color: 'black',
//                     margin: 10,
//                   }}>
//                   Home
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 borderBottomColor: '#D3D3D3',
//                 borderBottomWidth: 1,
//               }}>
//               <View style={{margin: 10}}>
//                 <Icon name="comment" color="black" size={20} />
//               </View>
//               <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
//                 <Text
//                   style={{
//                     fontSize: 18,
//                     color: 'black',
//                     margin: 10,
//                   }}>
//                   Chat
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 borderBottomColor: '#D3D3D3',
//                 borderBottomWidth: 1,
//               }}>
//               <View style={{margin: 10}}>
//                 <Icon name="check" color="black" size={20} />
//               </View>
//               <TouchableOpacity onPress={() => navigation.navigate('Kyc')}>
//                 <Text
//                   style={{
//                     fontSize: 18,
//                     color: 'black',
//                     margin: 10,
//                   }}>
//                   Kyc Form
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 borderBottomColor: '#D3D3D3',
//                 borderBottomWidth: 1,
//               }}>
//               <View style={{margin: 10}}>
//                 <Icon name="user" color="black" size={20} />
//               </View>
//               <TouchableOpacity onPress={() => navigation.navigate('About')}>
//                 <Text
//                   style={{
//                     fontSize: 18,
//                     color: 'black',
//                     margin: 10,
//                   }}>
//                   About Us
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 borderBottomColor: '#D3D3D3',
//                 borderBottomWidth: 1,
//               }}>
//               <View style={{margin: 10}}>
//                 <Icon name="info" color="black" size={20} />
//               </View>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('TermsScreen')}>
//                 <Text
//                   style={{
//                     fontSize: 18,
//                     color: 'black',
//                     margin: 10,
//                   }}>
//                   Terms & Conditions
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 borderBottomColor: '#D3D3D3',
//                 borderBottomWidth: 1,
//               }}>
//               <View style={{margin: 10}}>
//                 <Icon name="phone" color="black" size={20} />
//               </View>
//               <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
//                 <Text
//                   style={{
//                     fontSize: 18,
//                     color: 'black',
//                     margin: 10,
//                   }}>
//                   Contact Us
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//         <View
//           style={{
//             flexDirection: 'row',
//             borderBottomColor: '#D3D3D3',
//             borderBottomWidth: 1,
//           }}>
//           <View style={{margin: 10}}>
//             <Icon name="users" color="black" size={20} />
//           </View>
//           <TouchableOpacity onPress={() => navigation.navigate('Membership')}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 color: 'black',
//                 margin: 10,
//               }}>
//               Membership
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             borderBottomColor: '#D3D3D3',
//             borderBottomWidth: 1,
//           }}>
//           <View style={{margin: 10}}>
//             <Icon name="money" color="black" size={20} />
//           </View>
//           <TouchableOpacity onPress={() => navigation.navigate('InviteScreen')}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 color: 'black',
//                 margin: 10,
//               }}>
//               Reference & earn
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             borderBottomColor: '#D3D3D3',
//             borderBottomWidth: 1,
//           }}>
//           <View style={{margin: 10}}>
//             <Icon name="power-off" color="black" size={20} />
//           </View>
//           <TouchableOpacity
//             onPress={async () => {
//               navigation.closeDrawer();
//               //navigation.dispatch(StackActions.push('Login'));
//               console.log('<<<<<<<<<<<');
//               navigation.reset({
//                 index: 0,
//                 routes: [{name: 'Login'}],
//               });
//               // navigation.replace('Login');
//               console.log('>>>>>>>>>>>');
//               await AsyncStorage.removeItem('user-token');
//             }}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 color: 'black',
//                 margin: 10,
//               }}>
//               Logout
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }
