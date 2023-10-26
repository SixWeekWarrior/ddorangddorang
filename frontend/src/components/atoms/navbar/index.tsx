import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Onboarding} from '../../pages/onboarding';
import Home from '../../pages/home';
import Enter from '../../pages/enter';
import WaitList from '../../pages/waitList';
import MakeRoom from '../../pages/makeRoom';
import MakeComplete from '../../pages/makeComplete';
import EnterWait from '../../pages/enterWait';
import MyPage from '../../pages/myPage';
import {Image} from 'react-native';
import myPageIcon from '../../../assets/icons/default/mypage.png';
import myPageSelectedIcon from '../../../assets/icons/selected/mypage.png';
import chatIcon from '../../../assets/icons/default/chat.png';
import chatSelectedIcon from '../../../assets/icons/selected/chat.png';
import homeIcon from '../../../assets/icons/default/home.png';
import homeSelectedIcon from '../../../assets/icons/selected/home.png';
import misssonIcon from '../../../assets/icons/default/mission.png';
import missonSelectedIcon from '../../../assets/icons/selected/mission.png';
import Chatting from '../../pages/chatting';
import Misson from '../../pages/mission';

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name="그룹"
        component={MakeRoom}
      />
      <Tab.Screen
        options={{
          headerShown: false,
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
      {/* <Tab.Screen
        options={{headerShown: false}}
        name="Enter"
        component={Enter}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="MakeRoom"
        component={MakeRoom}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="MakeComplete"
        component={MakeComplete}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="WaitList"
        component={WaitList}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="EnterWait"
        component={EnterWait}
      /> */}
    </Tab.Navigator>
  );
}
