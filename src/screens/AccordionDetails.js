import React from 'react';
import {List, View, Text, Icon} from 'native-base';

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
          <Icon
            type="MaterialCommunityIcons"
            name="door"
            style={{fontSize: 20, paddingHorizontal: 10, color: '#2d2d2d'}}
          />
          <Text note style={{fontSize: 14}}>
            Room No:{' '}
          </Text>
          <Text note style={{fontSize: 14}}>
            {dataArray.room.trim() === '' ? 'N/A' : dataArray.room.trim()}
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
            {dataArray.coordinator.trim() === ''
              ? 'N/A'
              : dataArray.coordinator.trim()}
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
            {dataArray.phone.trim() === '' ? 'N/A' : dataArray.phone.trim()}
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
            {dataArray.schedule.trim() === ''
              ? 'N/A'
              : dataArray.schedule.trim()}
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
            {dataArray.location.trim() === ''
              ? 'N/A'
              : dataArray.location.trim()}
          </Text>
        </View>
      </List>
    </View>
  );
}
