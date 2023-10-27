import {StatusBar, useColorScheme} from 'react-native';
import {RecoilRoot} from 'recoil';
import StackNavigation from './src/components/pages/navigation/StackNavigation';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <RecoilRoot>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StackNavigation />
    </RecoilRoot>
  );
}
export default App;
