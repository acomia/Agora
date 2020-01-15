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
      return(
          <Container>

          </Container>
      );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create(
    {
        
    }
    );
