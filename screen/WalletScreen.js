import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
  Button,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import NotifyHeader from './header/NotifyHeader';

export default function WalletScreen({navigation}) {
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [inrModal, setInrModal] = useState(false);
  const [usdtModal, setUsdtModal] = useState(false);
  const [wamount, setWamount] = useState({});
  const [inr, setInr] = useState('');
  const [usd, setUsd] = useState('');
  const [screenshot, setScreenshot] = useState('');
  const [screenshootTwo, setScreenshootTwo] = useState('');

  const pullMe = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 4000);
  };

  const getWallet = async () => {
    axios
      .get('http://65.0.80.5:5000/api/admin/wallet_amount', {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        const wamount = response.data.data;
        setWamount(wamount);
        console.log(wamount);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (AsyncStorage.getItem('user-token')) {
      getWallet();
    }
  }, []);

  // <=============== Post Api ==============>

  const addAmount = async () => {
    console.log(inr, usd, screenshot);
    const data = new FormData();
    data.append('inr', parseInt(inr));
    data.append('usd', 0);
    data.append('screenshot', screenshot);
    axios
      .post(`http://65.0.80.5:5000/api/admin/req_amount`, data, {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        console.log(response.data.data);
        console.log(response.data.msg);
        {
          response.data.message == 'success' &&
          response.data.message === 'success'
            ? Alert.alert('Request Send Successfully , Wait for Confirmation')
            : null;
        }
        setInr('');
        screenshot('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // <================Add USD ================>
  const addAmountUsd = async usd => {
    console.log(usd, inr);
    axios
      .post(
        `http://65.0.80.5:5000/api/admin/req_amount`,
        {
          usd: parseInt(usd),
          inr: 0,
        },
        {
          headers: {
            'user-token': await AsyncStorage.getItem('user-token'),
          },
        },
      )
      .then(response => {
        console.log(response.data);
        console.log(response.data.message);
        {
          response.data.message == 'success' &&
          response.data.message === 'success'
            ? Alert.alert('Request Send Successfully , Wait for Confirmation')
            : null;
        }
        setUsd('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalTwo = () => {
    setIsModal(!isModal);
  };
  const toggleModalThree = () => {
    setInrModal(!inrModal);
  };
  const toggleModalFour = () => {
    setUsdtModal(!usdtModal);
  };

  const chooseFrontFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 80,
      maxHeight: 80,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      setScreenshot(response.assets[0].uri);
      console.log(response.assets[0].uri);
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
    });
  };

  const chooseScreenShot = type => {
    let options = {
      mediaType: type,
      maxWidth: 80,
      maxHeight: 80,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      setScreenshootTwo(response.assets[0].uri);
      console.log(response.assets[0].uri);
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
    });
  };

  const myModal = () => {};
  const abcd = () => {
    Alert.alert('sdsdsdsdsdsdsd');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <CustomHeader title="WALLET" navigation={navigation} /> */}
        <NotifyHeader title="WALLET" navigation={navigation} />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }>
        <SafeAreaView>
          <View style={styles.wallet}>
            <View style={styles.wTitle}>
              <Text style={styles.wText}>Wallet Balance</Text>
            </View>
            <View style={styles.wallTitle}>
              <Text style={styles.wText}>${wamount?.amount}</Text>
            </View>
          </View>
          {/* <================ Add Button INR =================> */}
          <View style={styles.buttonArea}>
            <View style={styles.wTitle}>
              <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                <Text style={styles.addText}>DEPOSIT INR</Text>
              </TouchableOpacity>
              <Modal isVisible={isModalVisible}>
                <View style={styles.modalIcon}>
                  <TouchableOpacity
                    style={styles.closeTouch}
                    onPress={toggleModal}>
                    <Text style={styles.closeText}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.mainModal}>
                  <View style={styles.modelHead}>
                    <Text style={styles.modalText}>INR</Text>
                    <Text style={styles.modalText}>
                      Please Deposite INR to mentioned UPI-ID
                    </Text>
                    <Text style={styles.paymentID}>
                      UPI ID - 919524853258@federal
                    </Text>
                    <Text style={styles.modalText1}>
                      Enter Amount To Recharge
                    </Text>
                  </View>
                  <View style={styles.inputArea}>
                    <Text style={styles.inputText}>Enter Amount</Text>
                    <TextInput
                      placeholder="Enter Amount"
                      keyboardType="number-pad"
                      style={styles.modalField}
                      onChangeText={inr => setInr(inr)}
                      value={inr}
                    />
                  </View>
                  <View style={styles.inputImage}>
                    <Text style={styles.inputText}>Attach ScreenShot</Text>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={styles.form}
                        onPress={() => chooseFrontFile('photo')}>
                        <Image
                          style={styles.capture}
                          source={require('../src/upload.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.form}>
                        <Image
                          source={{uri: `${screenshot}`}}
                          style={{
                            height: 200,
                            width: 60,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            flex: 1,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.modalBtn}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={addAmount}>
                      <Text style={styles.addText}>REQUEST</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            {/* <================ Add Button USDT =================> */}
            <View style={styles.wallTitle}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={toggleModalTwo}>
                <Text style={styles.addText}>DEPOSIT USDT</Text>
              </TouchableOpacity>
              <Modal isVisible={isModal}>
                <View style={styles.modalIcon}>
                  <TouchableOpacity
                    style={styles.closeTouch}
                    onPress={toggleModalTwo}>
                    <Text style={styles.closeText}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.mainModal}>
                  <View style={styles.modelHead}>
                    <Text style={styles.modalText}>USDT</Text>
                    <Text style={styles.modalText}>
                      Please Deposite USDT to mentioned Wallet-ID
                    </Text>
                    <Text style={styles.paymentID}>
                      0x4e9Db7309bf6468AaE65ad72D62c1747d6bB957A
                    </Text>
                    <Text style={styles.modalText1}>
                      Enter Amount To Recharge
                    </Text>
                  </View>
                  <View style={styles.inputArea}>
                    <Text style={styles.inputText}>Enter Amount</Text>
                    <TextInput
                      placeholder="Enter Amount"
                      keyboardType="number-pad"
                      style={styles.modalField}
                      onChangeText={usd => setUsd(usd)}
                      value={usd}
                    />
                  </View>
                  <View style={styles.inputImage}>
                    <Text style={styles.inputText}>Attach ScreenShot</Text>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={styles.form}
                        onPress={() => chooseScreenShot('photo')}>
                        <Image
                          style={styles.capture}
                          source={require('../src/upload.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.form}>
                        <Image
                          source={{uri: `${screenshootTwo}`}}
                          style={{
                            height: 200,
                            width: 60,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            flex: 1,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.modalBtn}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addAmountUsd(usd)}>
                      <Text style={styles.addText}>REQUEST</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          {/* <================ Withdraw Button INR =================> */}
          <View style={styles.buttonArea}>
            <View style={styles.wTitle}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={toggleModalThree}>
                <Text style={styles.addText}>WITHDRAW INR</Text>
              </TouchableOpacity>
              <Modal isVisible={inrModal}>
                <View style={styles.modalIcon}>
                  <TouchableOpacity
                    style={styles.closeTouch}
                    onPress={toggleModalThree}>
                    <Text style={styles.closeText}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.mainModal}>
                  <View style={styles.modelHead}>
                    <Text style={styles.modalText}>INR</Text>
                    <Text style={styles.modalText1}>
                      Enter INR Amount To Withdraw
                    </Text>
                  </View>
                  <View style={styles.inputArea}>
                    <Text style={styles.inputText}>Enter UPI ID</Text>
                    <TextInput
                      // textContentType="number"
                      placeholder="Enter Amount"
                      keyboardType="ascii-capable"
                      style={styles.modalField}
                      onChangeText={usd => setUsd(usd)}
                      value={usd}
                    />
                  </View>
                  <View style={styles.inputArea}>
                    <Text style={styles.inputText}>Amount</Text>
                    <TextInput
                      // textContentType="number"
                      placeholder="Enter Amount"
                      keyboardType="number-pad"
                      style={styles.modalField}
                      onChangeText={usd => setUsd(usd)}
                      value={usd}
                    />
                  </View>
                  <View style={styles.modalBtn}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={e => addAmount(inr)}>
                      <Text style={styles.addText}>REQUEST</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            {/* <================ Withdraw Button USDT =================> */}
            <View style={styles.wallTitle}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={toggleModalFour}>
                <Text style={styles.addText}>WITHDRAW USDT</Text>
              </TouchableOpacity>
              <Modal isVisible={usdtModal}>
                <View style={styles.modalIcon}>
                  <TouchableOpacity
                    style={styles.closeTouch}
                    onPress={toggleModalFour}>
                    <Text style={styles.closeText}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.mainModal}>
                  <View style={styles.modelHead}>
                    <Text style={styles.modalText}>USDT</Text>
                    <Text style={styles.modalText1}>
                      Enter USDT Amount To WithDraw
                    </Text>
                  </View>
                  <View style={styles.inputArea}>
                    <Text style={styles.inputText}>Enter Crypto Wallet ID</Text>
                    <TextInput
                      // textContentType="number"
                      placeholder="Enter Amount"
                      keyboardType="number-pad"
                      style={styles.modalField}
                      onChangeText={usd => setUsd(usd)}
                      value={usd}
                    />
                  </View>

                  <View style={styles.inputArea}>
                    <Text style={styles.inputText}>Amount</Text>
                    <TextInput
                      // textContentType="number"
                      placeholder="Enter Amount"
                      keyboardType="number-pad"
                      style={styles.modalField}
                      onChangeText={usd => setUsd(usd)}
                      value={usd}
                    />
                  </View>
                  <View style={styles.modalBtn}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addAmountUsd(usd)}>
                      <Text style={styles.addText}>REQUEST</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          <View style={styles.wall}>
                      <View>
                        <Text style={styles.txt}>Deposit</Text>
                        <Text style={styles.txt1}>1. Make Manual Deposit to mentioned UPI - Id</Text>
                        <Text style={styles.txt1}>2. Take a screenshot upload it and submit</Text>
                        <Text style={styles.txt1}>3. After verification funds will Deposit in you WALLET</Text>
                        <Text style={styles.txt}>Withdraw</Text>
                        <Text style={styles.txt1}>1. Minimum withdraw is 10$</Text>
                        <Text style={styles.txt1}>2. Requested fund will be transferred within 24hrs from the requested time</Text>
                      </View>
              </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputView: {
    width: '100%',
    height: 50,
    backgroundColor: '#f1f3f6',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wallet: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#800080',
    height: 100,
  },
  wTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#8C0000',
    padding: 15,
    borderRadius: 10,
  },
  addText: {
    color: 'white',
    fontWeight: '700',
  },
  closeTouch: {
    backgroundColor: 'red',
    padding: 8,
    margin: 1,
  },
  closeText: {
    color: 'white',
    fontWeight: '700',
  },
  wallTitle: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  wText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'monospace',
  },
  buttonArea: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
  },
  wall:{
    justifyContent:'center',
    alignSelf:'center',
    borderWidth:1,
    backgroundColor:'white',
    height:300,
    width:320,
  },
  txt:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'600',
    color:'#8C0000',
    marginBottom:10,
  },
  txt1:{
    color:'black',
    fontSize:15,
    fontWeight:'600',
    marginBottom:5,
    marginLeft:5,
  },
  mainModal: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalIcon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modelHead: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 20,
  },
  paymentID: {
    color: 'black',
    fontSize: 15,
    fontWeight: '700',
    margin: 2,
    marginBottom: 20,
    backgroundColor: 'yellow',
    padding: 5,
  },
  modalText1: {
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
  },
  inputArea: {
    marginBottom: 10,
  },
  inputText: {
    color: 'black',
  },
  modalField: {
    borderRadius: 15,
    borderWidth: 1,
    width: 250,
    borderColor: 'black',
    color: 'black',
  },
  modalBtn: {
    margin: 15,
  },
  form: {
    backgroundColor: 'white',
    height: 120,
    width: 140,
    margin: 2,
  },
  capture: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});

// function PtmHeader({title, navigation}) {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         height: 50,
//         backgroundColor: 'white',
//         marginBottom: 5,
//       }}>
//       <View style={{flex: 2, justifyContent: 'center'}}>
//         <TouchableOpacity>
//           <Text
//             style={{
//               color: 'black',
//               fontWeight: 'bold',
//               fontSize: 17,
//               alignSelf: 'center',
//             }}>
//             Recents
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <View style={{flex: 4, justifyContent: 'center'}}>
//         <Text
//           style={{
//             textAlign: 'center',
//             fontWeight: '800',
//             fontSize: 20,
//           }}>
//           {title}
//         </Text>
//       </View>
//       <View style={{flex: 2, justifyContent: 'center'}}>
//         <TouchableOpacity style={{flexDirection: 'row'}}>
//           <Text
//             style={{
//               color: 'black',
//               fontWeight: '500',
//               fontSize: 15,
//               alignSelf: 'center',
//               marginLeft: 20,
//             }}>
//             Filter
//           </Text>
//           <Image
//             style={{
//               width: 20,
//               height: 20,
//             }}
//             source={require('../src/filter.png')}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

/* <View>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            marginLeft: 10,
            fontSize: 20,
            paddingVertical: 10,
          }}>
          Available Balance
        </Text>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            marginLeft: 10,
            fontSize: 25,
          }}>
          4.00
        </Text>
      </View> */

/* <View style={{paddingVertical: 15}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Deposit')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 20,
            }}
            source={require('../src/icons8-money-50.png')}
            resizeMode="contain"
          />
          <Text style={{color: '#9FA4FB', fontSize: 17, fontWeight: '500'}}>
            Deposit to Wallet
          </Text>
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 20,
            }}
            source={require('../src/icons8-forward-60.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Deposit')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 20,
            }}
            source={require('../src/icons8-bank-64.png')}
            resizeMode="contain"
          />
          <Text style={{color: '#9FA4FB', fontSize: 17, fontWeight: '500'}}>
            {' '}
            Send money to Bank
          </Text>
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 20,
            }}
            source={require('../src/icons8-forward-60.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpiIdScreen')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 20,
            }}
            source={require('../src/upi.png')}
            resizeMode="contain"
          />
          <Text style={{color: '#9FA4FB', fontSize: 17, fontWeight: '500'}}>
            {' '}
            Enter UPI ID
          </Text>
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 20,
            }}
            source={require('../src/icons8-forward-60.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CryptoScreen')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 20,
            }}
            source={require('../src/cryptocurrency.png')}
            resizeMode="contain"
          />
          <Text style={{color: '#9FA4FB', fontSize: 17, fontWeight: '500'}}>
            {' '}
            Enter Crypto ID
          </Text>
          <Image
            style={{
              width: 30,
              height: 30,
              marginLeft: 20,
            }}
            source={require('../src/icons8-forward-60.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View> */
