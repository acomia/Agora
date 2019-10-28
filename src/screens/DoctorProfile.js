import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, ImageBackground} from 'react-native';
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
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigationParam} from 'react-navigation-hooks';
import AccordionDetails from './AccordionDetails';

export default function DoctorProfile() {
  const drdata = useNavigationParam('drdata');
  const tokenVal = useNavigationParam('token');

  const [hospitalList, setHospitalList] = useState([]);
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

  async function fetchHospitalAccreditation(signal) {
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
            title: hospclinic,
            hscode: hscode,
            drcode: drcode,
            room: room,
            coordinator: coordinator,
            phone: phone,
            schedule: schedule,
            city: city
          });

          break;
        }

      console.log(hospitals);

      if (hospitals.length > 0) setHospitalList(hospitals);
    } catch (error) {
      console.log(error);
    }
  }

  let renderHospitalAccreditation;

  if (hospitalList.length < 1)
    renderHospitalAccreditation = (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Container>
          <Spinner />
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
            fontSize: 14,
            color: '#2d2d2d',
            paddingBottom: 20,
          }}
          contentStyle={{
            backgroundColor: 'transparent',
            fontSize: 14,
            color: '#2d2d2d',
          }}
          renderContent={item => <AccordionDetails dataArray={item} />}
        />
      </View>
    );

  async function fetchProviderDetail(signal, drcode, hscode) {
    try {
      let response = await fetch(
        `https://www.intellicare.com.ph/webservice/thousandminds/api/searchprovider/detail/${token}`,
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

  return (
    <Container>
      <Header span style={styles.headerStyle}>
        <ImageBackground
          source={require('../../assets/images/intellicareheader.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.headerUser}>
            <Thumbnail
              large
              source={require('../../assets/images/doctor-avatar.png')}
              resizeMode="contain"
              style={styles.avatarStyle}
            />
            <Label style={styles.labelNickname}>{drdata.doctorfullname}</Label>
          </View>
          <Text style={styles.headerDetails}>{drdata.specialization}</Text>
        </ImageBackground>
      </Header>
      <ScrollView>
        <View style={styles.hospitalAccreditation}>
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
          {renderHospitalAccreditation}
        </View>
      </ScrollView>
    </Container>
  );
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
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
  },
  labelNickname: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
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
