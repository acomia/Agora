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
  CardItem,
  Input,
  Title,
  Card,
  Header,
  Button,
  Text,
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
import {DataTable} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

export default class ERCS1Request extends React.Component {
  render() {
    return (
      <Container style={{display: 'flex'}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTitle}>Request for e-RCS 2</Text>
            <Text style={styles.subHeader}>
              Kindly provide all necessary information needed to request for
              Referral Control Sheet 2 (RCS 2).
            </Text>
          </View>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Choose hospital/facility</Text>
            <Input style={styles.formInput} />
          </View>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Requesting physician</Text>
            <Input style={styles.formInput} />
          </View>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Laboratory procedure/s</Text>
            <Input style={styles.formInput} />
          </View>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Chief complaint</Text>
            <Input style={styles.formInput} />
          </View>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Choose doctor</Text>
            <Input style={styles.formInput} />
          </View>
          <View style={{paddingHorizontal: 20}}>
            <Card style={{borderRadius: 10, justifyContent: 'center'}}>
              <CardItem style={{borderRadius: 10}}>
                <Body style={{alignContent: 'center'}}>
                  <Icon
                    type="Ionicons"
                    name="md-attach"
                    style={{color: '#2d2d2d', alignSelf: 'center'}}
                  />
                  <Text
                    style={{
                      color: '#2d2d2d',
                      fontSize: 14,
                      alignSelf: 'center',
                    }}>
                    Upload file/s
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </View>
          <View style={styles.viewButton}>
            <Button
              block
              rounded
              style={styles.buttonStyle}
              onPress={() =>
                this.props.navigation.navigate('ERCS2SuccessPage')
              }>
              <Text>Submit</Text>
            </Button>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  headerStyle: {
    height: 150,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#e74c3c',
  },
  subHeader: {
    color: '#6d6e72',
  },
  formInput: {
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  formLabel: {
    marginHorizontal: 20,
    color: '#6d6e72',
  },
  formStyle: {
    marginVertical: 10,
  },
  viewButton: {
    margin: 20,
  },
  buttonStyle: {
    backgroundColor: '#e74c3c',
    color: '#fff',
  },
});
