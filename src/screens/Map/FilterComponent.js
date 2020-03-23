import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, ListItem, CheckBox, Body} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';

const FilterComponent = () => {
  const {navigate} = useNavigation();

  const [checkAll, setCheckAll] = useState(true);
  const [checkHospitals, setcheckHospitals] = useState(false);
  const [checkClinics, setcheckClinics] = useState(false);

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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
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
          onPress={() => navigate('MapPage', {})}>
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
};

export default FilterComponent;
