import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {
  Container,
  Text,
  Card,
  Header,
  Left,
  Right,
  Body,
  Title,
  Item,
  Label,
  Icon,
  Button,
  Content,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

export default class MembInfo extends React.Component {
  render() {
    const { fullname, acct, cardno, birth_date, gender, status, member_type, card_printed_date ,employee_id, room_and_board, maximum_limit, coverage_period} = this.props.navigation.state.params
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Member Information</Text>
          </View>
          <View style={styles.contentStyle}>
            <View style={styles.sectionCard}>
              <Card style={styles.mainCardStyle}>
                <LinearGradient
                  colors={['#fff', '#ececec']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{flex: 1, borderRadius: 20}}>
                  <View style={{flex: 1}}>
                    <ImageBackground
                      source={require('../../assets/images/virtual-card-header.png')}
                      resizeMode="contain"
                      style={styles.intellicareLogo}
                    />
                  </View>
                  <View style={styles.cardInfo}>
                    <Label style={styles.cardName}>{fullname}</Label>
                    <Label style={styles.cardDetails}>INTELLICARE</Label>
                    <View style={{flexDirection: 'row'}}>
                      <Label style={styles.titlecardDetails}>Account No:{' '}</Label>
                      <Label style={styles.cardDetails}>{acct}</Label>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Label style={styles.titlecardDetails}>Card No: </Label>
                      <Label style={styles.cardDetails}>{cardno}</Label>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Label style={styles.titlecardDetails}>Birthdate (mm/yy):{' '}</Label>
                      <Label style={styles.cardDetails}>{birth_date}</Label>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Label style={styles.titlecardDetails}>Gender: </Label>
                      <Label style={styles.cardDetails}>{gender}</Label>
                    </View>
                    <Label style={styles.cardDetails}>W/ DENTAL COVERAGE</Label>
                  </View>
                </LinearGradient>
              </Card>
            </View>
            <View style={styles.viewButtonBenefits}>
              <Button success rounded iconRight>
                <Text>View your Benefits</Text>
                <Icon type="Ionicons" name="ios-arrow-dropright-circle" />
              </Button>
            </View>
          </View>
          <View style={styles.sectionMembInfo}>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Account Status</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.labelStatus}>{status}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Employee ID</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{employee_id}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Member Type</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{member_type}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Civil Status</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>SINGLE</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Relation</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{member_type}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Room and Board</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{room_and_board}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Maximum Limit</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{maximum_limit}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Coverage Period</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{coverage_period}</Label>
              </Body>
            </Item>
            <Item style={styles.itemStyle}>
              <Left>
                <Text style={styles.itemLabel}>Card Printed Date</Text>
              </Left>
              <Body style={styles.itemBody}>
                <Label style={styles.itemInfo}>{card_printed_date}</Label>
              </Body>
            </Item>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 100,
    backgroundColor: '#5fb650',
    paddingHorizontal: 30,
    // borderBottomEndRadius: 50,
    // borderBottomStartRadius: 50,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentStyle: {
    marginTop: -50,
    backgroundColor: 'transparent',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: 'center',
  },
  headerStyle: {
    backgroundColor: '#5fb650',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  mainCardStyle: {
    alignSelf: 'center',
    flex: 1,
    minHeight: 250,
    borderRadius: 20,
    borderColor: '#f5f5f5',
    shadowColor: '#2d2d2d',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    color: '#2d2d2d',
    backgroundColor: '#ffffff',
    width: width * 0.9,
    padding: 0,
  },
  cardInfo: {
    flex: 2,
    paddingHorizontal: 20,
  },
  mainCardText: {
    marginVertical: 15,
    textAlign: 'justify',
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardDetails: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: "#6d6e72",
  },
  titlecardDetails: {
    fontSize: 14,
    color: "#6d6e72"
  },
  intellicareLogo: {
    width: width * 0.9,
    height: height * 0.1,
    borderTopStartRadius: 20,
    overflow: 'hidden',
    marginTop: -3,
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
  viewButtonBenefits: {
    padding: 20,
    alignItems: 'center',
  },
});
