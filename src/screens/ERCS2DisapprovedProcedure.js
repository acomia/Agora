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
  FlatList,
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
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

export default class ERCS2DisapprovedProcedure extends React.Component {
  render() {
    const { navigation } = this.props;
    let status = navigation.getParam('procstatus', '');
    let appvdby = navigation.getParam('procappvdby', '');
    let appvddate = navigation.getParam('procappvddate', '');
    let remarks = navigation.getParam('procremarks', '');
    let procdata = navigation.getParam('procdata', []);
   console.log('summproc',procdata);
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
                <Text>Disapproved by </Text>
              </Left>
              <Right style={{flex: 3}}>
                <Text note>{appvdby}</Text>
              </Right>
            </ListItem>
            <ListItem noIndent>
              <Left style={{flex: 2}}>
                <Text>Disapproved at</Text>
              </Left>
              <Right style={{flex: 3}}>
                <Text note>{appvddate}</Text>
              </Right>
            </ListItem>
          </List>
        </View>
        <View style={styles.viewSection}>
          <Text style={styles.cardTitle}>Summary of Procedures</Text>
            <FlatList
              roundAvatar
              data={procdata}
              renderItem={({item}) => 
              <View>
                <View>
                  <Text
                    style={{
                      color: '#c4c4c4',
                      textAlign: 'center',
                      justifyContent: 'center',
                  }}>{item.status === 'D' ? item.procedure_name : null}</Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#c4c4c4',
                      textAlign: 'center',
                      justifyContent: 'center',
                  }}>{item.status === 'D' ? item.category : null}</Text>
                </View>
              </View>}
              //keyExtractor={(item, index) => item}
              //ItemSeparatorComponent={this.renderSeparator}
          />
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
