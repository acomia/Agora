import React from 'react';
import {Text} from 'react-native';
import {View, List, ListItem, Left, Body} from 'native-base';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './SearchResultStyles.js';
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();

export const SearchResult = () => {
  return (
    <View style={styles.searchResultsWrapper}>
      <List
        dataArray={predictions}
        renderRow={item => (
          <View>
            <ListItem onPress={} button avatar>
              <Left style={styles.leftContainer}>
                <Icon style={styles.leftIcon} name="location-on" />
              </Left>
              <Body>
                <Text style={styles.primaryText}>Try</Text>
                <Text style={styles.secondaryText}>Try Again</Text>
              </Body>
            </ListItem>
          </View>
        )}
      />
    </View>
  );
};
const styles = {
  searchResultsWrapper: {
    top: 160,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: 1000,
    backgroundColor: '#fff',
    opacity: 0.9,
  },
  primaryText: {
    fontWeight: 'bold',
    color: '#373737',
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
    color: '#7D7D7D',
  },
  distance: {
    fontSize: 12,
  },
};

export default SearchResult;
