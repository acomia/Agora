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
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

export default class ERCS2DisapprovedDetails extends React.Component {
  render() {
    const { navigation } = this.props;
    const { appvdby, appvddate, remarks } = navigation.state.params
    return (
      <Container style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.viewDisapproveDetails}>
          <List>
            <ListItem noIndent>
              <Left style={{ flex: 2 }}>
                <Text>Disapproved by</Text>
              </Left>
              <Right style={{ flex: 3 }}>
                <Text note>{appvdby}</Text>
              </Right>
            </ListItem>
            <ListItem noIndent>
              <Left style={{ flex: 2 }}>
                <Text>Disapproved at</Text>
              </Left>
              <Right style={{ flex: 3 }}>
                <Text note>{appvddate}</Text>
              </Right>
            </ListItem>
            <ListItem noIndent>
              <View style={{ flexDirection: 'column' }}>
                <Text>Reason of Disapproval</Text>
                <Text note>{remarks}</Text>
              </View>
            </ListItem>
          </List>
        </View>
      </Container>
    );
  }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  viewDisapproveDetails: {
    marginTop: 5,
    backgroundColor: '#fff',
  },
});
