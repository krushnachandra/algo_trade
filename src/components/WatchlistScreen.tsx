import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, FlatList} from 'react-native';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import WatchlistItem from './WatchlistItem';

interface Props {
  navigation: any;
  route: any;
}

export function WatchlistScreen({route, navigation}: any) {
  const [watchlistData, setWatchlistData] = useState([]);
  var watchlistdata;
  useEffect(() => {
    getWatchListData();
  });

  function onWatchlistDetailsClick(watchlistItem) {
    navigation.push('WatchlistDetails', watchlistItem);
  }

  const getWatchListData = async () => {
    var token = await AsyncStorage.getItem('token');
    //console.log('var token --', token);
    axios.defaults.withCredentials = true;
    axios({
      method: 'post',
      url: 'https://Openapi.5paisa.com/VendorsAPI/Service1.svc/MarketFeed',
      data: {
        head: {
          appName: '5P56159485',
          appVer: '1.0',
          key: 'Wp3fKXyAsRbsL8EpgL5TjVjNOhxt5PuD',
          osName: 'WEB',
          requestCode: '5PMF',
          userId: 'WRREViJXizS',
          password: 'bdnGlDDXOON',
        },
        body: {
          Count: 1,
          MarketFeedData: [
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'ADANIPORTS           ',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'POWERGRID',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'RELIANCE',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'SBILIFE',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'SHREECEM',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'SBIN',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'SUNPHARMA',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'TCS',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'TATACONSUM',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'TATAMOTORS',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'TATASTEEL',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'TECHM',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'TITAN',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'UPL',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'ULTRACEMCO',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
            {
              Exch: 'N',
              ExchType: 'C',
              Symbol: 'WIPRO',
              Expiry: '',
              StrikePrice: '0',
              OptionType: '',
            },
          ],
          ClientLoginType: 0,
          LastRequestTime: '/Date(0)/',
          RefreshRate: 'H',
        },
      },
      headers: {
        ' Authorization': 'Bearer' + token,
        'Content-Type': 'application/json',
        Cookie: '5paisacookie=2xdsi3bn2ulhjqerlo3qw0j4',
      },
    })
      .then(function (response) {
        const res = JSON.stringify(response.data.body.Data);
        watchlistdata = response.data.body.Data;
        watchlistdata.sort(function (a, b) {
          return b.ChgPcnt - a.ChgPcnt;
        });

        setWatchlistData(watchlistdata);
      })
      .catch(function (error) {
        console.log('error is', error);
      });
  };

  const renderItem = item => (
    <View style={styles.itemPadding}>
      <WatchlistItem
        item={item}
        onPress={() => onWatchlistDetailsClick(item)}
      />
    </View>
  );

  return (
    <FlatList
      data={watchlistData}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatListPadding}
    />
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
