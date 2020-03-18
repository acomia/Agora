import React from 'react';
import {View, Text} from 'react-native';
import {Button, ListItem, CheckBox, Body} from 'native-base';
const FilterComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{top: 20}}>
        <ListItem>
          <CheckBox color="green" />
          <Body>
            <Text>All facilities</Text>
          </Body>
        </ListItem>
        <ListItem>
          <CheckBox color="tomato" />
          <Body>
            <Text>Accredited Hospitals</Text>
          </Body>
        </ListItem>
        <ListItem>
          <CheckBox color="blue" />
          <Body>
            <Text>Accredited Clinics</Text>
          </Body>
        </ListItem>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Button>
            <Text>Apply</Text>
          </Button>
        </View>
        <View>
          <Button>
            <Text>Clear</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default FilterComponent;
