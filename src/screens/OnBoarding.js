import React from 'react'
import { StyleSheet, View, Dimensions, Image, ImageBackground } from 'react-native'
import { Container, Header, Content, Button, Text, H1 } from 'native-base'
import SwiperFlatList from 'react-native-swiper-flatlist';

export default class OnBoarding extends React.Component {

  render() {


    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.Section1}>
            {/* <View style={styles.content1}> */}
            <View style={styles.swiperContainer}>
              <SwiperFlatList
                autoplay
                autoplayDelay={2}
                autoplayLoop
                index={2}
                showPagination
                paginationDefaultColor="#fff"
                paginationActiveColor="#5fb650">
                <View style={styles.child}>
                  <ImageBackground source={require('../../assets/images/photo1.jpg')} style={styles.backgroundImage} />
                </View>
                <View style={styles.child}>
                  <ImageBackground source={require('../../assets/images/photo2.jpg')} style={styles.backgroundImage} />
                </View>
                <View style={styles.child}>
                  <ImageBackground source={require('../../assets/images/photo3.jpg')} style={styles.backgroundImage} />
                </View>
                <View style={styles.child}>
                  <ImageBackground source={require('../../assets/images/photo4.jpg')} style={styles.backgroundImage} />
                </View>
                <View style={styles.child}>
                  <ImageBackground source={require('../../assets/images/photo5.jpg')} style={styles.backgroundImage} />
                </View>
              </SwiperFlatList>
            </View>
            {/* </View> */}
            <View style={styles.Section2}>
              <Text style={styles.AppTitle}>
                <H1 style={styles.AppTitle}>Intellicare Mobile App</H1>
              </Text>
              <Text style={styles.AppDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </Text>
              <View style={styles.Buttons}>
                <Button rounded success style={{ flex: 1, marginHorizontal: 10 }} onPress={() => this.props.navigation.navigate('LoginPage')}>
                  <Text> Login </Text>
                </Button>
                <Button rounded bordered light style={{backgroundColor:"#fff", flex: 1, marginHorizontal: 10 }}>
                  <Text style={{ color: '#5fb650' }} onPress={() => this.props.navigation.navigate('RegisterPage')}> Sign Up </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>

      </Container>

    );
  };
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

  buttonLogin: {
    color: '#2ecc71',
    padding: 20,
  },
  container: {
    display: 'flex',
    flex: 1,
  },
  Section1: {
    flex: 1,
    backgroundColor: '#f5f5f5',

  },
  Section2: {
    flex: 1,
    height: height * 1.0,
    padding: 20,
    paddingBottom: 100,
    position: 'absolute',
    justifyContent: 'flex-end'
  },
  content1: {
    flex: 6,
  },
  linkSkip: {
    color: '#2ecc71',
    fontWeight: "bold",
    alignSelf: 'flex-end'
  },
  AppTitle: {
    color: '#5fb650',
    alignSelf: "center",
    fontWeight: "bold",
    padding: 10,
  },
  AppDescription: {
    color: '#fff',
    fontSize: 14,
    textAlign: "center",
  },
  Buttons: {
    flexDirection: 'row',
    padding: 20,
  },
  child: {
    flex: 1,
    height: height * 1.0,
    width,
    justifyContent: 'center'
  },
  text: {
    fontSize: width * 0.50,
    textAlign: 'center'
  },
  swiperContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "stretch",
  },
  paginationStyle:{
    color: "#fff",
    backgroundColor: "#fff",
  }
})


