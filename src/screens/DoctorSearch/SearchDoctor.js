import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Input, Icon, Header, Item, Thumbnail} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';

export default function SearchDoctor({search, onSearch}) {
  const [textSearch, setTextSearch] = useState('');

  const {navigate} = useNavigation();

  function handleOnChangeText(e) {
    setTextSearch(e);
    search(e);
  }

  function handleSearchEvent() {
    onSearch();
  }

  return (
    <Header
      searchBar
      rounded
      style={{backgroundColor: '#5fb650', height: 45, alignItems: 'center'}}>
      <TouchableOpacity
        style={{paddingRight: 10}}
        onPress={() => navigate('SearchLandingPage')}>
        <Icon
          type="FontAwesome"
          name="chevron-left"
          style={{color: 'white', fontSize: 15}}
        />
      </TouchableOpacity>
      <Item style={{height: 25, margin: 10}}>
        <Input
          placeholderTextColor={'#c2c2c2'}
          placeholder="Search Doctor's Name or Specialty"
          style={{fontSize: 12, textAlign: 'center', paddingBottom: 0.3}}
          onChangeText={handleOnChangeText}
          onSubmitEditing={handleSearchEvent}
          value={textSearch}
        />
      </Item>
      <TouchableOpacity>
        <Thumbnail
          source={require('../../../assets/images/filter.png')}
          style={{height: 25, width: 25}}
        />
      </TouchableOpacity>
    </Header>
  );
}
