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
  List,
  Icon,
  Item,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

export default class ERCS1Landing extends React.Component {
  render() {
    return (
      <ScrollView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View>
          <List>
            <ListItem noIndent>
              <Body>
                <Text style={styles.ERCSNumber}>M2001A002006</Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type="Ionicons"
                    name="ios-person"
                    style={styles.iconPatient}
                  />
                  <Text note style={styles.textPatient}>
                    Dela Cruz, Juan
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type="MaterialIcons"
                    name="room"
                    style={styles.iconHospital}
                  />
                  <Text note>Makati Medical Center Makati</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type="Feather"
                    name="clock"
                    style={styles.iconHospital}
                  />
                  <Text note>01/02/2020</Text>
                </View>
              </Body>
              <Right>
                <Text note>01/01/2020</Text>
                <Button transparent>
                  <Text style={styles.buttonCancel}>Cancel</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </View>
      </ScrollView>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  ERCSNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5fb650',
  },
  textPatient: {
    marginLeft: 13,
  },
  iconPatient: {
    color: '#6d6e72',
    fontSize: 16,
    marginLeft: 20,
  },
  iconHospital: {
    color: '#6d6e72',
    fontSize: 16,
    marginLeft: 18,
  },
  buttonCancel: {
    color: '#e74c3c',
  },
});
