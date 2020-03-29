import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import {Thumbnail, Text, Spinner} from 'native-base';
import SearchDoctor from './SearchDoctor';
import DoctorList from './DoctorList';
import {useNavigationParam} from 'react-navigation-hooks';

export default function DoctorSearchMainScreen() {
  const [doctorList, setDoctorList] = useState([]);
  const [tempDoctorList, setTempDoctorList] = useState([]);
  const [index, setIndex] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [dataLength, setDataLength] = useState(0);

  const searchQuery = useNavigationParam('searchQuery');

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
    fetchDoctors(index);

    return () => {
      abortController.abort();
    };
  }, []);

  async function fetchDoctors(pageIndex) {
    try {
      setFetching(true);
      const abortController = new AbortController();
      const signal = abortController.signal;

      let resp = await fetch(
        `https://intellicare.com.ph/uat/webservice/memberprofile/api/providers/find/advancesearch?paging=${pageIndex}&pagesize=30`,
        {
          signal: signal,
          headers: {
            Doctor: searchQuery.doctorName,
            Hospital: searchQuery.clinic.trim(),
            Specialty: searchQuery.specialty.trim(),
            City: searchQuery.location.trim(),
          },
        },
      );

      let respJson = await resp.json();

      if (respJson.data === null && doctorList.length < 1) {
        setFetching(false);
        setDoctorList(null);
        return;
      }

      setDataLength(respJson.data.length);

      if (respJson.data === null && doctorList) {
        setFetching(false);
        return;
      }

      setDoctorList([...doctorList, ...respJson.data]);
      setTempDoctorList([...doctorList, ...respJson.data]);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching(false);
      searchQuery.clinic = '';
      searchQuery.location = '';
    }
  }

  function handleChangeTextSearch(search) {
    if (!doctorList) return;

    if (search === '') {
      setDoctorList(tempDoctorList);
      return;
    }

    let filtered = tempDoctorList.filter(doctor => {
      return (
        doctor.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(search.toLowerCase())
      );
    });

    setDoctorList(filtered);
  }

  function handleFurtherSearch() {
    if (dataLength < 30) return;
    if (fetching) return;

    setIndex(index + 1);

    let pageIndex = index;

    fetchDoctors(pageIndex + 1);
  }

  return (
    <View style={styles.mainContainer}>
      <SearchDoctor search={handleChangeTextSearch} />
      <ScrollView>
        {doctorList ? (
          <FlatList
            data={doctorList}
            renderItem={({item}) => (
              <DoctorList drdata={item} searchQuery={searchQuery} />
            )}
            keyExtractor={item => item.doctor_code}
            onEndReached={handleFurtherSearch}
            onEndReachedThreshold={0.01}
          />
        ) : (
          <View style={{paddingTop: 20}}>
            <Thumbnail
              square
              source={require('../../../assets/images/error.png')}
              style={{
                height: 80,
                width: 80,
                marginHorizontal: 10,
                alignSelf: 'center',
              }}
            />
            <Text style={{alignSelf: 'center', color: 'gray', fontSize: 12}}>
              No Results Found
            </Text>
          </View>
        )}
        {fetching && doctorList ? <Spinner color="#5fb650" /> : null}
      </ScrollView>
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
