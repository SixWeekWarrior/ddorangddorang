import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NavBar from '../../../components/atoms/navbar';
import Onboarding from '../../../components/pages/onboarding';
import Enter from '../../../components/pages/enter';
import EnterWait from '../enterWait';
import BeforeStart from '../beforeStart';
import MakeRoom from '../makeRoom';
import WaitList from '../waitList';
import MyGroup from '../myGroup';
import MissionToday from '../missionToday';
import {GoMission} from '../goMission';

const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NavBar">
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
          name="NavBar"
          component={NavBar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WaitList"
          component={WaitList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyGroup"
          component={MyGroup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MissionToday"
          component={MissionToday}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GoMission"
          component={GoMission}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
