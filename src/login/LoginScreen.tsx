import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {OrdersScreen} from '../components/OrdersScreen';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const LoginStack = createNativeStackNavigator();

export function LoginScreen({route, navigation}: any) {
  function onOrdersClick() {
    console.log('onOrdersClick');
    navigation.navigate(BottomTabNavigator, {
      screen: 'Orders',
    });
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={onOrdersClick} title="Login" />
    </View>
  );
}
