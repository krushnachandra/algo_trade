import * as React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrdersStackNavigator from '../../src/navigation/OrdersStackNavigator';
import PortfolioStackNavigator from '../../src/navigation/PortfolioStackNavigator';
import WatchlistStackNavigator from '../../src/navigation/WatchlistStackNavigator';
import {AppParamList} from '../AppParamList';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<AppParamList>();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Orders" component={OrdersStackNavigator} />
      <Tab.Screen name="Portfolio" component={PortfolioStackNavigator} />
      <Tab.Screen name="Watchlist" component={WatchlistStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
