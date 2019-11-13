// Import Libraries for making a component
import React from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

// Make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <GooglePlacesAutocomplete apiKey="AIzaSyAEr63gs_sYIqF9HFTvqQX4rvdPEcrNQTo" debounce={500}>
        {({ handleTextChange, locationResult }) => {
          <React.Fragment>
            <View>
              <TextInput placeholder='Search hospitals/clinics'
                style={searchTextInput}
                onChangeText={handleTextChange}
              />
            </View>
          </React.Fragment>
        }}
      </GooglePlacesAutocomplete>
    </View>
  );
};

//Make a style function for styling a component
const styles = {
  textStyle: {
    fontSize: 50
  },
  viewStyle: {
    backgroundColor: 'white',
    height: 40,
    position: 'relative'
  },
  imageStyle: {
    height: 50,
    width: 200
  }
};
// Make a component available to other parts of the app
export default Header;
