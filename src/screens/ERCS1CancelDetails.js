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
import moment from 'moment';

export default class ERCS1CancelDetails extends React.Component {
  render() {
    const { navigation } = this.props;
    const { cancelDate, cancelRemarks } = navigation.state.params

    return (
      <Container style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.viewCancelDetails}>
          <List>
            <ListItem noIndent>
              <Left style={{ flex: 2 }}>
                <Text>Cancelled by</Text>
              </Left>
              <Right style={{ flex: 3 }}>
                <Text note>You</Text>
              </Right>
            </ListItem>
            <ListItem noIndent>
              <Left style={{ flex: 2 }}>
                <Text>Cancelled at</Text>
              </Left>
              <Right style={{ flex: 3 }}>
                <Text note>{moment(cancelDate).format('L')}</Text>
              </Right>
            </ListItem>
            <ListItem noIndent>
              <View style={{ flexDirection: 'column' }}>
                <Text>Reason for Cancellation</Text>
                <Text note>{cancelRemarks}</Text>
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
  viewCancelDetails: {
    marginTop: 5,
    backgroundColor: '#fff',
  },
});
