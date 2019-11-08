import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, FlatList, Dimensions} from 'react-native';
import SearchDoctor from './SearchDoctor';
import DoctorList from './DoctorList';
// import SlidingUpPanel from 'rn-sliding-up-panel';
import {Input, Item} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigationParam} from 'react-navigation-hooks';

export default function DoctorSearchMainScreen() {
  const [doctorList, setDoctorList] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [refreshing, setRefreshing] = useState(true);
  const [tempSearch, setTempSearch] = useState('');

  const searchQuery = useNavigationParam('searchQuery');
  const tokenVal = useNavigationParam('token');

  const [token] = useState(tokenVal);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchDoctors(signal);

    return () => {
      abortController.abort();
    };
  }, []);

  async function fetchDoctors(signal) {
    try {
      let response = await fetch(
        `https://www.intellicare.com.ph/webservice/thousandminds/api/searchprovider/${token}`,
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

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.log(error);
    }
  }

  function handleChangeTextSearch(search) {
    setTextSearch(search);
  }

  function handleSearch() {
    if (textSearch === tempSearch) {
      console.log('same');
      return;
    }
    if (textSearch === '') {
      console.log('no input');
      return;
    }

    setDoctorList([]);
    setTempSearch(textSearch);
    setRefreshing(true);
    fetchDoctors();
  }

  function handlePanelShow() {
    _panel.show();
  }

  return (
    <View style={styles.mainContainer}>
      <SearchDoctor
        search={handleChangeTextSearch}
        onSearch={handleSearch}
        onPanelShow={handlePanelShow}
      />
      <FlatList
        data={doctorList}
        renderItem={({item}) => <DoctorList drdata={item} token={token} />}
        keyExtractor={item => item.doctorcode}
        initialNumToRender={5}
        refreshing={refreshing}
        onRefresh={() => fetchDoctors()}
      />
      {/* <SlidingUpPanel
        ref={c => (_panel = c)}
        draggableRange={{
          top: Dimensions.get('window').height * 0.4,
          bottom: 0,
        }}
        friction={0.4}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
          }}>
          <ScrollView>
            <Item>
              <Text style={{fontSize: 12, textAlign: 'left'}}>By Name</Text>
            </Item>
            <Item style={{height: 25}}>
              <Input
                placeholder="Last Name or First Name"
                style={{fontSize: 12, textAlign: 'center', borderRadius: 5}}
              />
            </Item>
          </ScrollView>
        </View>
      </SlidingUpPanel> */}
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
