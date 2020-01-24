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

export default class ERCS2CancelDetails extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.viewCancelDetails}>
          <List>
            <ListItem noIndent>
              <Left style={{flex: 2}}>
                <Text>Cancelled by</Text>
              </Left>
              <Right style={{flex: 3}}>
                <Text note>User</Text>
              </Right>
            </ListItem>
            <ListItem noIndent>
              <Left style={{flex: 2}}>
                <Text>Cancelled at</Text>
              </Left>
              <Right style={{flex: 3}}>
                <Text note>01/01/2020 12:01:00</Text>
              </Right>
            </ListItem>
            <ListItem noIndent>
              <View style={{flexDirection: 'column'}}>
                <Text>Reason for Cancellation</Text>
                <Text note>Others / change of mind</Text>
              </View>
            </ListItem>
          </List>
        </View>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  viewCancelDetails: {
    marginTop: 5,
    backgroundColor: '#fff',
  },
});