import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import {Card, Label} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const SCREEN_HEIGHT =
  Platform.OS === 'android'
    ? require('react-native-extra-dimensions-android').getRealWindowHeight()
    : Dimensions.get('window').height;

export default function MYCard({
  fullname,
  acct,
  cardno,
  bday,
  gender,
  company,
}) {
  const [frontCardOpacity, setFrontCardOpacity] = useState(1);
  const [backCardOpacity, setBackCardOpacity] = useState(0);
  const [frontCardPosition, setFrontCardPosition] = useState('absolute');
  const [backCardPosition, setBackCardPosition] = useState('relative');
  const {
    mainCardStyle,
    topCardStyle,
    cardLogo,
    linearGradient,
    cardInfo,
    cardName,
    cardDetails,
    titlecardDetails,
    cardFooter,
    countryOfOrigTextStyle,
    ihpLogoStyle,
    malaysiaTextStyle,
    flipIconStyle,
    linearGradientBack,
    termsTextStyle,
    labelStyle,
    footerContentStyle,
  } = styles;

  function flipCard() {
    if (frontCardOpacity === 1)
      setFrontCardOpacity(0),
        setBackCardOpacity(1),
        setFrontCardPosition('relative'),
        setBackCardPosition('absolute');
    else
      setFrontCardOpacity(1),
        setBackCardOpacity(0),
        setFrontCardPosition('absolute'),
        setBackCardPosition('relative');
  }

  return (
    <View>
      {/* Back Card */}
      <Card
        style={[
          mainCardStyle,
          {opacity: backCardOpacity, position: backCardPosition},
        ]}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <LinearGradient
            colors={['#fff', '#FDFEFE']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={linearGradientBack}>
            <Label style={termsTextStyle}>Terms & Conditions</Label>
            <Label style={labelStyle}>
              {'\u25CF'} This card is not transferable and must be presented
              with the cardholder's IC.
            </Label>
            <Label style={labelStyle}>
              {'\u25CF'} This card must be presented before medical services can
              be rendered.
            </Label>
            <Label style={labelStyle}>
              {'\u25CF'} Fraudulent use of this card may implicate legal
              proceedings.
            </Label>
            <Label style={labelStyle}>
              {'\u25CF'} The cardholder shall be deemed, by use of this card, to
              have given consent & authorised the relevant providers to release
              all information pertaining to treatment of the cardholder to
              Integrated Health Plans (Malaysia) Sdn Bhd.
            </Label>
            <Label style={labelStyle}>
              {'\u25CF'} Please report loss of this card to IHP or your
              organization/ insurer immediately.
            </Label>
            <Label style={labelStyle}>
              {'\u25CF'} Please report loss of this card to IHP or your
              organization/ insurer immediately.
            </Label>
            <Label style={labelStyle}>
              {'\u25CF'} An administration fee of RM10 plus prevailing taxes
              will be imposed for replacement of physical card.
            </Label>
            <Label style={labelStyle}>
              {'\u25CF'} This card is the property of Integrated Health Plans
              (Malaysia) Sdn Bhd. If found, please contact;
            </Label>
            <View style={footerContentStyle}>
              <View style={{flexDirection: 'row'}}>
                <Label style={[labelStyle, {fontWeight: 'bold'}]}>
                  Employee hotline:
                </Label>
                <Label style={labelStyle}> +603 8230 4088</Label>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Label style={[labelStyle, {fontWeight: 'bold'}]}>Email:</Label>
                <Label style={labelStyle}> enquiry@ihpmy.com</Label>
              </View>
            </View>
          </LinearGradient>
          <View
            style={{
              width: 50,
              backgroundColor: '#D0D3D4',
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          />
        </View>
        <TouchableNativeFeedback onPress={() => flipCard()}>
          <Image
            source={require('../../../assets/images/refresh.png')}
            style={flipIconStyle}
          />
        </TouchableNativeFeedback>
      </Card>
      {/* Front Card */}
      <Card
        style={[
          mainCardStyle,
          {opacity: frontCardOpacity, position: frontCardPosition},
        ]}>
        <View style={{flex: 1}}>
          <View style={topCardStyle}>
            <Image
              source={require('../../../assets/images/F1_Logo.png')}
              resizeMode="contain"
              style={cardLogo}
            />
            <TouchableNativeFeedback onPress={() => flipCard()}>
              <Image
                source={require('../../../assets/images/refresh.png')}
                style={{
                  width: 24,
                  height: 24,
                  right: 10,
                  opacity: 0.7,
                }}
              />
            </TouchableNativeFeedback>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <LinearGradient
              colors={['#D0D3D4', '#D0D3D4']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={linearGradient}>
              <View style={cardInfo}>
                <Label style={cardName}>{fullname}</Label>
                <Label style={cardDetails}>{company}</Label>
                <View style={{flexDirection: 'row'}}>
                  <Label style={titlecardDetails}>Account No: </Label>
                  <Label style={cardDetails}>{acct}</Label>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Label style={titlecardDetails}>Card No: </Label>
                  <Label style={cardDetails}>{cardno}</Label>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Label style={titlecardDetails}>
                    Birthdate (mm/dd/yyyy):{' '}
                  </Label>
                  <Label style={cardDetails}>{moment(bday).format('L')}</Label>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Label style={titlecardDetails}>Gender: </Label>
                  <Label style={cardDetails}>{gender}</Label>
                </View>
              </View>
              <Label style={countryOfOrigTextStyle}>
                Country of Origin: Philippines
              </Label>
              <Label
                style={[countryOfOrigTextStyle, {color: '#fff', bottom: 3}]}>
                Healthcare your business deserves
              </Label>
            </LinearGradient>
            <View style={cardFooter}>
              <Image
                source={require('../../../assets/images/ihp_logo.png')}
                resizeMode="contain"
                style={ihpLogoStyle}
              />
              <Label style={malaysiaTextStyle}>M a l a y s i a</Label>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}
export const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
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
    justifyContent: 'center',
  },
  topCardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLogo: {
    height: 60,
    width: 120,
    marginHorizontal: 20,
    alignSelf: 'flex-start',
  },
  linearGradient: {
    flex: 1,
    borderBottomLeftRadius: 20,
  },
  cardInfo: {
    flex: 2,
    paddingHorizontal: 20,
    top: 20,
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: SCREEN_HEIGHT > 750 ? 18 : 16,
    color: '#7D3C98',
  },
  cardDetails: {
    fontSize: SCREEN_HEIGHT > 750 ? 14 : 12,
    textTransform: 'uppercase',
    color: '#7D3C98',
  },
  titlecardDetails: {
    fontSize: SCREEN_HEIGHT > 750 ? 14 : 12,
    color: '#7D3C98',
  },
  cardFooter: {
    alignItems: 'center',
    width: SCREEN_HEIGHT > 750 ? 80 : 75,
    backgroundColor: '#fff',
    borderWidth: 0.4,
    borderColor: '#D0D3D4',
    borderBottomRightRadius: 20,
  },
  countryOfOrigTextStyle: {
    color: '#7D3C98',
    fontSize: SCREEN_HEIGHT > 750 ? 10 : 9,
    alignSelf: 'flex-end',
    right: 8,
  },
  malaysiaTextStyle: {
    fontSize: SCREEN_HEIGHT > 750 ? 11 : 10,
    color: '#7D3C98',
    fontWeight: 'bold',
  },
  ihpLogoStyle: {width: 50, height: 50, marginTop: 10},
  // Back Card
  flipIconStyle: {
    width: 24,
    height: 24,
    alignSelf: 'flex-end',
    right: 10,
    top: 18,
    opacity: 0.7,
    position: 'absolute',
  },
  linearGradientBack: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    justifyContent: 'space-evenly',
  },
  termsTextStyle: {fontSize: SCREEN_HEIGHT > 750 ? 12 : 11, fontWeight: 'bold'},
  labelStyle: {fontSize: SCREEN_HEIGHT > 750 ? 10 : 8},
  footerContentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
});
