import React, {useState} from 'react';
import {Text} from 'react-native';
import {Footer, FooterTab, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const FooterComponent = ({showExploreFooter, hideExploreFooter}) => {
  const [homecolor, setHomecolor] = useState('tomato');
  const [explorecolor, setExplorecolor] = useState('grey');

  function handlePress(e) {
    switch (e) {
      case 'HOME':
        return (
          hideExploreFooter(), setHomecolor('tomato'), setExplorecolor('grey')
        );
      case 'EXPLORE':
        return (
          showExploreFooter(), setHomecolor('grey'), setExplorecolor('tomato')
        );
    }
  }
  return (
    <Footer>
      <FooterTab style={styles.footerTab}>
        <Button vertical onPress={() => handlePress('HOME')}>
          <Icon color={homecolor} size={20} name="local-library" />
          <Text style={{color: homecolor}}>Home</Text>
        </Button>
        <Button vertical onPress={() => handlePress('EXPLORE')}>
          <Icon color={explorecolor} size={20} name="map" />
          <Text style={{color: explorecolor}}>Explore</Text>
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
