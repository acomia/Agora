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
  Image,
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
import SwiperFlatList from 'react-native-swiper-flatlist';

export default class ERCS1Landing extends React.Component {
  render() {
    return (
      <Container style={{backgroundColor: '#f5f5f5', flex: 1}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{flex: 3, paddingVertical: 100}}>
          <SwiperFlatList
            autoplay
            autoplayDelay={5}
            autoplayLoop
            index={0}
            showPagination
            paginationDefaultColor="#c4c4c4"
            paginationActiveColor="#5fb650"
            paginationStyleItem={{height: 10, width: 10, marginHorizontal: 5}}
            paginationStyle={{paddingVertical: 30}}>
            <View style={[styles.child, {backgroundColor: 'transparent'}]}>
              <Image
                source={require('../../assets/images/pencil-1.png')}
                style={styles.swiperImage}
                resizeMode="contain"
              />
              <Text style={styles.swiperTitle}>Step 1: Fill-out your form</Text>
              <Text style={styles.swiperSubtitle}>
                Provide the necessary information needed to complete your form.
              </Text>
            </View>
            <View style={[styles.child, {backgroundColor: 'transparent'}]}>
              <Image
                source={require('../../assets/images/printer.png')}
                style={styles.swiperImage}
                resizeMode="contain"
              />
              <Text style={styles.swiperTitle}>
                Step 2: Print a copy of your form
              </Text>
              <Text style={styles.swiperSubtitle}>
                We'll send you an e-mail with the form attached in it. You just
                need to print and present it to your doctor.
              </Text>
            </View>
            <View style={[styles.child, {backgroundColor: 'transparent'}]}>
              <Image
                source={require('../../assets/images/consult-doctor.png')}
                style={styles.swiperImage}
                resizeMode="contain"
              />
              <Text style={styles.swiperTitle}>
                Step 3: Consult your doctor
              </Text>
              <Text style={styles.swiperSubtitle}>
                Have a talk with your doctor through a medical consultation.
                They'll tell you exactly what you need to do.
              </Text>
            </View>
          </SwiperFlatList>
        </View>
        <View style={{flex: 1, paddingHorizontal: 30}}>
          <Button
            block
            rounded
            iconLeft
            style={styles.buttonProceed}
            onPress={() => this.props.navigation.navigate('ERCS1RequestPage')}>
            <Icon type="FontAwesome" name="pencil-square-o" />
            <Text>Create now</Text>
          </Button>
          <Button
            iconLeft
            block
            light
            rounded
            style={{justifyContent: 'center', backgroundColor: '#fff'}}
            onPress={() => this.props.navigation.navigate('ERCS1HistoryPage')}>
            <Icon
              type="MaterialCommunityIcons"
              name="history"
              style={{color: '#5fb650'}}
            />
            <Text style={{color: '#5fb650'}}>Transaction history</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonProceed: {
    justifyContent: 'center',
    backgroundColor: '#5fb650',
    marginBottom: 10,
  },
  swiperFeatures: {
    flex: 1,
  },
  child: {
    height: height * 0.5,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 50,
  },
  swiperImage: {
    height: height * 0.2,
    width: width * 0.3,
    alignSelf: 'center',
  },
  swiperTitle: {
    color: '#5fb650',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
  },
  swiperSubtitle: {
    color: '#6d6e72',
    textAlign: 'center',
  },
});
