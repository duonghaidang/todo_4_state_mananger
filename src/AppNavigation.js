import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Input from './components/screens/Input';
import List from './components/screens/List';
import {ROUTE_KEYS} from './utils/route_keys';
import React from 'react';
import Search from './components/screens/Search';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTE_KEYS.LIST} component={List} />
      <Tab.Screen name={ROUTE_KEYS.INPUT} component={Input} />
    </Tab.Navigator>
  );
}

export default function AppNavigation(props) {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ROUTE_KEYS.List}>
      {/* <Stack.Screen name={ROUTE_KEYS.DASHBOARD} component={BottomTabs} /> */}
      <Tab.Screen name={ROUTE_KEYS.LIST} component={List} />
      <Tab.Screen name={ROUTE_KEYS.INPUT} component={Input} />
      <Tab.Screen name={ROUTE_KEYS.SEARCH} component={Search} />
    </Stack.Navigator>
  );
}
