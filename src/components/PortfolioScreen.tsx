import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {AsyncStorage} from 'react-native';

export function PortfolioScreen({route, navigation}: any) {
  const totalProfitAndLoss = 0;
  const now = new Date().getHours();
  console.log('current time --', now);

  useFocusEffect(() => {
    getPortfolio();
  });

  const getPortfolio = async () => {
    var token = await AsyncStorage.getItem('token');
    //console.log('var token --', token);
    axios.defaults.withCredentials = true;
    axios({
      method: 'post',
      url: 'https://Openapi.5paisa.com/VendorsAPI/Service1.svc/V1/NetPositionNetWise',
      data: {
        body: {
          ClientCode: '56565401',
        },
        head: {
          appName: '5P56159485',
          appVer: '1.0',
          key: 'Wp3fKXyAsRbsL8EpgL5TjVjNOhxt5PuD',
          osName: 'WEB',
          requestCode: '5PNPNWV1',
          userId: 'WRREViJXizS',
          password: 'bdnGlDDXOON',
        },
      },
      headers: {
        ' Authorization': 'Bearer' + token,
        'Content-Type': 'application/json',
        Cookie: '5paisacookie=2xdsi3bn2ulhjqerlo3qw0j4',
      },
    })
      .then(function (response) {
        let getNetPosition = response.data.body.NetPositionDetail;
        console.log(
          'Portfolio response is',
          response.data.body.NetPositionDetail,
        );

        //  this.totalProfitAndLoss +=
        //    element.netQty * (element.ltp - element.buyAvgRate) +
        //    element.bookedPL;

        //  getNetPosition.forEach(element => {
        //     let stopLossRate: number;
        //     this.pendingOrders = JSON.parse(localStorage.getItem("pending_Orders"));
        //     if(this.pendingOrders.length > 0){
        //       this.OrderToBeModify =this.pendingOrders.find(x=>x.scripCode == element.scripCode);
        //       if(this.OrderToBeModify != undefined){
        //       stopLossRate = this.OrderToBeModify.slTriggerRate;
        //       }
        //       else {
        //           stopLossRate=0;
        //       }
        //     }
        //   })
      })
      .catch(function (error) {
        console.log('error is', error);
      });
  };
  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20}}>Portfolio screen</Text>
      </View>
    </>
  );
}
