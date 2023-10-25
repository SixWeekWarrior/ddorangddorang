import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import NavBar from './src/components/atoms/navbar';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <RecoilRoot>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    </RecoilRoot>
  );
}
export default App;
