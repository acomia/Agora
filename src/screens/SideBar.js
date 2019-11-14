import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  ImageBackground,
} from 'react-native';
import {
  Container,
  Header,
  Text,
  Icon,
  Left,
  Body,
  ListItem,
} from 'native-base';

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Header span style={{paddingLeft: 0, paddingRight: 0}}>
          <ImageBackground
            source={require('../../assets/images/drawer-header-background.jpg')}
            style={styles.backgroundImage}>
            <Text></Text>
          </ImageBackground>
        </Header>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('MembersPage')}>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              <Icon type="MaterialCommunityIcons" name="account-outline" />
            </Left>
            <Body style={styles.listLabel}>
              <Text style={styles.listStyle}>Member Profiles</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('IntellimapPage')}>
          <ListItem icon style={styles.listItemStyle}>
            <Left>
              <Icon active name="md-map" />
            </Left>
            <Body style={styles.listLabel}>
              <Text>IntelliMap</Text>
            </Body>
          </ListItem>
        </TouchableNativeFeedback>
        {/* <ListItem icon style={styles.listItemStyle}>
                    <Left>
                        <Icon active name="ios-paper" />
                    </Left>
                    <Body style={styles.listLabel}>
                        <Text>Request ERCS1</Text>
                    </Body>
                </ListItem>
                <ListItem icon style={styles.listItemStyle}>
                    <Left style={styles.listLabel}>
                        <Icon type="MaterialCommunityIcons" active name="account-search-outline" />
                    </Left>
                    <Body style={styles.listLabel}>
                        <Text>Find a Medical Provider</Text>
                    </Body>
                </ListItem>
                <View style={styles.divider} />
                <ListItem icon style={styles.listItemStyle}>
                    <Left style={styles.listLabel}>
                        <Icon type="MaterialCommunityIcons" name='arrow-collapse-left' style={styles.logoutText} />
                    </Left>
                    <Body style={styles.listLabel}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </Body>
                </ListItem> */}
            </Container>

        );
    };
}

const styles = StyleSheet.create({
  listItemStyle: {
    marginTop: 20,
    borderBottomColor: '#2d2d2d',
  },
  listStyle: {
    color: '#2d2d2d',
  },
  listLabel: {
    borderBottomColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  divider: {
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#c4c4c4',
  },
  logoutText: {
    color: '#c4c4c4',
  },
  navStyle: {
    height: 20,
    width: 20,
  },
});
