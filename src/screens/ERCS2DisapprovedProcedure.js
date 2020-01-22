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

export default class ERCS2DisapprovedProcedure extends React.Component {
  render() {
    return (
      <Container style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.viewSection}>
          <List>
            <ListItem noIndent>
              <Left style={{flex: 2}}>
                <Text>Disapproved by</Text>
              </Left>
              <Right style={{flex: 3}}>
                <Text note>User</Text>
              </Right>
            </ListItem>
            <ListItem noIndent>
              <Left style={{flex: 2}}>
                <Text>Disapproved at</Text>
              </Left>
              <Right style={{flex: 3}}>
                <Text note>01/01/2020 12:01:00</Text>
              </Right>
            </ListItem>
          </List>
        </View>
        <View style={styles.viewSection}>
          <Text style={styles.cardTitle}>Summary of Procedures</Text>
          <Text
            style={{
              color: '#c4c4c4',
              textAlign: 'center',
              justifyContent: 'center',
            }}>
            Data table here...
          </Text>
        </View>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  viewSection: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 0,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#2d3436',
    padding: 10,
    fontSize: 12,
  },
});
