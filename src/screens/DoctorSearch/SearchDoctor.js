import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Input, Icon, Header, Item, Thumbnail} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';

export default function SearchDoctor({search}) {
  const [textSearch, setTextSearch] = useState('');

  const {navigate} = useNavigation();

  function handleOnChangeText(e) {
    setTextSearch(e);
    search(e);
  }

  return (
    <Header
      searchBar
      rounded
      translucent
      style={{
        backgroundColor: '#5fb650',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
      }}>
      <TouchableOpacity
        style={{paddingRight: 10}}
        onPress={() => navigate('SearchLandingPage')}>
        <Icon
          type="Ionicons"
          name="ios-arrow-back"
          style={{color: 'white', fontSize: 20}}
        />
      </TouchableOpacity>
      <Item style={{height: 25, margin: 10}}>
        <Input
          placeholderTextColor={'#c2c2c2'}
          placeholder="Filter By Name or Specialty"
          style={{fontSize: 12, textAlign: 'center'}}
          onChangeText={handleOnChangeText}
          value={textSearch}
        />
      </Item>
    </Header>
  );
}
