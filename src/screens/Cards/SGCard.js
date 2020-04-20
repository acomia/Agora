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

export default function SGCard({
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
    cardBody,
    cardInfo,
    cardName,
    cardDetails,
    titlecardDetails,
    cardFooter,
    countryOfOrigTextStyle,
    linearGradientBack,
    topTextStyle,
    boxStyle,
    remarksStyle,
    labelStyle,
    wwwTextStyle,
    flipIconStyle,
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
            colors={['#11428C', '#1856B2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={linearGradientBack}>
            <Label style={topTextStyle}>
              Please present this card together with your NRIC/EP/WP/PP/BC at
              all Fullerton panel clinics. If you require assistance, please
              call our hotline @ 6333 3636
            </Label>
            <View style={boxStyle}>
              <Label style={remarksStyle}>Remarks</Label>
              <Label style={labelStyle}>
                General Exclusions Apply. This policy covers for Surcharge.
                Policy Covers Standard Diagnostic X-ray & Lab Tests (Including
                high-end and high-field radiological scans ie. MRI/CT/PET/
                Scans). Referral from GP /SP is required
              </Label>
              <Label style={wwwTextStyle}>
                For more details on our lifestyle benefits, please visit
                www.fullertonhealth.com/lifestyle-benefits.html
              </Label>
            </View>
          </LinearGradient>
          <View
            style={{
              width: 50,
              backgroundColor: '#CC9933',
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
          <LinearGradient
            colors={['#11428C', '#1856B2']}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={linearGradient}>
            <View style={cardBody}>
              <Image
                source={require('../../../assets/images/Fullerton-Healthcare.png')}
                resizeMode="contain"
                style={{
                  height: 60,
                  width: 150,
                  opacity: 0.5,
                }}
              />
            </View>
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
                <Label style={titlecardDetails}>Birthdate (mm/dd/yyyy): </Label>
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
          </LinearGradient>
          <View style={cardFooter} />
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
  },
  cardBody: {
    alignSelf: 'center',
    position: 'absolute',
  },
  cardInfo: {
    flex: 2,
    paddingHorizontal: 20,
    top: 20,
  },
  cardName: {
    color: '#fff',
    fontSize: SCREEN_HEIGHT > 750 ? 18 : 16,
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: SCREEN_HEIGHT > 750 ? 14 : 12,
    textTransform: 'uppercase',
    color: '#fff',
  },
  titlecardDetails: {
    fontSize: SCREEN_HEIGHT > 750 ? 14 : 12,
    color: '#fff',
  },
  cardFooter: {
    flex: 1,
    backgroundColor: '#CC9933',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  countryOfOrigTextStyle: {
    color: '#fff',
    fontSize: SCREEN_HEIGHT > 750 ? 10 : 9,
    alignSelf: 'flex-end',
    padding: 8,
  },
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
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 20,
  },
  topTextStyle: {
    color: '#fff',
    fontSize: SCREEN_HEIGHT > 750 ? 14 : 12,
    fontWeight: 'bold',
  },
  boxStyle: {
    flex: 1,
    borderWidth: 0.6,
    borderColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  remarksStyle: {
    color: '#fff',
    fontSize: SCREEN_HEIGHT > 750 ? 14 : 12,
    fontWeight: 'bold',
    bottom: 29,
    backgroundColor: '#11428C',
    width: 58,
    textAlign: 'center',
  },
  labelStyle: {color: '#fff', fontSize: SCREEN_HEIGHT > 750 ? 12 : 10},
  wwwTextStyle: {
    textAlign: 'left',
    alignSelf: 'flex-end',
    color: '#fff',
    fontSize: SCREEN_HEIGHT > 750 ? 10 : 8,
    width: 200,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});
