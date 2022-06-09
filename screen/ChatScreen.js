import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Swiper from 'react-native-swiper';
import {Icon} from 'react-native-elements';

export default function ChatScreen({navigation}) {
  const [stories, setStories] = useState([
    // {
    //   userImage: 'https://randomuser.me/api/portraits/men/60.jpg',
    //   userName: 'Brayden Willis',
    //   storyImage:
    //     'https://images.pexels.com/photos/4726898/pexels-photo-4726898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //   isSeen: false,
    // },
    // {
    //   userImage: 'https://randomuser.me/api/portraits/women/81.jpg',
    //   userName: 'Sophie Price',
    //   storyImage:
    //     'https://images.pexels.com/photos/5257534/pexels-photo-5257534.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //   isSeen: false,
    // },
    // {
    //   userImage: 'https://randomuser.me/api/portraits/men/79.jpg',
    //   userName: 'Rick Perry',
    //   storyImage:
    //     'https://images.pexels.com/photos/3380805/pexels-photo-3380805.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //   isSeen: false,
    // },
    // {
    //   userImage: 'https://randomuser.me/api/portraits/men/85.jpg',
    //   userName: 'Dave Pena',
    //   storyImage:
    //     'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //   isSeen: false,
    // },
    // {
    //   userImage: 'https://randomuser.me/api/portraits/women/74.jpg',
    //   userName: 'Layla Kennedy',
    //   storyImage:
    //     'https://images.pexels.com/photos/33287/dog-viszla-close.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //   isSeen: false,
    // },
  ]);

  const [messages, setMessages] = useState([
    {
      userImage: 'https://randomuser.me/api/portraits/women/79.jpg',
      userName: 'Alma Carpenter',
      message: {
        sender: 'Alma Carpenter',
        text: 'Hello',
        seenByYou: true,
        seenByUser: true,
      },
      isTyping: true,
      time: 'now',
    },
    {
      userImage: 'https://randomuser.me/api/portraits/women/81.jpg',
      userName: 'Sophie Price',
      message: {
        sender: 'You',
        text: 'Are you learning React Native too?',
        seenByYou: true,
        seenByUser: false,
      },
      time: '03:32 PM',
    },
    {
      userImage: 'https://randomuser.me/api/portraits/men/33.jpg',
      userName: 'Jessie Collins',
      message: {
        sender: 'You',
        text: 'Bye!',
        seenByYou: true,
        seenByUser: true,
      },
      time: '01:40 PM',
    },
    {
      userImage: 'https://randomuser.me/api/portraits/men/85.jpg',
      userName: 'Clinton Meyer',
      message: {
        sender: 'Clinton Meyer',
        text: 'Let me know, what you think?',
        seenByYou: false,
        seenByUser: false,
      },
      time: '10:37 AM',
    },
    {
      userImage: 'https://randomuser.me/api/portraits/men/60.jpg',
      userName: 'Brayden Willis',
      message: {
        sender: 'Brayden Willis',
        text: 'Okay, will share it with you by Friday.',
        seenByYou: true,
        seenByUser: true,
      },
      time: 'Yesterday',
    },
    {
      userImage: 'https://randomuser.me/api/portraits/men/47.jpg',
      userName: 'Dennis Brown',
      message: {
        sender: 'Dennis Brown',
        text: 'Sure, talk to you later.',
        seenByYou: true,
        seenByUser: true,
      },
      time: '3 days ago',
    },
    {
      userImage: 'https://randomuser.me/api/portraits/women/21.jpg',
      userName: 'Dolores Bell',
      message: {
        sender: 'You',
        text: 'Thanks!',
        seenByYou: true,
        seenByUser: true,
      },
      time: '4 days ago',
    },
    {
      userImage: 'https://randomuser.me/api/portraits/men/54.jpg',
      userName: 'Everett Green',
      message: {
        sender: 'Everett Green',
        text: 'I am not sure about that.',
        seenByYou: true,
        seenByUser: true,
      },
      time: 'one month ago',
    },
  ]);

  const [currentStoryView, setCurrentStoryView] = useState(stories);
  const [storyModalVisible, setStoryModalVisible] = useState(false);

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
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              style={{width: 35, height: 35, marginLeft: 20}}
              source={require('../src/back.png')}
              resizeMode="contain"
            />
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
            <Icon name="bell" type="font-awesome" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <CustomHeader title="Chat" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stories */}
        <View style={[styles.storiesView]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* <View style={{marginLeft: 10, alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.storyContentView}></TouchableOpacity>
              <View style={{marginTop: -20, alignItems: 'center'}}>
                <Image
                  style={styles.storyUserImage}
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/86.jpg',
                  }}
                />
                <Text style={{marginTop: 4, fontFamily: 'NSLight'}}>
                  Your Story
                </Text>
              </View>
            </View> */}
            {/* Other User Stories */}
            {stories.map((story, i) => (
              <View style={{marginLeft: 10, alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.storyContentView}
                  onPress={() => {
                    let newStories = stories.map((s, index) => {
                      if (i === index) {
                        return {...s, isSeen: true};
                      }
                      return {...s};
                    });
                    setStories(newStories);
                    setCurrentStoryView(stories.slice(i));
                    setStoryModalVisible(true);
                  }}>
                  <Image
                    style={{
                      width: 90,
                      height: 130,
                      borderRadius: 10,
                      opacity: story.isSeen ? 0.5 : 1,
                    }}
                    source={{
                      uri: story.storyImage,
                    }}
                  />
                </TouchableOpacity>
                <View style={{marginTop: -20, alignItems: 'center'}}>
                  <Image
                    style={styles.storyUserImage}
                    source={{
                      uri: story.userImage,
                    }}
                  />
                  <Text style={{marginTop: 4, fontFamily: 'NSLight'}}>
                    {story.userName}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* Chats View */}
        <View style={{flex: 1}}>
          {messages.map(chat => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Messaging')}
              style={{
                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fafafa',
                borderBottomWidth: 1,
                borderBottomColor: '#dfe4ea',
              }}
              onLongPress={() => {
                Alert.alert(
                  'Delete Chat?',
                  `Do you want to delete ${chat.userName}'s chats?`,
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        let newChats = messages.filter(
                          m => m.userName !== chat.userName,
                        );
                        setMessages(newChats);
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <TouchableOpacity
                onPress={() => {
                  let chatStory = stories.filter(
                    story => story.userName === chat.userName,
                  );
                  if (chatStory.length > 0) {
                    setCurrentStoryView(chatStory);
                    setStoryModalVisible(true);
                  }
                }}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    borderWidth:
                      stories.filter(story => story.userName === chat.userName)
                        .length > 0
                        ? 4
                        : null,
                    borderColor:
                      stories.filter(story => story.userName === chat.userName)
                        .length > 0
                        ? '#3c40c6'
                        : null,
                  }}
                  source={{
                    uri: chat.userImage,
                  }}
                />
              </TouchableOpacity>
              <View style={{flex: 1, paddingHorizontal: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'NSBold',
                      fontSize: 18,
                      color: 'black',
                    }}>
                    {chat.userName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'NSRegular',
                      fontSize: 14,
                      color: '#7B78E8',
                    }}>
                    {chat.time}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  {chat.isTyping ? (
                    <Text
                      style={{
                        fontFamily: 'NSRegular',
                        color: 'green',
                        fontSize: 16,
                      }}>
                      typing...
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#868B8C',
                        fontFamily:
                          chat.message.sender !== 'You'
                            ? chat.message.seenByYou
                              ? 'NSRegular'
                              : 'NSBold'
                            : 'NSRegular',
                        fontSize: 16,
                      }}>
                      {chat.message.text}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{height: 20}}></View>
        {/* Story Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={storyModalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1,
                  backgroundColor: 'rgba(51, 51, 51, 0.3)',
                  borderRadius: 100,
                  padding: 2,
                }}
                onPress={() => {
                  setStoryModalVisible(false);
                }}></TouchableOpacity>
              <Swiper
                showsButtons={true}
                style={{height: '100%'}}
                loop={false}
                showsPagination={false}>
                {currentStoryView.map(story => (
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 2,
                        bottom: 10,
                        left: 10,
                        backgroundColor: 'rgba(51, 51, 51, 0.3)',
                        padding: 10,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.storyUserImage}
                        source={{uri: story.userImage}}
                      />
                      <Text
                        style={{
                          color: '#fff',
                          marginLeft: 10,
                          fontSize: 16,
                          fontFamily: 'NSBold',
                        }}>
                        {story.userName}
                      </Text>
                    </View>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      source={{uri: story.storyImage}}
                    />
                  </View>
                ))}
              </Swiper>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  storiesView: {
    paddingVertical: 10,
    paddingRight: 10,
    backgroundColor: '#fafafa',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  storyContentView: {
    width: 90,
    height: 130,
    borderRadius: 10,
    borderColor: '#dfe4ea',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyUserImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
