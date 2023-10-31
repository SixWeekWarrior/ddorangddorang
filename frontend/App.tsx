import {StatusBar, useColorScheme} from 'react-native';
import {RecoilRoot} from 'recoil';
import StackNavigation from './src/components/pages/navigation/StackNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RecoilRoot>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <StackNavigation />
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}
export default App;
