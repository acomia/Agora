import React, {useState} from 'react';
import {View, InputGroup, Input} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from 'react-navigation-hooks';

const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
const STATUSBAR_HEIGHT = require('react-native-extra-dimensions-android').getStatusBarHeight();

export const SearchBox = ({searchTerm}) => {
  const {navigate} = useNavigation();
  const [term, setTerm] = useState('');
  const [rightlogo, setRightlogo] = useState('filter-list');

  function handleTextChange(e) {
    if (e !== '') {
      setRightlogo('close');
    } else {
      setRightlogo('filter-list');
    }
    setTerm(e);
    searchTerm(e);
  }
  function handleRightIconPress() {
    if (rightlogo === 'close') {
      setRightlogo('filter-list');
      setTerm('');
      searchTerm('');
    } else {
      navigate('FilterPage');
    }
  }
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <InputGroup>
          <Icon name="search" size={28} color="#FF5E3A" style={{left: 4}} />
          <Input
            placeholder="Search by Name or by Location (City/Province)"
            style={{fontSize: 14}}
            onChangeText={handleTextChange}
            value={term}
          />
          <Icon
            name={rightlogo}
            size={28}
            color="#FF5E3A"
            style={{right: 6}}
            onPress={handleRightIconPress}
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
