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
          <Thumbnail
            square
            source={require('../../assets/images/nav-door.png')}
            style={{height: 20, width: 20, marginHorizontal: 10}}
          />
          <Text note>Room No: </Text>
          <Text note>{dataArray.room}</Text>
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
          <Thumbnail
            square
            source={require('../../assets/images/nav-coordinator.png')}
            style={{height: 20, width: 20, marginHorizontal: 10}}
          />
          <Text note>Coordinator: </Text>
          <Text note>{dataArray.coordinator}</Text>
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
          <Thumbnail
            square
            source={require('../../assets/images/nav-phone.png')}
            style={{height: 20, width: 20, marginHorizontal: 10}}
          />
          <Text note>{dataArray.phone}</Text>
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
          <Thumbnail
            square
            source={require('../../assets/images/nav-schedule.png')}
            style={{height: 20, width: 20, marginHorizontal: 10}}
          />
          <Text note>{dataArray.schedule}</Text>
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
            type="FontAwesome"
            name="map-marker"
            style={{height: 27, width: 20, marginHorizontal: 10}}
          />
          <Text note>{dataArray.city}</Text>
        </View>
      </List>
    </View>
  );
}
