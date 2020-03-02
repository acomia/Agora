import React, {useEffect} from 'react';
import {List, View, Thumbnail, Text, Icon} from 'native-base';

export default function AccordionDetails({dataArray}) {
  return (
    <View>
      <List
        style={{
          marginBottom: 20,
          paddingHorizontal: 20,
          paddingRight: 50,
          color: '#2d2d2d',
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* <Thumbnail
            square
            source={require('../../assets/images/nav-door.png')}
            style={{height: 20, width: 20, marginHorizontal: 10}}
          /> */}
          <Icon
            type="MaterialCommunityIcons"
            name="door"
            style={{fontSize: 20, paddingHorizontal: 10, color: '#2d2d2d'}}
          />
          <Text note style={{fontSize: 14}}>
            Room No:{' '}
          </Text>
          <Text note style={{fontSize: 14}}>
            {dataArray.room}
          </Text>
        </View>
      </List>
      <List
        style={{
          marginBottom: 20,
          paddingHorizontal: 20,
          paddingRight: 50,
          color: '#2d2d2d',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            type="MaterialCommunityIcons"
            name="account-box-outline"
            style={{fontSize: 20, paddingHorizontal: 10, color: '#2d2d2d'}}
          />
          <Text note style={{fontSize: 14}}>
            Coordinator:{' '}
          </Text>
          <Text note style={{fontSize: 14}}>
            {dataArray.coordinator}
          </Text>
        </View>
      </List>
      <List
        style={{
          marginBottom: 20,
          paddingHorizontal: 20,
          paddingRight: 50,
          color: '#2d2d2d',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            type="MaterialCommunityIcons"
            name="phone-outline"
            style={{fontSize: 20, paddingHorizontal: 10, color: '#2d2d2d'}}
          />
          <Text note style={{fontSize: 14}}>
            {dataArray.phone}
          </Text>
        </View>
      </List>
      <List
        style={{
          marginBottom: 20,
          paddingHorizontal: 20,
          paddingRight: 50,
          color: '#2d2d2d',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            type="MaterialCommunityIcons"
            name="calendar-month-outline"
            style={{fontSize: 20, paddingHorizontal: 10, color: '#2d2d2d'}}
          />
          <Text note style={{fontSize: 14}}>
            {dataArray.schedule}
          </Text>
        </View>
      </List>
      <List
        style={{
          marginBottom: 20,
          paddingHorizontal: 20,
          paddingRight: 50,
          color: '#2d2d2d',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            type="MaterialCommunityIcons"
            name="map-marker-outline"
            style={{fontSize: 20, paddingHorizontal: 10, color: '#2d2d2d'}}
          />
          <Text note style={{fontSize: 14}}>
            {dataArray.city}
          </Text>
        </View>
      </List>
    </View>
  );
}
