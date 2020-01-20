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

export default class ERCS1Landing extends React.Component {
  render() {
    return (
      <Container style={{backgroundColor: '#f5f5f5', paddingHorizontal: 30}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Swipeable flatlist goes here...</Text>
        </View>
        <View style={{flex: 1}}>
          {/* <View style={{flexDirection: 'row'}}>
            <Button
              block
              rounded
              style={{flex: 1, backgroundColor: '#c0392b', marginBottom: 10, marginRight: 5}}>
              <Text>With e-RCS 1</Text>
            </Button>
            <Button
              block
              rounded
              danger
              style={{flex: 1, backgroundColor: '#fff', marginBottom: 20, marginLeft: 5}}>
              <Text style={{color: '#c0392b'}}>Without e-RCS 1</Text>
            </Button>
          </View> */}

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
            style={{justifyContent: 'center'}}
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
});
