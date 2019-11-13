import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons'
import MembInfo from './MembInfo';
import ApprovedUtil from './ApprovedUtil';
import PostedUtil from './PostedUtil';


export default createBottomTabNavigator({
  MembInfo: {
    screen: MembInfo,
    navigationOptions: {
      tabBarLabel: 'Members Info',
      tabBarIcon: <Icon name='md-person' size={24} color ='#5fb650'/>
    }
  },
  ApprovedUtil: {
    screen: ApprovedUtil,
    navigationOptions: {
      tabBarLabel: 'Approved Utilization',
      tabBarIcon: <Icon name='md-checkmark-circle-outline' size={24}  color ='#5fb650' />
    }
  },
  PostedUtil: {
    screen: PostedUtil,
    navigationOptions: {
      tabBarLabel: 'Posted Utilization',
      tabBarIcon: <Icon name='md-paper' size={24}  color ='#5fb650' />
    }
  }
})

  // export default createBottomTabNavigator(NavGroup);
