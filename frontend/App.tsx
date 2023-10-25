import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ColorTest from './src/components/pages/colorTest/index';
// import Onboarding from './src/components/pages/onboarding/index';
// import EnterWait from './src/components/pages/enterWait/index';
// import Enter from './src/components/pages/enter';
import MyPage from './src/components/pages/myPage';
// import MakeRoom from './src/components/pages/makeRoom';
// import WaitList from './src/components/pages/waitList';
// import MakeComplete from './src/components/pages/makeComplete';
const Stack = createStackNavigator();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <RecoilRoot>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <NavigationContainer>
        {/* <ColorTest /> */}
        <Stack.Navigator initialRouteName="ColorTest">
          {/* <Onboarding /> */}
          {/* <ColorTest /> */}
          {/* <EnterWait /> */}
          {/* <Enter /> */}
          {/* <MyPage /> */}
          {/* <MakeRoom /> */}
          {/* <WaitList /> */}
          {/* <MakeComplete /> */}
          <Stack.Screen name="ColorTest" component={ColorTest} />
          <Stack.Screen name="MyPage" component={MyPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
export default App;
