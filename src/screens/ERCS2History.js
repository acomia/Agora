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
  Badge,
  Item,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

export default class ERCS2History extends React.Component {
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
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.ERCSNumber}>M2001A002006</Text>
                  <Badge style={styles.badgeStyle}>
                    <Text style={styles.badgeText}>Approved</Text>
                  </Badge>
                </View>
                <View style={styles.rowDetails}>
                  <Icon type="EvilIcons" name="user" style={styles.iconLabel} />
                  <Text note style={styles.textPatient}>
                    Dela Cruz, Juan
                  </Text>
                </View>
                <View style={styles.rowDetails}>
                  <Icon
                    type="EvilIcons"
                    name="location"
                    style={styles.iconLabel}
                  />
                  <Text note>Makati Medical Center Makati</Text>
                </View>
                <View style={styles.rowDetails}>
                  <Icon
                    type="EvilIcons"
                    name="clock"
                    style={styles.iconLabel}
                  />
                  <Text note>01/02/2020</Text>
                </View>
              </Body>
              <Right>
                <Text note>01/01/2020</Text>
                <Button transparent>
                  <Text
                    style={styles.buttonView}
                    onPress={() =>
                      this.props.navigation.navigate('ERCS2DetailsPage')
                    }>
                    View
                  </Text>
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
    color: '#e74c3c',
  },
  iconLabel: {
    color: '#6d6e72',
    fontSize: 20,
    marginLeft: 18,
    marginTop: 1,
  },
  buttonView: {
    color: '#3498db',
  },
  badgeStyle: {
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    padding: 0,
  },
  badgeText: {
    color: '#6d6e72',
    fontStyle: 'italic',
    fontSize: 12,
  },
  rowDetails: {
    flexDirection: 'row',
  },
});
