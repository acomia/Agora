import React from 'react';
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
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigationParam} from 'react-navigation-hooks';

const content = (
  <View>
    <List
      style={{
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingRight: 50,
        color: '#2d2d2d',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Thumbnail
          square
          source={require('../../assets/images/nav-door.png')}
          style={{height: 20, width: 20, marginHorizontal: 10}}
        />
        <Text note>Room No: </Text>
        <Text note>1001</Text>
      </View>
    </List>
    <List
      style={{
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingRight: 50,
        color: '#2d2d2d',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Thumbnail
          square
          source={require('../../assets/images/nav-coordinator.png')}
          style={{height: 20, width: 20, marginHorizontal: 10}}
        />
        <Text note>Coordinator: </Text>
        <Text note>DELA CRUZ, JUAN</Text>
      </View>
    </List>
    <List
      style={{
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingRight: 50,
        color: '#2d2d2d',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Thumbnail
          square
          source={require('../../assets/images/nav-phone.png')}
          style={{height: 20, width: 20, marginHorizontal: 10}}
        />
        <Text note>(02) 902-3400 loc. 1001</Text>
      </View>
    </List>
    <List
      style={{
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingRight: 50,
        color: '#2d2d2d',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Thumbnail
          square
          source={require('../../assets/images/nav-schedule.png')}
          style={{height: 20, width: 20, marginHorizontal: 10}}
        />
        <Text note>MWF 9:00AM - 12:00PM, TTHS 1:00PM - 5:00PM</Text>
      </View>
    </List>
  </View>
);

const dataArray = [
  {
    title: 'Asian Hospital and Medical Center',
  },
  {
    title: 'Makati Medical Center',
  },
];

export default function DoctorProfile() {
  const drdata = useNavigationParam('drdata');

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
              renderContent={() => content}
            />
          </View>
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
