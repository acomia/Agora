import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  ImageBackground,
} from 'react-native';
import {Card, Label, Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const SCREEN_HEIGHT =
  Platform.OS === 'android'
    ? require('react-native-extra-dimensions-android').getRealWindowHeight()
    : Dimensions.get('window').height;

export default function PHCard({
  fullname,
  acct,
  cardno,
  bday,
  gender,
  company,
  intellicare,
}) {
  const [frontCardOpacity, setFrontCardOpacity] = useState(1);
  const [backCardOpacity, setBackCardOpacity] = useState(0);
  const [frontCardPosition, setFrontCardPosition] = useState('absolute');
  const [backCardPosition, setBackCardPosition] = useState('relative');
  const {
    mainCardStyle,
    topCardStyle,
    avegaLogo,
    countryOfOrigTextStyle,
    cardInfo,
    cardName,
    cardDetails,
    titlecardDetails,
    intellicareLogoOld,
    tollTopTextStyle,
    flipIconStyle,
    contentStyle,
    greenTextStyle,
    labelStyle,
    avegaContentStyle,
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

      {intellicare === false ? (
        // Avega
        <Card
          style={[
            mainCardStyle,
            {opacity: backCardOpacity, position: backCardPosition},
          ]}>
          <View style={{flex: 1, paddingTop: 14}}>
            <View style={{height: 50, backgroundColor: '#000'}} />
            <TouchableNativeFeedback onPress={() => flipCard()}>
              <Image
                source={require('../../../assets/images/refresh.png')}
                style={flipIconStyle}
              />
            </TouchableNativeFeedback>
            <View style={avegaContentStyle}>
              <View style={{flexDirection: 'row', marginVertical: 2}}>
                <Label style={greenTextStyle}>AVEGA TRUNKLINE: </Label>
                <Label style={labelStyle}>
                  (02) 7902-3400 | (02) 8789-4030
                </Label>
              </View>
              <Label style={greenTextStyle}>
                AVEGA 24-HOUR CUSTOMER SERVICE NUMBERS
              </Label>
              <View style={{flexDirection: 'row'}}>
                <Label style={[labelStyle, {fontWeight: 'bold'}]}>
                  MANILA{' '}
                </Label>
                <Label style={labelStyle}>
                  (02) 7902-3400 | (02) 8789-4030
                </Label>
              </View>
              <Label style={labelStyle}>
                For Call (0920) 970.4724 - Smart | (0922) 891.3957 - Sun
              </Label>
              <Label style={labelStyle}>
                For Text (0920) 951.8452 - Smart | (0917) 805.2502 - Globe
              </Label>
              <Label style={[greenTextStyle, {marginTop: 2}]}>
                REGIONAL OFFICES
              </Label>
              <View style={{flexDirection: 'row'}}>
                <Label style={[labelStyle, {fontWeight: 'bold'}]}>
                  CALAMBA{' '}
                </Label>
                <Label style={labelStyle}>(049) 545.5081 | </Label>
                <Label style={[labelStyle, {fontWeight: 'bold'}]}>CEBU </Label>
                <Label style={labelStyle}>
                  (032) 260.9800 / (0920) 907.3708
                </Label>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Label style={[labelStyle, {fontWeight: 'bold'}]}>
                  BACOLOD{' '}
                </Label>
                <Label style={labelStyle}>
                  (034) 488.7080 / (0920) 926.8649 |{' '}
                </Label>
                <Label style={[labelStyle, {fontWeight: 'bold'}]}>DAVAO </Label>
                <Label style={labelStyle}>
                  (082) 238.7070 / (0920) 951.9523
                </Label>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Label style={greenTextStyle}>BRANCH OFFICE </Label>
                <Label style={[labelStyle, {fontWeight: 'bold'}]}>CDO </Label>
                <Label style={labelStyle}>
                  (088) 864.8900 / (0917) 592.8346
                </Label>
              </View>
            </View>
            <View style={{height: 2, backgroundColor: 'silver'}} />
            <View style={{paddingHorizontal: 20}}>
              <Label style={labelStyle}>
                This card is the property of Asalus Corporation. The use of this
                card is governed by the terms and conditions embodied in our
                client's healthcare agreement and all future amendments thereto.
                This card is NON-TRANSFERABLE. If found, please return to Avega
                Corporation Head Office at 14/F Phil. AXA Building, Sen. Gil
                Puyat Avenue cor.Tindalo Street, Brgy. San Antonio, Makati City
                1203 Tel No. 7902-3400
              </Label>
            </View>
          </View>
        </Card>
      ) : (
        // Intellicare
        <Card
          style={[
            mainCardStyle,
            {opacity: backCardOpacity, position: backCardPosition},
          ]}>
          <View style={{flex: 1}}>
            <Label style={tollTopTextStyle}>
              TOLL-FREE NUMBER OUTSIDE METRO MANILA 1-800-9-789-400
            </Label>
            <View style={{height: 40, backgroundColor: '#000'}} />
            <TouchableNativeFeedback onPress={() => flipCard()}>
              <Image
                source={require('../../../assets/images/refresh.png')}
                style={flipIconStyle}
              />
            </TouchableNativeFeedback>
            <View style={contentStyle}>
              <View
                style={{height: 30, borderWidth: 0.6, borderColor: 'silver'}}
              />
              <View style={{flexDirection: 'row'}}>
                <View style={{width: 100, marginRight: 4}}>
                  <Label style={greenTextStyle}>
                    24-HOUR CUSTOMER SERVICE NUMBERS
                  </Label>
                  <Label style={labelStyle}>
                    (02) 902.3400 | (02) 789.4000
                  </Label>
                  <Label style={greenTextStyle}>HEAD OFFICE</Label>
                  <Label style={labelStyle}>For Calls (0920) 840.4894</Label>
                  <Label style={labelStyle}>
                    {'                  (0920) 970.4724'}
                  </Label>
                  <Label style={labelStyle}>
                    {'                  (0922) 891.3957'}
                  </Label>
                  <Label style={labelStyle}>For Texts (0917) 805.2502</Label>
                  <Label style={labelStyle}>
                    {'                  (0920) 951.8452'}
                  </Label>
                  <Label style={labelStyle}>
                    {'                  (0922) 891.3925'}
                  </Label>
                </View>
                <View>
                  <Label style={greenTextStyle}>
                    REGIONAL & BRANCH OFFICES
                  </Label>
                  <Label style={labelStyle}>
                    BACOLOD (034) 707.2047 | (0920) 926.8649 | (0922) 889.3203
                  </Label>
                  <Label style={labelStyle}>
                    CAGAYAN DE ORO (088) 856.7107 | (0920) 951.9526
                  </Label>
                  <Label style={labelStyle}>
                    CALAMBA (049) 545.5081 | (0917) 522.3124
                  </Label>
                  <Label style={labelStyle}>
                    DAVAO (082) 222.3577 | (0920) 951.9523
                  </Label>
                  <Label style={labelStyle}>CEBU (032) 230.5400</Label>
                  <Label style={labelStyle}>
                    {'           For Calls (0920) 907.3708'}
                  </Label>
                  <Label style={labelStyle}>
                    {'                            (0917) 566.1848'}
                  </Label>
                  <Label style={labelStyle}>
                    {'                            (0922) 837.7094'}
                  </Label>
                  <Label style={labelStyle}>
                    {'           For Texts (0998) 843.2488'}
                  </Label>
                  <Label style={labelStyle}>
                    {'                            (0917) 830.7102'}
                  </Label>
                </View>
                <View
                  style={{
                    alignSelf: 'flex-end',
                    right: 0,
                    position: 'absolute',
                  }}>
                  <Image
                    source={require('../../../assets/images/veridata.jpg')}
                    resizeMode="contain"
                    style={{
                      width: 80,
                      height: 40,
                    }}
                  />
                  <Label style={greenTextStyle}>intellicare.com.ph</Label>
                </View>
              </View>
              <View style={{height: 1, backgroundColor: 'silver'}} />
              <Label style={labelStyle}>
                This card is the property of Asalus Corporation. The use of this
                card is governed by the terms and conditions embodied in our
                client's healthcare agreement and all future amendments thereto.
                This card is NON-TRANSFERABLE. If found, please return to Asalus
                Corporation Head Office at 7/F Feliza Building, V.A Rufino St,
                Legaspi Village, Makati City. Tel No. 789.4000
              </Label>
            </View>
          </View>
        </Card>
      )}
      {/* Front Card */}
      <Card
        style={[
          mainCardStyle,
          {opacity: frontCardOpacity, position: frontCardPosition},
        ]}>
        <LinearGradient
          colors={['#fff', '#ececec']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{flex: 1, borderRadius: 20}}>
          <View style={topCardStyle}>
            {intellicare === false ? (
              <Image
                source={require('../../../assets/images/avega-logo.png')}
                resizeMode="contain"
                style={avegaLogo}
              />
            ) : (
              <ImageBackground
                source={require('../../../assets/images/virtual-card-header.png')}
                resizeMode="contain"
                style={intellicareLogoOld}
              />
            )}
            <TouchableNativeFeedback onPress={() => flipCard()}>
              <Image
                source={require('../../../assets/images/refresh.png')}
                style={{
                  width: 24,
                  height: 24,
                  right: 10,
                  opacity: 0.7,
                  position: 'absolute',
                }}
              />
            </TouchableNativeFeedback>
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
  cardInfo: {
    flex: 2,
    paddingHorizontal: 20,
    top: 20,
  },
  mainCardText: {
    marginVertical: 15,
    textAlign: 'justify',
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: SCREEN_HEIGHT > 750 ? 18 : 16,
  },
  cardDetails: {
    fontSize: SCREEN_HEIGHT > 750 ? 14 : 12,
    textTransform: 'uppercase',
    color: '#6d6e72',
  },
  titlecardDetails: {
    fontSize: SCREEN_HEIGHT > 750 ? 14 : 12,
    color: '#6d6e72',
  },
  avegaLogo: {
    height: 60,
    width: 120,
    marginHorizontal: 20,
    alignSelf: 'flex-start',
    top: 10,
  },
  intellicareLogoOld: {
    width: width * 0.9,
    height: height * 0.1,
    borderTopLeftRadius: 20,
    borderTopStartRadius: 20,
    overflow: 'hidden',
    marginTop: SCREEN_HEIGHT > 750 ? -5 : 0,
  },
  topCardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linearGradient: {
    height: 100,
    position: 'relative',
  },
  countryOfOrigTextStyle: {
    color: 'green',
    fontSize: SCREEN_HEIGHT > 750 ? 10 : 9,
    alignSelf: 'flex-end',
    right: 4,
    bottom: 20,
  },

  // Intellicare Back Card
  tollTopTextStyle: {
    fontSize: SCREEN_HEIGHT > 750 ? 9 : 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flipIconStyle: {
    width: 24,
    height: 24,
    alignSelf: 'flex-end',
    right: 10,
    top: 18,
    position: 'absolute',
  },
  contentStyle: {
    paddingLeft: 20,
    paddingRight: 16,
    paddingTop: 2,
  },
  greenTextStyle: {
    fontSize: SCREEN_HEIGHT > 750 ? 9 : 8,
    color: 'green',
    fontWeight: 'bold',
  },
  labelStyle: {fontSize: SCREEN_HEIGHT > 750 ? 9 : 8},

  //Avega Back Card
  avegaContentStyle: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
