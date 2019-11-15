import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Text} from 'native-base';
import SearchDoctor from './SearchDoctor';
import DoctorList from './DoctorList';
import {useNavigationParam, useNavigation} from 'react-navigation-hooks';

export default function DoctorSearchMainScreen() {
  const [doctorList, setDoctorList] = useState([]);
  const [tempDoctorList, setTempDoctorList] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const searchQuery = useNavigationParam('searchQuery');
  const tokenVal = useNavigationParam('token');

  const [token] = useState(tokenVal);

  const {navigate} = useNavigation();

  if (
    searchQuery.doctorName.trim() === '' &&
    searchQuery.clinic.trim() === '' &&
    searchQuery.specialty.trim() === '' &&
    searchQuery.location.trim() === ''
  ) {
    searchQuery.clinic = 'aventus medical care inc';
    searchQuery.location = 'makati';
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchDoctors(signal);

    return () => {
      abortController.abort();
      searchQuery.clinic = '';
      searchQuery.location = '';
    };
  }, []);

  async function fetchDoctors(signal) {
    try {
      let response = await fetch(
        `http://203.160.190.52/webservice/thousandminds/api/searchprovider/${token}`,
        {
          method: 'POST',
          signal: signal,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doctor:
              searchQuery.doctorName === '' ? 'ALL' : searchQuery.doctorName,
            hospitalclinic:
              searchQuery.clinic === '' ? 'ALL' : searchQuery.clinic,
            specialization:
              searchQuery.specialty === '' ? 'ALL' : searchQuery.specialty,
            city: searchQuery.location === '' ? 'ALL' : searchQuery.location,
          }),
        },
      );

      searchQuery.clinic = '';
      searchQuery.location = '';

      let responseJson = await response.json();

      console.log(responseJson.response);

      if (responseJson.response == null) {
        alert(
          responseJson.message.toLowerCase().includes('token')
            ? responseJson.message.split(':')[0]
            : responseJson.message,
        );
        setRefreshing(false);
        return;
      }

      if (responseJson.response.length > 150)
        responseJson.response.splice(0, responseJson.response.length - 150);

      const map = new Map();
      const result = [];

      for (const item of responseJson.response) {
        if (!map.has(item.doctorcode)) {
          map.set(item.doctorcode, true); // set any value to Map
          result.push({
            doctorcode: item.doctorcode,
            doctorfullname: item.doctorfullname,
            specialization: item.specialization,
            hospitalcode: item.hospitalcode,
            hospitalclinic: item.hospitalclinic,
            city: item.city,
          });
        }
      }

      if (result.length > 100) result.splice(0, result.length - 100);

      setDoctorList(result);
      setTempDoctorList(result);

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      searchQuery.clinic = '';
      searchQuery.location = '';
      navigate('SearchLandingPage', {error});
    }
  }

  function handleChangeTextSearch(search) {
    if (search === '') {
      setDoctorList(tempDoctorList);
      return;
    }

    let filtered = tempDoctorList.filter(doctor => {
      return (
        doctor.doctorfullname.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase())
      );
    });

    setDoctorList(filtered);
  }

  return (
    <View style={styles.mainContainer}>
      <SearchDoctor search={handleChangeTextSearch} />
      <FlatList
        data={doctorList}
        renderItem={({item}) => <DoctorList drdata={item} token={token} />}
        keyExtractor={item => item.doctorcode}
        initialNumToRender={5}
        refreshing={refreshing}
        onRefresh={() => fetchDoctors()}
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
