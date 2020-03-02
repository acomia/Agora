import * as React from 'react';
import {View, Text} from 'react-native';

import styles from './IntellimapStyle';

export const Cluster = props => {
  const {count} = props;
  return (
    <View style={styles.clusterStyle}>
      <Text style={styles.clusterTextStyle}>{count}</Text>
    </View>
  );
};
