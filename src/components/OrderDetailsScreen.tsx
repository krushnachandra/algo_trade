import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

export function OrderDetailsScreen({route, navigation}: any) {
  useEffect(() => {
    getOrdersListData();
  }, []);

  const getOrdersListData = async () => {
    var token = await AsyncStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios({
      method: 'post',
      url: 'https://Openapi.5paisa.com/VendorsAPI/Service1.svc/V1/OrderRequest',
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
          requestCode: '5POrdReq',
          userId: 'WRREViJXizS',
          password: 'bdnGlDDXOON',
        },
        body: {
          ClientCode: '56159485',
          OrderFor: 'P',
          Exchange: 'N',
          ExchangeType: 'C',
          Price: 0,
          OrderID: 0,
          OrderType: 'B',
          Qty: 10,
          OrderDateTime: '/Date(1556104184000)/',
          ScripCode: 1660,
          AtMarket: true,
          RemoteOrderID: '10001',
          ExchOrderID: 0,
          DisQty: 1,
          IsStopLossOrder: false,
          StopLossPrice: 0,
          IsVTD: false,
          IOCOrder: false,
          IsIntraday: true,
          PublicIP: '192.168.88.41',
          AHPlaced: 'N',
          ValidTillDate: '/Date(1556104184000)/',
          iOrderValidity: 0,
          TradedQty: 0,
          OrderRequesterCode: '56159485',
          AppSource: 9177,
        },
      },
    })
      .then(function (response) {
        const res = JSON.stringify(response.data.body.Data);
        console.log('Buy orders response --', response);
      })
      .catch(function (error) {
        console.log('error is', error);
      });
  };

  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title="Order Details" />
      </View>
    </>
  );
}
