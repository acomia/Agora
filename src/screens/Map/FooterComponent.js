import React from 'react';
import {Text} from 'react-native';
import {Footer, FooterTab, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const FooterComponent = ({showExploreFooter, hideExploreFooter}) => {
  return (
    <Footer>
      <FooterTab style={styles.footerTab}>
        <Button vertical onPress={() => hideExploreFooter()}>
          <Icon color="tomato" size={20} name="local-library" />
          <Text>Home</Text>
        </Button>
        <Button vertical onPress={() => showExploreFooter()}>
          <Icon color="grey" size={20} name="map" />
          <Text>Explore</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

const styles = {
  footerTab: {
    backgroundColor: '#fff',
  },
};

export default FooterComponent;
