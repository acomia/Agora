import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  Left,
  Right,
  Body,
  Label,
  ListItem,
  Thumbnail,
  Item,
  Title,
  List,
  Badge,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

const MEMB_ACCOUNTNO = 'memb_accountno';
const membacct = ''
const membinfo = require('../../membinfo.json')
export default class Members extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Account Profiles</Text>
          </View>
          <View style={styles.contentStyle}>
            <List style={styles.listStyle}>
              <ListItem
                thumbnail
                style={styles.listItemMember}
                onPress={() =>
                  this.props.navigation.navigate('MemberInfoPage')
                }>
                <Left>
                  <Thumbnail
                    source={require('../../assets/images/sample-image-square.jpg')}
                  />
                </Left>
                <Body style={{borderBottomWidth: 0}}>
                  <View style={styles.viewNameBadge}>
                    <Text style={styles.listFullname}>Frederick Serafino</Text>
                    <Badge style={styles.badgeStyle}>
                      <Text style={styles.badgeText}>Principal</Text>
                    </Badge>
                  </View>
                  <Text note style={styles.listAccountNote}>
                    80-00-00000-00000-00/1
                  </Text>
                  <Text>ACTIVE</Text>
                </Body>
              </ListItem>
              <ListItem thumbnail style={styles.listItemMember}>
                <Left>
                  <Thumbnail source={require('../../assets/images/user.png')} />
                </Left>
                <Body style={{borderBottomWidth: 0}}>
                  <View style={styles.viewNameBadge}>
                    <Text style={styles.listFullname}>John Doe</Text>
                    <Badge style={styles.badgeStyle}>
                      <Text style={styles.badgeText}>Dependent</Text>
                    </Badge>
                  </View>
                  <Text note style={styles.listAccountNote}>
                    80-00-00000-00000-01/1
                  </Text>
                  <Text>DISAPPROVED</Text>
                </Body>
              </ListItem>
              <ListItem thumbnail style={styles.listItemMember}>
                <Left>
                  <Thumbnail source={require('../../assets/images/user.png')} />
                </Left>
                <Body style={{borderBottomWidth: 0}}>
                  <View style={styles.viewNameBadge}>
                    <Text style={styles.listFullname}>Jane Doe</Text>
                    <Badge style={styles.badgeStyle}>
                      <Text style={styles.badgeText}>Dependent</Text>
                    </Badge>
                  </View>
                  <Text note style={styles.listAccountNote}>
                    80-00-00000-00000-02/1
                  </Text>
                  <Text>DISAPPROVED</Text>
                </Body>
              </ListItem>
            </List>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
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
    paddingVertical: 50,
    marginTop: -45,
    backgroundColor: '#fff',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    justifyContent: 'center',
    shadowColor: '#2d2d2d',
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  headerStyle: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  badgeStyle: {
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#c4c4c4',
    borderWidth: 1,
  },
  badgeText: {
    color: '#c4c4c4',
    fontStyle: 'italic',
  },
  listStyle: {
    backgroundColor: '#fff',
  },
  listItemMember: {
    marginLeft: 0,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#c4c4c4',
  },
  listFullname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5fb650',
  },
  listAccountNote: {
    fontSize: 16,
  },
  viewNameBadge: {
    flexDirection: 'row',
    flex: 1,
  },
});
