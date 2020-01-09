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

export default class Benefits extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Benefits</Text>
        </View>
        <View style={styles.contentStyle}>
          <View style={styles.sectionMembInfo}>
            <Text style={styles.headerText}>
              Your general benefits include:
            </Text>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>In-Patient</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.labelStatus}></Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Out-Patient</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}></Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Emergency</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}></Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Dental</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}></Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Maternity</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}></Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Philhealth</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}></Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>APE</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}></Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>AD&D</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}></Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>OPD Medicine</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}></Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Hospital Allowance</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}></Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Exclusions</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}></Label>
              </Body>
            </Item>
          </View>
        </View>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: '#5fb650',
    paddingHorizontal: 30,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentStyle: {
    flex: 1,
    paddingVertical: 20,
    marginTop: -45,
    backgroundColor: '#fff',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    shadowColor: '#2d2d2d',
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  sectionMembInfo: {
    marginVertical: 10,
  },
  itemStyle: {
    padding: 20,
  },
  itemLabel: {
    color: '#6d6e72',
    fontWeight: 'bold',
  },
  itemInfo: {
    color: '#b2bec3',
    textTransform: 'uppercase',
  },
  itemBody: {
    alignItems: 'flex-end',
  },
  labelStatus: {
    color: 'green',
    fontWeight: 'bold',
  },
  headerText: {
    color: '#5fb650',
    marginVertical: 10,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
