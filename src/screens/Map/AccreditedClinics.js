import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {View, List, ListItem, Left, Body} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const offices = require('../../../offices.json');
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
class AccreditedClinics extends React.Component {
  render() {
    return (
      <View style={styles.searchResultsWrapper}>
        <List
          dataArray={offices}
          renderRow={item => (
            <View>
              <ListItem onPress={() => alert(item.name)} button avatar>
                <Left style={styles.leftContainer}>
                  <Icon style={styles.leftIcon} name="location-on" />
                </Left>
                <Body>
                  <Text style={styles.primaryText}>{item.name}</Text>
                  <Text style={styles.secondaryText}>Try Again</Text>
                </Body>
              </ListItem>
            </View>
          )}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});
export default AccreditedClinics;
