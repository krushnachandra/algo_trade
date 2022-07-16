import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PortfolioScreen} from '../../src/components/PortfolioScreen';

const PortfolioStack = createNativeStackNavigator();
const PortfolioStackNavigator: React.FC = () => {
  return (
    <PortfolioStack.Navigator>
      <PortfolioStack.Screen name=" Portfolio" component={PortfolioScreen} />
    </PortfolioStack.Navigator>
  );
};

export default PortfolioStackNavigator;
