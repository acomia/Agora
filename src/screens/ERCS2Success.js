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
  Container,
  Header,
  Input,
  Button,
  Text,
  Title,
  Left,
  Right,
  Body,
  Label,
  Thumbnail,
  ListItem,
  Icon,
  Item,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

export default class ERCS2Success extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            paddingHorizontal: 30,
          }}>
          <Icon
            type="SimpleLineIcons"
            name="check"
            style={{fontSize: 80, color: '#e74c3c', marginBottom: 5}}
          />
          <Text style={styles.headerTitle}>Done!</Text>
          <Text style={styles.subHeader}>
            Your e-RCS 2 no. for this transaction is
          </Text>
          <Text style={styles.ercsText}>{global.rcs2Num}</Text>
          <Text style={styles.subHeader1}>
            Our Customer Service Specialist is currently validating your
            request. Once approved, we will send you an e-mail with the Referral
            Control Sheet 2 (RCS 2) attached.
          </Text>
          <Text style={styles.subHeader1}>
            You may print the form and proceed with the availment from your
            chosen hospital/facility.
          </Text>
        </View>
        <View style={styles.viewButton}>
          <Button
            block
            rounded
            iconLeft
            info
            style={styles.buttonTransaction}
            onPress={() => this.props.navigation.push('ERCS2HistoryPage')}>
            <Icon type="MaterialCommunityIcons" name="history" />
            <Text>Transaction history</Text>
          </Button>
          <Button
            block
            rounded
            iconLeft
            style={styles.buttonHome}
            onPress={() => this.props.navigation.push('DashboardPage')}>
            <Icon type="Ionicons" name="md-home" />
            <Text>Go back home</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#e74c3c',
    marginBottom: 30,
    textAlign: 'center',
  },
  subHeader: {
    color: '#6d6e72',
    textAlign: 'center',
  },
  subHeader1: {
    color: '#6d6e72',
    textAlign: 'justify',
    marginTop: 30,
  },
  ercsText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonHome: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    justifyContent: 'center',
  },
  buttonTransaction: {
    color: '#fff',
    justifyContent: 'center',
    marginBottom: 20,
  },
  viewButton: {
    flex: 1,
    margin: 20,
  },
});
