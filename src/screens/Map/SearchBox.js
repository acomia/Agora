import React from 'react';
import {View, InputGroup, Input} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from 'react-navigation-hooks';

const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
const STATUSBAR_HEIGHT = require('react-native-extra-dimensions-android').getStatusBarHeight();

export const SearchBox = () => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <InputGroup>
          <Icon name="search" size={24} color="#FF5E3A" style={{left: 4}} />
          <Input
            placeholder="Search by Name or by Location (City/Province)"
            style={{fontSize: 14}}
            // onChangeText={e => onInputChange(e)}
          />
          <Icon
            name="filter-list"
            size={24}
            color="#FF5E3A"
            style={{right: 8}}
            onPress={() => navigate('FilterPage')}
          />
        </InputGroup>
      </View>
    </View>
  );
};

const styles = {
  inputContainer: {
    top: STATUSBAR_HEIGHT,
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
  inputWrapper: {
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    backgroundColor: '#fff',
    opacity: 0.9,
    borderRadius: 8,
  },
};

export default SearchBox;
