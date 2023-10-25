import React, {useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import NavBar from './src/components/atoms/navbar';
// import Onboarding from './src/components/pages/onboarding';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  // const [beforeLogin, setBeforeLogin] = useState(true);
  return (
    <RecoilRoot>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        {/* {beforeLogin ? <Onboarding /> : <NavBar />} */}
        <NavBar />
      </NavigationContainer>
    </RecoilRoot>
  );
}
export default App;
