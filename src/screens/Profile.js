import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  Left,
  Right,
  Body,
  Label,
  ListItem,
  Thumbnail,
  Item,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

export default class Profile extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.header}>
          <View style={{flex: 1, justifyContent: "center"}}>
            <Thumbnail
              large
              style={{alignSelf: 'center'}}
              source={require('../../assets/images/sample-image-circle.png')}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 2, justifyContent: "center", paddingLeft: 10}}>
            <Label style={styles.labelNickname}>Frederick</Label>
            <Label style={styles.labelUserID}>User ID: 123456</Label>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Full name</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>Frederick Serafino</Text>
            </Body>
          </Item>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Gender</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>Male</Text>
            </Body>
          </Item>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Birth date</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>07/11/1994</Text>
            </Body>
          </Item>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Email</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>sample@email.com</Text>
            </Body>
          </Item>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Intellicare Account No.</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>80-00-00000-00000-00</Text>
            </Body>
          </Item>
          <Item style={styles.itemStyle}>
            <Left>
              <Label style={styles.itemLabel}>Intellicare Card No.</Label>
            </Left>
            <Body style={{alignItems: 'flex-end'}}>
              <Text style={styles.itemInfo}>11950000092817266</Text>
            </Body>
          </Item>
        </View>
        <View style={{flex: 1}}>
          <Button bordered success block style={{marginHorizontal: 20}}>
            <Text>Edit Profile</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#5fb650',
    paddingHorizontal: 70,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentStyle: {
    paddingVertical: 50,
    marginTop: -45,
    backgroundColor: '#fff',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: 'center',
    shadowColor: '#2d2d2d',
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  headerStyle: {
    height: 150,
    backgroundColor: '#5fb650',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  itemStyle: {
    padding: 20,
  },
  profileInfo: {
    flex: 4,
  },
  itemLabel: {
    color: '#2d2d2d',
    fontWeight: 'bold',
  },
  itemInfo: {
    color: '#b2bec3',
  },
  labelNickname: {
    color: '#fff',
    fontWeight: 'bold',
  },
  labelUserID: {
    color: '#fff',
    fontSize: 14,
  },
});
