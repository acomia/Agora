import React, {useState} from 'react';
import {Animated} from 'react-native';
import {
  View,
  InputGroup,
  Input,
  ListItem,
  Body,
  CheckBox,
  Text,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from 'react-navigation-hooks';

const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
const STATUSBAR_HEIGHT = require('react-native-extra-dimensions-android').getStatusBarHeight();

export const SearchBox = ({searchTerm, filterData}) => {
  const {navigate} = useNavigation();
  const [term, setTerm] = useState('');
  const [rightlogo, setRightlogo] = useState('filter-list');
  const [checkAll, setCheckAll] = useState(true);
  const [checkHospitals, setcheckHospitals] = useState(false);
  const [checkClinics, setcheckClinics] = useState(false);
  const [showFilter, setShowFilter] = useState(0);
  const [filterHeight, setFilterHeight] = useState(0);

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
      if (showFilter === 1 && filterHeight > 1) {
        setShowFilter(0);
        setFilterHeight(0);
      } else {
        setShowFilter(1);
        setFilterHeight(250);
      }
    }
  }
  function handleApplyPress() {
    if (checkAll) filterData('ALL');
    if (checkHospitals) filterData('HOSPITALS');
    if (checkClinics) filterData('CLINICS');
    setShowFilter(0);
    setFilterHeight(0);
  }
  function checked(value) {
    switch (value) {
      case 'ALL':
        return (
          setcheckHospitals(false), setCheckAll(true), setcheckClinics(false)
        );
      case 'HOSPITALS':
        return (
          setcheckHospitals(true), setCheckAll(false), setcheckClinics(false)
        );
      case 'CLINICS':
        return (
          setcheckHospitals(false), setCheckAll(false), setcheckClinics(true)
        );
      default:
        return (
          setcheckHospitals(false), setCheckAll(true), setcheckClinics(false)
        );
    }
  }
  filterView = () => (
    <View
      style={{
        justifyContent: 'space-between',
        height: filterHeight,
        opacity: showFilter,
      }}>
      <View style={{top: 20}}>
        <ListItem onPress={() => checked('ALL')}>
          <CheckBox checked={checkAll} color="green" />
          <Body style={{left: 10}}>
            <Text style={{color: 'grey', fontSize: 16}}>All facilities</Text>
          </Body>
        </ListItem>
        <ListItem onPress={() => checked('HOSPITALS')}>
          <CheckBox checked={checkHospitals} color="tomato" />
          <Body style={{left: 10}}>
            <Text style={{color: 'grey', fontSize: 16}}>
              Accredited Hospitals
            </Text>
          </Body>
        </ListItem>
        <ListItem onPress={() => checked('CLINICS')}>
          <CheckBox checked={checkClinics} color="blue" />
          <Body style={{left: 10}}>
            <Text style={{color: 'grey', fontSize: 16}}>
              Accredited Clinics
            </Text>
          </Body>
        </ListItem>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
        }}>
        <Button
          block
          style={{flex: 1, right: 2}}
          onPress={() => handleApplyPress()}>
          <Text style={{color: '#fff', fontSize: 16}}>Apply</Text>
        </Button>
        <Button
          block
          bordered
          style={{flex: 1, left: 2}}
          onPress={() => checked('CLEAR')}>
          <Text style={{color: 'grey', fontSize: 16}}>Clear</Text>
        </Button>
      </View>
    </View>
  );
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
        {filterView()}
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
