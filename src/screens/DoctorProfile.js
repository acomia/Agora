import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {
  Container,
  Header,
  Text,
  Left,
  Right,
  Body,
  Label,
  ListItem,
  Thumbnail,
  List,
  Accordion,
  Spinner,
  Icon,
  Button,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigationParam} from 'react-navigation-hooks';
import AccordionDetails from './AccordionDetails';

export default function DoctorProfile() {
  const drdata = useNavigationParam('drdata');
  const tokenVal = useNavigationParam('token');

  const [hospitalList, setHospitalList] = useState([]);
  const [error, setError] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [token] = useState(tokenVal);
  const dataArray = hospitalList;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchHospitalAccreditation(signal);

    return () => {
      abortController.abort();
    };
  }, []);

  let renderHospitalAccreditation;

  async function fetchHospitalAccreditation(signal) {
    try {
      setFetching(true);
      let response = await fetch(
        `https://intellicare.com.ph/uat/webservice/thousandminds/api/searchprovider/${token}`,
        {
          method: 'POST',
          signal: signal,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doctor: drdata.doctorfullname.split(',')[0],
            hospitalclinic: 'ALL',
            specialization: drdata.specialization,
            city: 'ALL',
          }),
        },
      );

      let responseJson = await response.json();

      let filteredDoctors = responseJson.response.filter(doctors => {
        return doctors.doctorcode === drdata.doctorcode;
      });

      console.log(filteredDoctors);

      let hospitals = [];

      for (let key of filteredDoctors)
        for (let {} in key) {
          let hscode = key['hospitalcode'];
          let drcode = key['doctorcode'];
          let hospclinic = key['hospitalclinic'];
          let city = key['city'];
          let room;
          let coordinator;
          let phone;
          let schedule;

          let data = await fetchProviderDetail(signal, drcode, hscode);

          console.log(data.response);

          if (data.response !== null) {
            room =
              data.response.room.trim() === ''
                ? 'N/A'
                : data.response.room.trim();
            coordinator =
              data.response.coordinator.trim() === ''
                ? 'N/A'
                : data.response.coordinator.trim();
            phone =
              data.response.phone.trim() === ''
                ? 'N/A'
                : data.response.phone.trim();
            schedule =
              data.response.schedule.trim() === ''
                ? 'N/A'
                : data.response.schedule.trim();
          } else {
            room = 'N/A';
            coordinator = 'N/A';
            phone = 'N/A';
            schedule = 'N/A';
          }

          hospitals.push({
            title: toTitleCase(hospclinic),
            hscode: hscode,
            drcode: drcode,
            room: room,
            coordinator: coordinator,
            phone: phone,
            schedule: schedule,
            city: city,
          });

          break;
        }

      console.log(hospitals);

      if (hospitals.length > 0) setHospitalList(hospitals);
      setError(false);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setFetching(false);
    }
  }

  if (!error) {
    if (hospitalList.length < 1)
      renderHospitalAccreditation = (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Container>
            <Spinner color="#5fb650" />
          </Container>
        </View>
      );
    else
      renderHospitalAccreditation = (
        <View style={styles.accordion}>
          <Accordion
            dataArray={dataArray}
            style={{borderWidth: 0}}
            headerStyle={{
              backgroundColor: '#fff',
              fontSize: 12,
              color: '#2d2d2d',
              paddingBottom: 15,
            }}
            renderContent={item => <AccordionDetails dataArray={item} />}
          />
        </View>
      );
  } else {
    renderHospitalAccreditation = (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Thumbnail
          square
          source={require('../../assets/images/network_error.png')}
          style={{
            height: 100,
            width: 100,
            marginHorizontal: 10,
            alignSelf: 'center',
          }}
        />
        <Text style={{textAlign: 'center', color: 'gray', fontSize: 12}}>
          Failed To Display Hospital Accreditation
        </Text>
        <Text style={{textAlign: 'center', color: 'gray', fontSize: 12}}>
          Please Check Your Internet Connection
        </Text>
        <Text></Text>
        <Button
          small
          style={{alignSelf: 'center', backgroundColor: '#5fb650'}}
          onPress={() => {
            fetchHospitalAccreditation();
          }}>
          <Text>Retry</Text>
        </Button>
        {fetching ? (
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Spinner size="small" color="#5fb650" />
            <Text style={{alignSelf: 'center', color: 'gray', fontSize: 12}}>
              {' '}
              Reconnecting...
            </Text>
          </View>
        ) : null}
      </View>
    );
  }

  async function fetchProviderDetail(signal, drcode, hscode) {
    try {
      let response = await fetch(
        `https://intellicare.com.ph/uat/webservice/thousandminds/api/searchprovider/detail/${token}`,
        {
          method: 'POST',
          signal: signal,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doctorcode: drcode,
            hospitalcode: hscode,
          }),
        },
      );

      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  function renderThumbnail() {
    if (drdata.specialization.toLowerCase().includes('dentist'))
      return (
        <Thumbnail
          large
          source={require('../../assets/images/dental.png')}
          resizeMode="contain"
          style={styles.avatarStyle}
          square
        />
      );

    return (
      <Thumbnail
        large
        source={require('../../assets/images//stethoscope.png')}
        resizeMode="contain"
        style={styles.avatarStyle}
        square
      />
    );
  }

  return (
    <ScrollView>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/intellicareheader.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.headerUser}>
          {renderThumbnail()}
          <Label style={styles.labelNickname}>{drdata.doctorfullname}</Label>
        </View>
        <Text style={styles.headerDetails}>
          {toTitleCase(drdata.specialization)}
        </Text>
      </ImageBackground>
      <ScrollView>
        <View style={styles.hospitalAccreditation}>
          {!error ? (
            <ListItem icon>
              <Left>
                <Thumbnail
                  small
                  style={{alignSelf: 'center'}}
                  source={require('../../assets/images/id-card.png')}
                  resizeMode="contain"
                />
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.contentHeader}>Hospital Accreditation</Text>
              </Body>
              <Right />
            </ListItem>
          ) : null}
          {renderHospitalAccreditation}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    height: 200,
  },
  headerStyle: {
    height: 180,
    backgroundColor: '#5fb650',
    paddingLeft: 0,
    paddingRight: 0,
  },
  headerUser: {
    alignItems: 'center',
  },
  headerDetails: {
    alignSelf: 'center',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  labelNickname: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  labelHeaderDetails: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 14,
  },
  doctorDescription: {
    marginTop: 30,
    paddingRight: 30,
  },
  hospitalAccreditation: {
    marginTop: 30,
  },
  contentHeader: {
    color: '#5fb650',
    fontWeight: 'bold',
    fontSize: 20,
  },
  accordion: {
    paddingHorizontal: 20,
  },
  avatarStyle: {
    marginBottom: 5,
  },
  description: {
    marginTop: 20,
    paddingHorizontal: 50,
    color: '#2d2d2d',
  },
  navStyle: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
  },
  itemDescription: {
    flexDirection: 'row',
  },
});
