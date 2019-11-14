import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {
  Container,
  Text,
  Header,
  Left,
  Right,
  Body,
  Title,
  Footer,
  Content,
  Item,
  Label,
  Icon,
  Button,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

export default class tabOne extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Posted Utilization</Text>
            <Text style={styles.headerSubheader}>
              Billed availments and encoded in Intellicare system.
            </Text>
          </View>
          <View style={styles.contentStyle}>
            <Content>
              <View>
                <Text style={{alignSelf: 'center', justifyContent: 'center'}}>
                  Data table goes here...
                </Text>
              </View>
            </Content>
          </View>
        </ScrollView>
        <Footer style={styles.footerStyle}>
          <Content>
            <Item style={styles.footeritemStyle}>
              <Left>
                <Text style={styles.footeritemLabel}>Total Posted Amount:</Text>
              </Left>
              <Body style={styles.footeritemBody}>
                <Label style={styles.footerlabelTotalAmount}>0.00</Label>
              </Body>
            </Item>
          </Content>
        </Footer>
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
  headerSubheader: {
    fontSize: 12,
    color: '#a5d69c',
  },
  contentStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: '#2d2d2d',
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0,
  },
  headerStyle: {
    backgroundColor: '#5fb650',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  contentDataTable: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  footerStyle: {
    backgroundColor: '#fff',
  },
  footerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footeritemStyle: {
    justifyContent: 'center',
    padding: 15,
    borderBottomWidth: 0,
  },
  footeritemLabel: {
    color: '#6d6e72',
    fontWeight: 'bold',
  },
  footeritemInfo: {
    color: '#b2bec3',
    textTransform: 'uppercase',
  },
  footeritemBody: {
    alignItems: 'flex-end',
  },
  footerlabelTotalAmount: {
    color: 'green',
    fontWeight: 'bold',
  },
});
