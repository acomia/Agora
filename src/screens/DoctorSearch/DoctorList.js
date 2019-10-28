import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Thumbnail} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from 'react-navigation-hooks';

export default function DoctorList({drdata, token}) {
  const {navigate} = useNavigation();

  function handleNavigate() {
    navigate('DoctorProfile', {drdata, token});
  }

  let renderImage;

  if (drdata.specialization.toLowerCase().includes('dentist'))
    renderImage = (
      <Thumbnail
        square
        source={require('../../../assets/images/search.png')}
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
          <Text style={{fontWeight: 'bold', fontSize: 14, fontFamily: 'Arial'}}>
            {drdata.doctorfullname}
          </Text>
          <Text style={{fontSize: 11, color: '#c2c2c2'}}>
            {drdata.specialization.length > 35
              ? drdata.specialization.substring(0, 35) + '...'
              : drdata.specialization}
          </Text>
          <Text style={{fontSize: 9, color: '#c2c2c2', paddingTop: 10}}>
            {drdata.hospitalclinic.length > 50
              ? drdata.hospitalclinic.substring(0, 50)
              : drdata.hospitalclinic}
          </Text>
          <Text style={{fontSize: 9, color: '#c2c2c2'}}>
            {drdata.city.length > 50
              ? drdata.city.substring(0, 50) + '...'
              : drdata.city}
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
    borderRadius: 10,
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
