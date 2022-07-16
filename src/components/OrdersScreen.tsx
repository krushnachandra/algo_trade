import {useFocusEffect} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {AuthContext} from '../AuthProvider';
import {OrderDetailsScreen} from './OrderDetailsScreen';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';

export function OrdersScreen({route, navigation}: any) {
  // const {logout} = useContext(AuthContext);
  const [ordersData, setOrdersData] = useState([]);

  function onOrderDetailsClick() {
    console.log('OrderDetails');
    navigation.push('OrderDetails');
  }

  useFocusEffect(() => {
    getOrdersListData();
  });

  const getOrdersListData = async () => {
    var token = await AsyncStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios({
      method: 'post',
      url: 'https://Openapi.5paisa.com/VendorsAPI/Service1.svc/V2/OrderBook',
      headers: {
        Authorization:
          'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjU2MTU5NDg1Iiwicm9sZSI6IkNsaWVudCIsIlN0YXRlIjoiIiwibmJmIjoxNjU3MDAzNjIxLCJleHAiOjE2NTcwNDU3OTksImlhdCI6MTY1NzAwMzYyMX0.aH_PQgZJ_k5H5KwDQntweS5ncmDROqAG4cvKXPVMNxE ',
        'Content-Type': 'application/json',
        Cookie: '5paisacookie=2xdsi3bn2ulhjqerlo3qw0j4',
      },
      data: {
        head: {
          appName: '5P56159485',
          appVer: '1.0',
          key: 'Wp3fKXyAsRbsL8EpgL5TjVjNOhxt5PuD',
          osName: 'WEB',
          requestCode: '5PNPNWV1',
          userId: 'WRREViJXizS',
          password: 'bdnGlDDXOON',
        },
        body: {ClientCode: '56159485'},
      },
    })
      .then(function (response) {
        const res = JSON.stringify(response.data.body.Data);
        console.log('orders response --', response);
      })
      .catch(function (error) {
        console.log('error is', error);
      });
  };

  const renderItem = item => (
    <View style={styles.itemPadding}>
      {/* <WatchlistItem item={item} onPress={undefined} /> */}
    </View>
  );

  return (
    <>
      <Button onPress={onOrderDetailsClick} title="Go to Orders" color="red" />
      <FlatList
        data={ordersData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListPadding}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  textStyle: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  flatListPadding: {
    paddingTop: 8,
  },
  itemPadding: {
    paddingBottom: 8,
  },
});
