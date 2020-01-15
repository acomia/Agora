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

export default class ERCS1Request extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View
          style={styles.headerStyle}>
          <Text style={styles.headerTitle}>
            Create your e-RCS1
          </Text>
          <Text style={styles.subHeader}>
            Kindly provide all necessary information to create your e-Referral
            Control Sheet 1 (e-RCS 1) which you can use for your Consultation.
          </Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Choose member</Text>
            <Input style={styles.formInput} />
          </View>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Type of consultation</Text>
            <Input style={styles.formInput} />
          </View>
          <View style={styles.formStyle}>
            <Text style={styles.formLabel}>Choose hospital/facility</Text>
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
          <View style={styles.viewButton}>
            <Button block rounded success style={styles.buttonStyle}  onPress={() => this.props.navigation.navigate('ERCS1SuccessPage')}>
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
  container: {
    backgroundColor: '#fff',
  },
  headerStyle: {
    height: 150,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#5fb650'
  },
  subHeader: {
    color: "#cacaca"
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
    margin: 20
  },
  buttonStyle: {
    backgroundColor: "#5fb650",
    color: "#fff",
    justifyContent: "center"
  }
});
