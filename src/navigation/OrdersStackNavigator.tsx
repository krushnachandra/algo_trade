import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OrdersScreen} from '../components/OrdersScreen';
import {OrderDetailsScreen} from '../components/OrderDetailsScreen';

const OrdersStack = createNativeStackNavigator();
const OrdersStackNavigator: React.FC = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="Orders" component={OrdersScreen} />
      <OrdersStack.Screen name="OrderDetails" component={OrderDetailsScreen} />
    </OrdersStack.Navigator>
  );
};

export default OrdersStackNavigator;
