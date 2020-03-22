import {StyleSheet} from 'react-native';
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight();
const STATUSBAR_HEIGHT = require('react-native-extra-dimensions-android').getStatusBarHeight();
const CARD_HEIGHT = SCREEN_HEIGHT / 4;
const CARD_WIDTH = SCREEN_WIDTH / 2;
const styles = {
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 40,
  },
  cardContainer: {
    backgroundColor: '#fff',
    height: 200,
    width: 300,
    padding: 20,
    borderRadius: 24,
  },
  cardImage: {
    height: 100,
    width: 300,
    top: 0,
    // position: 'absolute',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  cardTitle: {
    color: '#FF5E3A',
    fontSize: 14,
  },
  cardDescription: {
    fontSize: 12,
    color: 'grey',
  },
  currentPositionCalloutContainer: {
    width: 200,
    height: 40,
    alignContent: 'flex-start',
    padding: 4,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  currentPositionTextStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF5E3A',
    textAlign: 'center',
  },
  calloutMarkerContainer: {
    width: 200,
    alignContent: 'flex-start',
    padding: 4,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  calloutMarkerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5FB650',
  },
  exploreCard: {
    alignItems: 'center',
    padding: 20,
    elevation: 2,
    backgroundColor: 'rgba(0,0,0,.61)',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: 2},
    height: SCREEN_HEIGHT / 10,
    width: CARD_WIDTH,
    overflow: 'hidden',
    borderRadius: 8,
    border: 0.6,
  },
  footerContainer: {
    backgroundColor: '#fff',
  },
  inputContainer: {
    top: STATUSBAR_HEIGHT,
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
  inputWrapper: {
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    backgroundColor: '#fff',
    opacity: 0.9,
    borderRadius: 8,
  },
};

export default styles;
