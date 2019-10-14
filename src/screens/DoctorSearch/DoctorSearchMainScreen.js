import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import SearchDoctor from './SearchDoctor';
import DoctorList from './DoctorList';

const DATA = [
  {
    doctorcode: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    doctorfullname: 'Dr. Juan Dela Cruz',
    specialization: 'Internal Medicine - Gastroenterologist',
    imgsrc: '../../../assets/images/user.png',
    hospitalclinic: 'MAKATI MEDICAL CENTER',
    city: 'MAKATI CITY (DISTRICT 4 [NCR - NATIONAL CAPITAL REGION])',
  },
  {
    doctorcode: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    doctorfullname: 'Dr. Andres Bonifacio',
    specialization: 'Internal Medicine - Infectious and Trop...',
    imgsrc: '../../../assets/images/user.png',
    hospitalclinic: 'MAKATI MEDICAL CENTER',
    city: 'MAKATI CITY (DISTRICT 4 [NCR - NATIONAL CAPITAL REGION])',
  },
  {
    doctorcode: '58694a0f-3da1-471f-bd96-145571e29d72',
    doctorfullname: 'Dr. Maria Dela Cruz',
    specialization: 'Obstetrician and Gynecologist',
    imgsrc: '../../../assets/images/user.png',
    hospitalclinic: 'MAKATI MEDICAL CENTER',
    city: 'MAKATI CITY (DISTRICT 4 [NCR - NATIONAL CAPITAL REGION])',
  },
  {
    doctorcode: '58694a0f-3da1-471f-b2d96-145571e29d72',
    doctorfullname: 'Dr. Apolinario Mabini',
    specialization: 'Obstetrician and Gynecologist',
    imgsrc: '../../../assets/images/user.png',
    hospitalclinic: 'MAKATI MEDICAL CENTER',
    city: 'MAKATI CITY (DISTRICT 4 [NCR - NATIONAL CAPITAL REGION])',
  },
  {
    doctorcode: '58694a0f-3da1-471f-b56d96-145571e29d72',
    doctorfullname: 'Dr. Emilio Aguinaldo',
    specialization: 'Obstetrician and Gynecologist',
    imgsrc: '../../../assets/images/user.png',
    hospitalclinic: 'MAKATI MEDICAL CENTER',
    city: 'MAKATI CITY (DISTRICT 4 [NCR - NATIONAL CAPITAL REGION])',
  },
  {
    doctorcode: '58694a0f-3da1-471f-bd9566-145571e29d72',
    doctorfullname: 'Dr. Emilio Jacinto',
    specialization: 'Obstetrician and Gynecologist',
    imgsrc: '../../../assets/images/user.png',
    hospitalclinic: 'MAKATI MEDICAL CENTER',
    city: 'MAKATI CITY (DISTRICT 4 [NCR - NATIONAL CAPITAL REGION])',
  },
  {
    doctorcode: '58694a0f-3da1-471f-bd966-145571e29d72',
    doctorfullname: 'Dr. Jose Rizal',
    specialization: 'Obstetrician and Gynecologist',
    imgsrc: '../../../assets/images/user.png',
    hospitalclinic: 'MAKATI MEDICAL CENTER',
    city: 'MAKATI CITY (DISTRICT 4 [NCR - NATIONAL CAPITAL REGION])',
  },
  {
    doctorcode: '58694a0f-3da1-471f-b2d96-14557fs1e29d72',
    doctorfullname: 'Dr. Gregorio Del Pilar',
    specialization: 'Obstetrician and Gynecologist',
    imgsrc: '../../../assets/images/user.png',
    hospitalclinic: 'MAKATI MEDICAL CENTER',
    city: 'MAKATI CITY (DISTRICT 4 [NCR - NATIONAL CAPITAL REGION])',
  },
  {
    doctorcode: '58694a0f-3da1-471f-bd696-145571e29d72',
    doctorfullname: 'Dr. Antonio Luna',
    specialization: 'Obstetrician and Gynecologist',
    imgsrc: '../../../assets/images/user.png',
    hospitalclinic: 'MAKATI MEDICAL CENTER',
    city: 'MAKATI CITY (DISTRICT 4 [NCR - NATIONAL CAPITAL REGION])',
  },
];

export default function DoctorSearchMainScreen() {
  const [token, setToken] = useState('CB91109E-1FEE-E911-80BB-00155D006102');
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    try {
      let response = await fetch(
        `https://www.intellicare.com.ph/webservice/thousandminds/api/searchprovider/${token}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doctor: 'RONALD',
            hospitalclinic: 'ALL',
            specialization: 'ALL',
            city: 'ALL',
          }),
        },
      );

      let responseJson = await response.json();

      console.log(responseJson.response);

      const map = new Map();
      const result = [];

      for (const item of responseJson.response) {
        if (!map.has(item.doctorcode)) {
          map.set(item.doctorcode, true); // set any value to Map
          result.push({
            city: item.city,
            doctorcode: item.doctorcode,
            doctorfullname: item.doctorfullname,
            hospitalclinic: item.hospitalclinic,
            hospitalcode: item.hospitalcode,
            specialization: item.specialization,
          });
        }
      }

      console.log(result);

      setDoctorList(result);

      //setDoctorList(responseJson.response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <SearchDoctor />
      <FlatList
        data={doctorList}
        renderItem={({item}) => <DoctorList drdata={item} />}
        keyExtractor={item => item.doctorcode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
