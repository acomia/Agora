import React from 'react';
import {StyleSheet, View, StatusBar, Dimensions, Image} from 'react-native';
import {Container, Button, Text, Icon} from 'native-base';
import SwiperFlatList from 'react-native-swiper-flatlist';

export default class ERCS2Landing extends React.Component {
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
            paginationActiveColor="#e74c3c"
            paginationStyleItem={{height: 10, width: 10, marginHorizontal: 5}}
            paginationStyle={{paddingVertical: 30}}>
            <View style={[styles.child, {backgroundColor: 'transparent'}]}>
              <Image
                source={require('../../assets/images/select-procedure.png')}
                style={styles.swiperImage}
                resizeMode="contain"
              />
              <Text style={styles.swiperTitle}>
                Step 1: Select laboratory procedures
              </Text>
              <Text style={styles.swiperSubtitle}>
                Provide the necessary information needed to complete your
                request.
              </Text>
            </View>
            <View style={[styles.child, {backgroundColor: 'transparent'}]}>
              <Image
                source={require('../../assets/images/upload.png')}
                style={styles.swiperImage}
                resizeMode="contain"
              />
              <Text style={styles.swiperTitle}>
                Step 2: Upload your medical prescriptions
              </Text>
              <Text style={styles.swiperSubtitle}>
                You may upload your medical prescriptions provided by your
                doctor for our reference.
              </Text>
            </View>
            <View style={[styles.child, {backgroundColor: 'transparent'}]}>
              <Image
                source={require('../../assets/images/hourglass.png')}
                style={styles.swiperImage}
                resizeMode="contain"
              />
              <Text style={styles.swiperTitle}>Step 3: Wait for approval</Text>
              <Text style={styles.swiperSubtitle}>
                Wait for a couple of minutes for us to validate your request.
              </Text>
            </View>
            <View style={[styles.child, {backgroundColor: 'transparent'}]}>
              <Image
                source={require('../../assets/images/healthcare-and-medical.png')}
                style={styles.swiperImage}
                resizeMode="contain"
              />
              <Text style={styles.swiperTitle}>
                Step 4: Avail your diagnostic procedures
              </Text>
              <Text style={styles.swiperSubtitle}>
                Once approved, you may print and avail your diagnostic
                procedures in your chosen facility.
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
            onPress={() => this.props.navigation.navigate('ERCS2RequestPage')}>
            <Icon type="FontAwesome" name="pencil-square-o" />
            <Text>Create request now</Text>
          </Button>
          <Button
            iconLeft
            block
            light
            rounded
            style={{backgroundColor: '#fff'}}
            onPress={() => this.props.navigation.navigate('ERCS2HistoryPage')}>
            <Icon
              type="MaterialCommunityIcons"
              name="history"
              style={{color: '#e74c3c', backgroundColor: '#fff'}}
            />
            <Text style={{color: '#e74c3c'}}>Transaction history</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonProceed: {
    backgroundColor: '#e74c3c',
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
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  swiperSubtitle: {
    color: '#6d6e72',
    textAlign: 'center',
  },
});
