import {StyleSheet} from 'react-native';

const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth();
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight();
const STATUSBAR_HEIGHT = require('react-native-extra-dimensions-android').getStatusBarHeight();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerStyle: {
    backgroundColor: 'transparent',
  },
  searchBarContainerStyle: {
    top: STATUSBAR_HEIGHT,
    width: SCREEN_WIDTH,
    height: 40,
    backgroundColor: 'transparent',
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    opacity: 0.3,
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#1AA811',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonStyle: {
    alignSelf: 'stretch',
    borderRadius: 6,
    justifyContent: 'center',
    flexDirection: 'row',
    top: 2,
    width: 150,
    height: 30,
    marginHorizontal: 3,
    shadowColor: '#f5f5f5',
    shadowOffset: {width: 2, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 2,
  },
  directionButtonStyle: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1AA811',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '20%',
    height: 30,
  },
  markerDetailsStyle: {
    marginLeft: 8,
    top: SCREEN_HEIGHT > 750 ? SCREEN_HEIGHT / 1.7 : SCREEN_HEIGHT / 2.5,
    width: '96%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  markerDetTextStyle: {
    color: '#000',
    fontSize: 10,
    textAlign: 'auto',
  },
  markerDetImgStyle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  markerDetSchedStyle: {
    backgroundColor: 'transparent',
    marginVertical: 2,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '10%',
  },
  markerDetListStyle: {
    backgroundColor: 'transparent',
    marginVertical: 2,
    borderRadius: 5,
  },
  imgNameStyle: {
    backgroundColor: 'white',
    marginVertical: 2,
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    height: '30%',
  },
  listViewItemSeparatorStyle: {
    height: 0.4,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: '#5FB650',
    marginHorizontal: 20,
  },
  hospitalNameSeachTextStyle: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hospitalSubitemSeachTextStyle: {
    alignSelf: 'flex-start',
    fontSize: 10,
    color: 'gray',
  },
  searchViewStyle: {
    backgroundColor: '#fff',
    marginLeft: 20,
    width: SCREEN_WIDTH * 0.9,
  },
  arrowDownDetailsStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 100,
    bottom: 13,
  },
});

export default styles;
