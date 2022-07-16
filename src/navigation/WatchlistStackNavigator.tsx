import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WatchlistScreen} from '../../src/components/WatchlistScreen';
import {WatchlistDetailsScreen} from '../components/WatchlistDetailsScreen';

const WatchlistStack = createNativeStackNavigator();
const WatchlistStackNavigator: React.FC = () => {
  return (
    <WatchlistStack.Navigator>
      <WatchlistStack.Screen name=" Watchlist" component={WatchlistScreen} />
      <WatchlistStack.Screen
        name="WatchlistDetails"
        component={WatchlistDetailsScreen}
      />
    </WatchlistStack.Navigator>
  );
};

export default WatchlistStackNavigator;