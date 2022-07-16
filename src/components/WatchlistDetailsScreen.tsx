import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import React, {FC, useEffect, useState} from 'react';
import {View, Button, Text, StyleSheet, Platform} from 'react-native';
import {AsyncStorage} from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

export function WatchlistDetailsScreen({route, navigation}: any) {
  //   const {item} = route.params;
  console.log('watchlist item --', route.params.item);
  // const FusionCharts: any = require('react-native-fusioncharts');
  var stopLossPrice, price;
  const dataSource = {
    chart: {
      caption: 'Recommended Portfolio Split',
      subCaption: 'For a net-worth of $1M',
      showValues: '1',
      showPercentInTooltip: '0',
      numberPrefix: '$',
      enableMultiSlicing: '1',
      theme: 'fusion',
    },
    data: [
      {
        label: 'Equity',
        value: '300000',
      },
      {
        label: 'Debt',
        value: '230000',
      },
      {
        label: 'Bullion',
        value: '180000',
      },
      {
        label: 'Real-estate',
        value: '270000',
      },
      {
        label: 'Insurance',
        value: '20000',
      },
    ],
  };

  const path = Platform.select({
    // Specify fusioncharts.html file location
    android: {uri: 'file:///android_asset/fusioncharts.html'},
    ios: require('../../assets/fusioncharts.html'),
  });

  function onBuyClick() {
    price = price - 0.5 / 100;
    stopLossPrice = price - (2 * 0.5) / 100;
    getOrderRequestData('Buy');
  }

  function onSellClick() {
    price = price + 0.5 / 100;
    getOrderRequestData('Sell');
  }

  const getOrderRequestData = async (orderType: string) => {
    var token = await AsyncStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios({
      method: 'post',
      url: 'https://Openapi.5paisa.com/VendorsAPI/Service1.svc/V1/OrderRequest',
      headers: {
        Authorization: 'Bearer' + token,
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
          OrderType: orderType,
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
        if (res.ExchOrderID.length) {
          alert('buy order placed');
          price = price + 0.5 / 100;
          getOrderRequestData('Sell');
        }
        console.log('buy/sell response --', response);
      })
      .catch(function (error) {
        console.log('error is', error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>{route.params.item.Chg}</Text>
        <Text style={{fontSize: 20}}>
          Last Rate:{route.params.item.LastRate}
        </Text>
        <FusionCharts
          type="column2d"
          width="100%"
          height="400"
          dataFormat={'json'}
          dataSource={dataSource}
          libraryPath={path}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.buyContainer}>
            <Button onPress={onBuyClick} title="BUY" color="blue" />
            <Button onPress={onSellClick} title="SELL" color="red" />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    height: 200,
  },
  buyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
