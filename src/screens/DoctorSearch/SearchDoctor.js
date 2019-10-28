import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Input, Icon, Header, Item, Button, Text, Thumbnail} from 'native-base';

export default class SearchDoctor extends Component {
  render() {
    return (
      <Header
        searchBar
        rounded
        style={{backgroundColor: '#5fb650', height: 45, alignItems: 'center'}}>
        <TouchableOpacity style={{paddingRight: 10}}>
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
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#5fb650',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 0.3,
  },
  inputField: {
    backgroundColor: 'white',
    height: '40%',
    width: '80%',
    borderRadius: 5,
  },
});
