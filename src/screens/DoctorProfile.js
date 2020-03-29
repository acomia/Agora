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
  Text,
  Left,
  Right,
  Body,
  Label,
  ListItem,
  Thumbnail,
  Accordion,
  Spinner,
  Button,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigationParam} from 'react-navigation-hooks';
import AccordionDetails from './AccordionDetails';
import {DOCTOR_SEARCH_DETAILS_ADVANCED} from '../util/api';

export default function DoctorProfile() {
  const drdata = useNavigationParam('drdata');
  const searchQuery = useNavigationParam('searchQuery');

  const [hospitalList, setHospitalList] = useState([]);
  const [error, setError] = useState(false);
  const [fetching, setFetching] = useState(false);

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
      let resp = await fetch(DOCTOR_SEARCH_DETAILS_ADVANCED, {
        signal: signal,
        headers: {
          DoctorCode: drdata.doctor_code,
          Hospital:
            searchQuery.clinic.trim() === '' ? '' : searchQuery.clinic.trim(),
          City: '',
        },
      });

      let respJson = await resp.json();

      for (let obj of respJson.data) {
        obj.title = toTitleCase(obj.hospital_name);
      }

      setHospitalList(respJson.data);

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
            expanded={hospitalList.length === 1 ? 0 : null}
            dataArray={hospitalList}
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

  function renderThumbnail() {
    if (drdata.specialty.toLowerCase().includes('dentist'))
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
          <Label style={styles.labelNickname}>{drdata.doctor_name}</Label>
        </View>
        <Text style={styles.headerDetails}>
          {toTitleCase(drdata.specialty)}
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
              <Right style={{borderBottomWidth: 0}} />
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
    paddingTop: 10,
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
    fontSize: 14,
  },
  labelNickname: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
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
