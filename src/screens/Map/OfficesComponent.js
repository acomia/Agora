import React from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  Image,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight();
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LONGITUDE_DELTA = ASPECT_RATIO * 0.015;
const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 70 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const offices = require('../../../offices.json');

class OfficesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    };
  }
  _renderScrollViewContent() {
    return (
      <View style={styles.scrollViewContent}>
        {offices.map((office, key) => (
          <View key={key} style={styles.row}>
            <MapView
              liteMode
              style={styles.liteMap}
              initialRegion={{
                latitude: office.coords.latitude,
                longitude: office.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              <Marker
                coordinate={{
                  latitude: office.coords.latitude,
                  longitude: office.coords.longitude,
                }}>
                <Image
                  source={require('../../../assets/images/intellicare-icon.png')}
                  style={{height: 46, width: 20}}
                />
              </Marker>
            </MapView>
            <Text style={{fontWeight: 'bold', color: '#000'}}>
              {office.name}
            </Text>
            <Text style={{color: 'grey', fontSize: 11}}>{office.address}</Text>
            <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 11}}>
              {office.phone}
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 11,
              }}>{`${office.ofc_schedule} ${office.ofc_hrs}`}</Text>
          </View>
        ))}
      </View>
    );
  }
  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });
    const headerRadius = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [30, 0],
      extrapolate: 'clamp',
    });
    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });
    const titleBarOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0.9, 1],
      extrapolate: 'clamp',
    });
    const titleImgOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2.5, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: true},
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                setTimeout(() => this.setState({refreshing: false}), 1000);
              }}
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          contentInset={{top: HEADER_MAX_HEIGHT}}
          contentOffset={{y: -HEADER_MAX_HEIGHT}}>
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            {
              borderBottomLeftRadius: headerRadius,
              borderBottomRightRadius: headerRadius,
              transform: [{translateY: headerTranslate}],
            },
          ]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{translateY: imageTranslate}],
              },
            ]}
            source={require('../../../assets/images/intellicareheader.jpg')}
          />
          <Animated.Text
            style={[
              styles.title,
              {
                opacity: titleImgOpacity,
              },
            ]}>
            Intellicare/Avega Offices
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              opacity: titleBarOpacity,
              transform: [{scale: titleScale}, {translateY: titleTranslate}],
            },
          ]}>
          <Text style={styles.title}>Intellicare/Avega Offices</Text>
        </Animated.View>
      </View>
    );
  }
}
const styles = {
  liteMap: {
    height: 150,
  },
  container: {
    flex: 1,
  },
  fill: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#5fb650',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 26 : 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    margin: 10,
  },
};

export default OfficesComponent;
