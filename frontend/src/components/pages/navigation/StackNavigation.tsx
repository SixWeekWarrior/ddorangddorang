import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NavBar from '../../../components/atoms/navbar';
import Onboarding from '../../../components/pages/onboarding';
import Enter from '../../../components/pages/enter';
import EnterWait from '../enterWait';
import BeforeStart from '../beforeStart';
import MakeRoom from '../makeRoom';
import Home from '../home';
import WaitList from '../waitList';

const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Enter"
          component={Enter}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MakeRoom"
          component={MakeRoom}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EnterWait"
          component={EnterWait}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BeforeStart"
          component={BeforeStart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WaitList"
          component={WaitList}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
