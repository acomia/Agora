import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';

const SpinnerComponent = () => {
  return (
    <View style={styles.spinnerStyle}>
      <Spinner color={'green'} type="ThreeBounce" />
    </View>
  );
};
const styles = {
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
};
export default SpinnerComponent;
