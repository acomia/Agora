import React from 'react';
import {
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from 'react-navigation-hooks';

import styles from './MapStyle';
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight();
const CARD_HEIGHT = SCREEN_HEIGHT / 4;
const CARD_WIDTH = SCREEN_WIDTH / 2;

const ExploreComponent = ({
  hideExploreFooter,
  getNearbyHospitals,
  getNearbyClinics,
}) => {
  const {navigate} = useNavigation();
  return (
    <View>
      <View
        style={{
          padding: 0,
          marginTop: 0,
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback onPress={() => hideExploreFooter()}>
          <Icon name="keyboard-arrow-down" color="grey" size={26} />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => getNearbyHospitals()}>
          <View style={styles.exploreCard}>
            <Image
              source={require('../../../assets/images/hospital_img.png')}
              style={{
                height: SCREEN_HEIGHT / 10,
                width: CARD_WIDTH,
                position: 'absolute',
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontStyle: 'italic',
                fontWeight: 'bold',
              }}>
              Nearby Hospitals
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => getNearbyClinics()}>
          <View style={styles.exploreCard}>
            <Image
              source={require('../../../assets/images/clinic_img.png')}
              style={{
                height: SCREEN_HEIGHT / 10,
                width: CARD_WIDTH,
                position: 'absolute',
              }}
            />
            <Text
              style={{
                color: 'grey',
                fontSize: 16,
                fontStyle: 'italic',
                fontWeight: 'bold',
              }}>
              Nearby Clinics
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigate('OfficesPage')}>
          <View style={styles.exploreCard}>
            <Image
              source={require('../../../assets/images/axa.png')}
              style={{
                height: SCREEN_HEIGHT / 10,
                width: CARD_WIDTH,
                position: 'absolute',
              }}
            />
            <Text
              style={{
                color: 'grey',
                fontSize: 16,
                fontStyle: 'italic',
                fontWeight: 'bold',
              }}>
              Intellicare/Avega Offices
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default ExploreComponent;
