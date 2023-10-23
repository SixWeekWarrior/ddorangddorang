import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Onboarding} from '../../pages/onboarding';
import {ColorTest} from '../../pages/colorTest';

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Onboarding" component={Onboarding} />
      <Tab.Screen name="Settings" component={ColorTest} />
    </Tab.Navigator>
  );
}
