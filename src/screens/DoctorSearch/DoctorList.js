import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Thumbnail} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';

export default function DoctorList({drdata}) {
  const {navigate} = useNavigation();
  const searchQuery = useNavigationParam('searchQuery');

  function handleNavigate() {
    navigate('DoctorProfile', {drdata, searchQuery});
  }

  let renderImage;

  if (drdata.specialty.toLowerCase().includes('dentist'))
    renderImage = (
      <Thumbnail
        square
        source={require('../../../assets/images/dental.png')}
        style={{width: 60, height: 60}}
      />
    );
  else
    renderImage = (
      <Thumbnail
        square
        source={require('../../../assets/images/stethoscope.png')}
        style={{width: 60, height: 60}}
      />
    );

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.cardStyle}>
        <View
          style={{
            height: 60,
            width: 70,
            justifyContent: 'center',
          }}>
          {renderImage}
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              fontFamily: 'Arial',
              color: '#5fb650',
            }}>
            {drdata.doctor_name}
          </Text>
          <Text style={{fontSize: 11, color: '#2d2d2d'}}>
            {drdata.specialty.length > 35
              ? drdata.specialty.substring(0, 35) + '...'
              : drdata.specialty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
  cardStyle: {
    borderRadius: 5,
    borderColor: '#f5f5f5',
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    margin: 10,
  },
});
