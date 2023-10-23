import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
// import ColorTest from './src/components/pages/colorTest/index';
import Onboarding from './src/components/pages/onboarding/index';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <RecoilRoot>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Onboarding />
        {/* <ColorTest /> */}
      </NavigationContainer>
    </RecoilRoot>
  );
}
export default App;
