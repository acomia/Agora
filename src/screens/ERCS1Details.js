import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Button,
  Text,
  Left,
  Right,
  ListItem,
  List,
  Icon,
  Container,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, NavigationActions} from 'react-navigation';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modal';
import moment from 'moment';

export default class ERCS1Details extends React.Component {
  render() {
    return (
      <ScrollView backgroundColor="#f5f5f5">
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <View style={styles.viewRcsDetails}>
          <List>
            <ListItem noIndent style={{borderBottomWidth: 0}}>
              <Left style={{flex: 2}}>
                <Text style={styles.ERCSNumber}>D2001A0000217</Text>
              </Left>
              <Right style={{flex: 1}}>
                <Text style={styles.StatusApproved}>Approved</Text>
              </Right>
            </ListItem>
          </List>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.rowRcsDetails}>
              <Icon type="Feather" name="smile" style={styles.iconRcsDetails} />
              <Text style={styles.textRcsDetails}>JUAN DELA CRUZ</Text>
            </View>
            <View style={styles.rowRcsDetails}>
              <Icon
                type="Feather"
                name="clipboard"
                style={styles.iconRcsDetails}
              />
              <Text style={styles.textRcsDetails}>FIRST (INITIAL)</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.rowRcsDetails}>
              <Icon
                type="Feather"
                name="calendar"
                style={styles.iconRcsDetails}
              />
              <Text style={styles.textRcsDetails}>01/01/2020</Text>
            </View>
            <View style={styles.rowRcsDetails}>
              <Icon type="Feather" name="clock" style={styles.iconRcsDetails} />
              <Text style={styles.textRcsDetails}>01/02/2020</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.rowRcsDetails}>
              <Icon
                type="Feather"
                name="map-pin"
                style={styles.iconRcsDetails}
              />
              <Text style={styles.textRcsDetails}>MAKATI MEDICAL CENTER</Text>
            </View>
            <View style={styles.rowRcsDetails}>
              <Icon type="Feather" name="user" style={styles.iconRcsDetails} />
              <Text style={styles.textRcsDetails}>DR. MARIA DELA CRUZ</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewOtherDetails}>
          <Text style={styles.cardTitle}>CHIEF COMPLAINT</Text>
          <Text note style={styles.textComplaint}>
            Sample chief complaint here
          </Text>
        </View>
        <View style={styles.viewOtherDetails}>
          <View style={{flexDirection: 'row'}}>
            <Left style={{marginLeft: 10}}>
              <Text note>Cancelled by you</Text>
            </Left>
            <Right style={{alignSelf: 'flex-end'}}>
              <Button
                light
                style={{margin: 10, elevation: 0, shadowOpacity: 0}}
                onPress={() =>
                  this.props.navigation.navigate('ERCS1CancelDetailsPage')
                }>
                <Text style={styles.buttonChangeDetails}>Check Details</Text>
              </Button>
            </Right>
          </View>
        </View>
        <View style={styles.viewButton}>
          <Button danger block rounded iconLeft>
            <Icon type="MaterialCommunityIcons" name="cancel" />
            <Text>Cancel this Request</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  ERCSNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5fb650',
  },
  iconLabel: {
    color: '#6d6e72',
    fontSize: 20,
    marginLeft: 18,
    marginTop: 1,
  },
  buttonView: {
    color: '#3498db',
  },
  badgeStyle: {
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    padding: 0,
  },
  badgeText: {
    color: '#6d6e72',
    fontStyle: 'italic',
    fontSize: 12,
  },
  rowDetails: {
    flexDirection: 'row',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#2d3436',
    padding: 10,
    fontSize: 12,
  },
  buttonSend: {
    marginBottom: 20,
  },
  buttonCancel: {
    backgroundColor: 'red',
  },
  viewButton: {
    margin: 20,
  },
  rowRcsDetails: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconRcsDetails: {
    fontSize: 16,
    padding: 5,
    color: '#6d6e72',
  },
  textRcsDetails: {
    color: '#6d6e72',
    fontSize: 14,
    marginTop: 4,
    marginRight: 20,
    textAlign: 'left',
  },
  viewRcsDetails: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingBottom: 5,
    paddingLeft: 0,
  },
  viewOtherDetails: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingBottom: 5,
  },
  StatusApproved: {
    color: '#5fb650',
    fontWeight: 'bold',
  },
  StatusCancelled: {
    color: 'red',
    fontWeight: 'bold',
  },
  StatusPending: {
    color: '#F4D03F',
    fontWeight: 'bold',
  },
  StatusDisapproved: {
    color: '#c4c4c4',
    fontWeight: 'bold',
  },
  divider: {
    marginTop: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: '#c4c4c4',
  },
  buttonChangeDetails: {
    textTransform: 'capitalize',
    color: '#2d3436',
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#ffff',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  textModalStyle: {
    color: '#5fb650',
    fontSize: 16,
    fontWeight: 'bold',
  },
  procedureListTextStyle: {
    color: '#6d6e72',
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: '#c4c4c4',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    fontSize: 12,
    flexDirection: 'row',
  },
  textComplaint: {
    marginHorizontal: 20,
  },
});
