import React, {FC, useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

interface Props {
  onPress: () => void;
}

const WatchlistItem: FC<Props> = ({item, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.cardStyle}
      onPress={() => onPress()}
      activeOpacity={0.9}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Text style={{marginRight:20}}>{item.item.Symbol}</Text>
            <Text>{item.item.LastRate}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text>{item.item.Chg}</Text>
            <Text style={{color: item.item.ChgPcnt > 0 ? 'green' : 'red'}}>
              ({parseFloat(item.item.ChgPcnt).toFixed(2)})
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    flex: 1,
    borderColor: '#E8E8E8',
    borderWidth: 2,
    // height: 70,
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  rightContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    // width: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cardStyle: {
    backgroundColor: 'white',
  },
});

export default WatchlistItem;
