import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EnterWait from './src/components/pages/enterWait/index';
import Enter from './src/components/pages/enter';
import MyPage from './src/components/pages/myPage';
import Onboarding from './src/components/pages/onboarding';
import MakeRoom from './src/components/pages/makeRoom';
import WaitList from './src/components/pages/waitList';
import MakeComplete from './src/components/pages/makeComplete';
import Home from './src/components/pages/home';

const Tab = createBottomTabNavigator();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <RecoilRoot>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{headerShown: false}}
            name="OnBoarding"
            component={Onboarding}
          />
          <Tab.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
          <Tab.Screen
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
          />
          <Tab.Screen
            options={{headerShown: false}}
            name="MyPage"
            component={MyPage}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
export default App;
