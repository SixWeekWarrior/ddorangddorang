import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../pages/home';
import MyPage from '../../pages/myPage';
import {Image, View, StyleSheet, Text} from 'react-native';
import myPageIcon from '../../../assets/icons/default/mypage.png';
import myPageSelectedIcon from '../../../assets/icons/selected/mypage.png';
import chatIcon from '../../../assets/icons/default/chat.png';
import chatSelectedIcon from '../../../assets/icons/selected/chat.png';
import homeIcon from '../../../assets/icons/default/home.png';
import homeSelectedIcon from '../../../assets/icons/selected/home.png';
import misssonIcon from '../../../assets/icons/default/mission.png';
import missonSelectedIcon from '../../../assets/icons/selected/mission.png';
import Misson from '../../pages/mission';
import GlobalStyles, {height} from '../../../styles/GlobalStyles';
import BeforeLaunch from '../../pages/beforelaunch';
import Chatting from '../../pages/chatting';

const Tab = createBottomTabNavigator();

export const NavBar = ({navigation}: {navigation: any}): JSX.Element => {
  return (
    <View style={style.navContainer}>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontFamily: GlobalStyles.nomal.fontFamily,
                  fontSize: height * 10,
                  marginTop: height * -3,
                  color: focused ? '#31B57B' : '#A8A8A8',
                }}>
                홈
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? homeSelectedIcon : homeIcon}
                style={{width: 24, height: 24}}
              />
            ),
          }}
          name="홈"
          component={Home}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontFamily: GlobalStyles.nomal.fontFamily,
                  fontSize: height * 10,
                  marginTop: height * -3,
                  color: focused ? '#31B57B' : '#A8A8A8',
                }}>
                채팅
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? chatSelectedIcon : chatIcon}
                style={{width: 24, height: 24}}
              />
            ),
          }}
          name="채팅"
          component={Chatting}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontFamily: GlobalStyles.nomal.fontFamily,
                  fontSize: height * 10,
                  marginTop: height * -3,
                  color: focused ? '#31B57B' : '#A8A8A8',
                }}>
                미션
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? missonSelectedIcon : misssonIcon}
                style={{width: 24, height: 24}}
              />
            ),
          }}
          name="미션"
          component={Misson}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontFamily: GlobalStyles.nomal.fontFamily,
                  fontSize: height * 10,
                  marginTop: height * -3,
                  color: focused ? '#31B57B' : '#A8A8A8',
                }}>
                정보
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? myPageSelectedIcon : myPageIcon}
                style={{width: 24, height: 24}}
              />
            ),
          }}
          name="정보"
          component={MyPage}
        />
      </Tab.Navigator>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.white_2.color,
    color: GlobalStyles.white_1.color,
    flex: 1,
  },
  navContainer: {flex: 1},
  containerTop: {
    backgroundColor: GlobalStyles.white_2.color,
    flexDirection: 'row',
    flex: 1,
  },

  containerBottom: {
    backgroundColor: GlobalStyles.white_2.color,
    flexDirection: 'row',
    flex: 1,
  },

  containerMid: {
    backgroundColor: GlobalStyles.white_2.color,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
    flex: 0.4,
    marginLeft: 24,
    marginRight: 24,
  },

  topLeft: {
    flex: 1.1,
  },
  topTop: {
    flex: 3,
    backgroundColor: GlobalStyles.pink.color,
    borderRadius: 20,
    marginTop: 50,
    marginLeft: 24,
  },

  topBottom: {
    flex: 1,
    resizeMode: 'contain',
    borderRadius: 20,
    marginTop: 24,
    marginBottom: 24,
    marginLeft: 24,
  },
  topMiddle: {
    flex: 0.3,
  },
  topRight: {
    flex: 1,
    marginTop: 70,
    marginLeft: 20,
    marginRight: 24,
    marginBottom: 50,
  },
  innerTop: {
    flex: 1,
    backgroundColor: GlobalStyles.blue.color,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  innerBottom: {
    flex: 1.2,
    backgroundColor: GlobalStyles.white_1.color,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLeft: {
    flex: 1.1,
  },
  bottomMiddle: {
    flex: 0.3,
  },
  bottomRight: {
    flex: 1,
    borderRadius: 20,
    height: 230,
    marginTop: 24,
    marginRight: 24,
    marginBottom: 24,
  },

  bottomTop: {
    backgroundColor: GlobalStyles.white_2.color,
    flex: 4,
    marginTop: 24,
    marginLeft: 24,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
  },

  bottomBottom: {
    backgroundColor: GlobalStyles.grey_1.color,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 20,
    marginTop: 24,
    marginLeft: 24,
    marginBottom: 60,
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  circle: {
    backgroundColor: GlobalStyles.orange.color,
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 35,
  },
  titleFont: {
    fontFamily: GlobalStyles.home_title.fontFamily,
    fontSize: GlobalStyles.home_title.fontSize,
    letterSpacing: -1,
  },
  miniFont: {
    fontFamily: 'NotoSansKR-Black',
    fontSize: 10,
    color: GlobalStyles.grey_4.color,
    marginLeft: 15,
    marginTop: 10,
  },
  tiniFont: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 9,
    color: GlobalStyles.white_2.color,
  },
  midFont: {
    fontFamily: 'NotoSansKR-Medium',
    letterSpacing: -1,
    marginLeft: 15,
    marginTop: -20,
  },
  midBoldFont: {
    fontFamily: 'NotoSansKR-Bold',
    color: GlobalStyles.white_2.color,
    verticalAlign: 'middle',
    fontSize: 16,
  },
  bigFont: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 23,
    color: GlobalStyles.white_2.color,
    marginTop: -25,
    marginLeft: 15,
  },
  numberFont: {
    fontFamily: 'NotoSansKR-Black',
    color: GlobalStyles.black.color,
    fontSize: 30,
    letterSpacing: 5,
  },
});

export default NavBar;
