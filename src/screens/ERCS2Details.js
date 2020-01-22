import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  TouchableNativeFeedback,
  Modal,
  TouchableHighlight,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Button,
  Text,
  Left,
  Right,
  ListItem,
  List,
  Icon,
  Content,
  Container,
  Body,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

export default class ERCS2Details extends React.Component {
  render() {
    return (
      <Container>
        <ScrollView backgroundColor="#f5f5f5">
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <View style={styles.viewRcsDetails}>
            <List>
              <ListItem noIndent style={{borderBottomWidth: 0}}>
                <Left>
                  <Text style={styles.ERCSNumber}>M2001A002006</Text>
                </Left>
                <Right>
                  {/* <Text style={styles.StatusApproved}>Approved</Text> */}
                  {/* <Text style={styles.StatusCancelled}>Cancelled</Text> */}
                  <Text style={styles.StatusOthers}>Disapproved</Text>
                  {/*<Text style={styles.StatusOthers}>Waiting</Text> */}
                </Right>
              </ListItem>
            </List>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.rowRcsDetails}>
                <Icon
                  type="Feather"
                  name="check-circle"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>VDM-121920-1</Text>
              </View>
              <View style={styles.rowRcsDetails}>
                <Icon
                  type="Feather"
                  name="smile"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>Juan Dela Cruz</Text>
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
                <Icon
                  type="Feather"
                  name="clock"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>01/04/2020</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.rowRcsDetails}>
                <Icon
                  type="Feather"
                  name="map-pin"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>Makati Medical Center</Text>
              </View>
              <View style={styles.rowRcsDetails}>
                <Icon
                  type="Feather"
                  name="user"
                  style={styles.iconRcsDetails}
                />
                <Text style={styles.textRcsDetails}>Dr. Juan Dela Cruz</Text>
              </View>
            </View>
            {/* <View>
              <View style={styles.divider} />
              <View style={{flexDirection: 'row'}}>
                <Left style={{marginHorizontal: 20}}>
                  <Text note>Cancelled by you</Text>
                </Left>
                <Right style={{alignSelf: 'flex-end'}}>
                  <Button
                    light
                    style={{margin: 10, elevation: 0, shadowOpacity: 0}}
                    onPress={() =>
                      this.props.navigation.navigate('ERCS2CancelDetailsPage')
                    }>
                    <Text style={styles.buttonChangeDetails}>
                      Check Details
                    </Text>
                  </Button>
                </Right>
              </View>
            </View> */}
            <View>
              <View style={styles.divider} />
              <View style={{flexDirection: 'row'}}>
                <Left style={{marginHorizontal: 20}}>
                  <Text note>Request had been disapproved</Text>
                </Left>
                <Right style={{alignSelf: 'flex-end'}}>
                  <Button
                    light
                    style={{margin: 10, elevation: 0, shadowOpacity: 0}}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'ERCS2DisapprovedDetailsPage',
                      )
                    }>
                    <Text style={styles.buttonChangeDetails}>
                      Check Details
                    </Text>
                  </Button>
                </Right>
              </View>
            </View>
          </View>
          <View style={styles.viewOtherDetails}>
            <Text style={styles.cardTitle}>APPROVED PROCEDURES</Text>
            <Text
              style={{
                color: '#c4c4c4',
                textAlign: 'center',
                justifyContent: 'center',
              }}>
              Approved procedures here...
            </Text>
          </View>
          <View style={styles.viewOtherDetails}>
            <Text style={styles.cardTitle}>DISAPPROVED PROCEDURES</Text>

            <Text
              style={{
                color: '#c4c4c4',
                textAlign: 'center',
                justifyContent: 'center',
              }}>
              Disapproved procedures here...
            </Text>
            <View style={styles.divider} />
            <View>
              <Left />
              <Right style={{alignSelf: 'flex-end'}}>
                <Button
                  light
                  style={{margin: 10, elevation: 0, shadowOpacity: 0}}>
                  <Text
                    style={styles.buttonChangeDetails}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'ERCS2DisapprovedProcedurePage',
                      )
                    }>
                    Check Details
                  </Text>
                </Button>
              </Right>
            </View>
          </View>
          <View style={styles.viewOtherDetails}>
            <Text style={styles.cardTitle}>UPLOADED REQUIREMENTS</Text>
            <Text
              style={{
                color: '#c4c4c4',
                textAlign: 'center',
                justifyContent: 'center',
              }}>
              Uploaded requirements here...
            </Text>
          </View>
          <View style={styles.viewButton}>
            <Button iconLeft block rounded info style={styles.buttonSend}>
              <Icon type="FontAwesome" name="send-o" />
              <Text>Send to e-mail</Text>
            </Button>
            <Button block rounded iconLeft style={styles.buttonCancel}>
              <Icon type="MaterialCommunityIcons" name="cancel" />
              <Text>Cancel this Request</Text>
            </Button>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  ERCSNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#e74c3c',
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
    color: '#fff',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonCancel: {
    color: '#fff',
    backgroundColor: '#e74c3c',
  },
  viewButton: {
    margin: 20,
  },
  rowRcsDetails: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
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
  },
  viewRcsDetails: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingBottom: 5,
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
  },
  StatusOthers: {
    color: '#c4c4c4',
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
});
