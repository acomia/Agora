import React from 'react';
import {Text} from 'react-native';
import {View, List, ListItem, Left, Body} from 'native-base';

import Icon from 'react-native-vector-icons/MaterialIcons';
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();

export const SearchResult = ({data}) => {
  return (
    <View style={styles.searchResultsWrapper}>
      <List
        dataArray={data}
        renderRow={item => (
          <View>
            <ListItem button avatar>
              <Left style={styles.leftContainer}>
                <Icon style={styles.leftIcon} name="location-on" />
              </Left>
              <Body>
                <Text style={styles.primaryText}>{item.hospital_name}</Text>
                <Text style={styles.secondaryText}>{item.phone}</Text>
              </Body>
            </ListItem>
          </View>
        )}
        keyExtractor={item => item.hospital_code}
      />
    </View>
  );
};
const styles = {
  searchResultsWrapper: {
    top: 90,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: 1000,
    backgroundColor: '#fff',
    opacity: 0.9,
  },
  primaryText: {
    fontWeight: 'bold',
    color: 'tomato',
  },
  secondaryText: {
    fontStyle: 'italic',
    color: '#7D7D7D',
  },
  leftContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderLeftColor: '#7D7D7D',
  },
  leftIcon: {
    fontSize: 20,
    color: 'tomato',
  },
  distance: {
    fontSize: 12,
  },
};

export default SearchResult;
