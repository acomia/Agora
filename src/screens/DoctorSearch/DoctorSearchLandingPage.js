import React, {useState, useEffect} from 'react';
import {Text, Input, Form, Content, Button, Thumbnail} from 'native-base';
import {View, StyleSheet, Dimensions, StatusBar, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from 'react-navigation-hooks';

export default function DoctorSearchLandingPage() {
  const [searchQuery, setSearchQuery] = useState({
    doctorName: '',
    clinic: '',
    specialty: '',
    location: '',
  });

  const {navigate} = useNavigation();

  function handleOnChangeDoctorName(e) {
    setSearchQuery({
      doctorName: e,
      clinic: searchQuery.clinic,
      specialty: searchQuery.specialty,
      location: searchQuery.location,
    });
  }

  function handleOnChangeClinic(e) {
    setSearchQuery({
      doctorName: searchQuery.doctorName,
      clinic: e,
      specialty: searchQuery.specialty,
      location: searchQuery.location,
    });
  }

  function handleOnChangeSpecialty(e) {
    setSearchQuery({
      doctorName: searchQuery.doctorName,
      clinic: searchQuery.clinic,
      specialty: e,
      location: searchQuery.location,
    });
  }

  function handleOnchangeLocation(e) {
    setSearchQuery({
      doctorName: searchQuery.doctorName,
      clinic: searchQuery.clinic,
      specialty: searchQuery.specialty,
      location: e,
    });
  }

  function handleSearch() {
    navigate('DoctorSearchMainScreen', {searchQuery});
  }

  const winHeight = Dimensions.get('window').height;

  return (
    <View style={{backgroundColor: '#5fb650', flex: 1}}>
      <ScrollView>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{flex: 1, paddingTop: winHeight * 0.1}}>
          <Text style={styles.physicianDirectory}>PHYSICIAN DIRECTORY</Text>
          <View style={{justifyContent: 'center', margin: 20}}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 12}}>
              We have over 43,500 Doctors and Specialists in our nationwide
              network. Find the one that’s best for you.To narrow your search,
              fill in more than one field.
            </Text>
          </View>
          <Content>
            <Form>
              <Input
                placeholderTextColor={'#c2c2c2'}
                placeholder="Doctor's Name (last name or first name)"
                style={styles.doctorInput}
                textAlignVertical="center"
                value={searchQuery.doctorName}
                onChangeText={handleOnChangeDoctorName}
              />
              <Input
                placeholderTextColor={'#c2c2c2'}
                placeholder="Hospital/Clinic Name"
                style={styles.clinicInput}
                textAlignVertical="center"
                value={searchQuery.clinic}
                onChangeText={handleOnChangeClinic}
              />
              <Input
                placeholderTextColor={'#c2c2c2'}
                placeholder="Specialization"
                style={styles.specialtyInput}
                textAlignVertical="center"
                value={searchQuery.specialty}
                onChangeText={handleOnChangeSpecialty}
              />
              <Input
                placeholderTextColor={'#c2c2c2'}
                placeholder="City/Province"
                style={styles.locationInput}
                textAlignVertical="center"
                value={searchQuery.location}
                onChangeText={handleOnchangeLocation}
              />
              <Button style={styles.buttonSearch} onPress={handleSearch}>
                <Text>Search</Text>
              </Button>
            </Form>
          </Content>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  doctorInput: {
    fontSize: 12,
    backgroundColor: 'white',
    borderRadius: 7,
    marginHorizontal: 35,
    height: 35,
  },
  clinicInput: {
    fontSize: 12,
    backgroundColor: 'white',
    borderRadius: 7,
    marginHorizontal: 35,
    marginVertical: 10,
    height: 35,
  },
  specialtyInput: {
    fontSize: 12,
    backgroundColor: 'white',
    borderRadius: 7,
    marginHorizontal: 35,
    height: 35,
  },
  locationInput: {
    fontSize: 12,
    backgroundColor: 'white',
    borderRadius: 7,
    marginHorizontal: 35,
    height: 35,
    marginVertical: 10,
  },
  buttonSearch: {
    marginHorizontal: 45,
    justifyContent: 'center',
    backgroundColor: '#626c7a',
    borderRadius: 8,
    margin: 10,
  },
  physicianDirectory: {
    alignSelf: 'center',
    color: 'white',
    paddingTop: 80,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
