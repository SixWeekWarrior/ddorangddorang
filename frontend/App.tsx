import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import NavBar from './src/components/atoms/navbar';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // function MyTabBar({state, descriptors, navigation}) {
  //   return (
  //     <View style={{flexDirection: 'row'}}>
  //       {state.routes.map((route, index, key) => {
  //         const {options} = descriptors[route.key];
  //         const label =
  //           options.tabBarLabel !== undefined
  //             ? options.tabBarLabel
  //             : options.title !== undefined
  //             ? options.title
  //             : route.name;

  //         const isFocused = state.index === index;

  //         const onPress = () => {
  //           const event = navigation.emit({
  //             type: 'tabPress',
  //             target: route.key,
  //           });

  //           if (!isFocused && !event.defaultPrevented) {
  //             navigation.navigate(route.name);
  //           }
  //         };

  //         const onLongPress = () => {
  //           navigation.emit({
  //             type: 'tabLongPress',
  //             target: route.key,
  //           });
  //         };

  //         return (
  //           <TouchableOpacity
  //             accessibilityRole="button"
  //             accessibilityState={isFocused ? {selected: true} : {}}
  //             accessibilityLabel={options.tabBarAccessibilityLabel}
  //             testID={options.tabBarTestID}
  //             onPress={onPress}
  //             onLongPress={onLongPress}
  //             style={{flex: 1, backgroundColor: '#ffffff'}}>
  //             <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
  //               {label}
  //             </Text>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );
  // }

  return (
    <RecoilRoot>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="OnBoarding"
            component={Onboarding}
            options={{
              headerShown: false,
              // tabBarLabel: 'Updates',
              // tabBarIcon: ({color, size}) => (
              //   <MaterialCommunityIcons name="bell" color={color} size={size} />
              // ),
              // tabBarBadge: 3,
            }}
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
