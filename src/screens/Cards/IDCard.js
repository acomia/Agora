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

export default function IDCard({
  fullname,
  acct,
  cardno,
  bday,
  gender,
  company,
  intellicare,
  current_city,
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
        <View style={{flex: 1}}>
          <LinearGradient
            colors={['silver', '#ECF0F1', '#FDFEFE']}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={[
              linearGradient,
              //   {
              //     borderTopLeftRadius: 20,
              //     borderBottomLeftRadius: 20,
              //   },
            ]}>
            <View
              style={{
                height: 60,
                backgroundColor: '#000',
                top: 16,
              }}
            />
            <View
              style={{
                flex: 1,
                padding: 20,
                justifyContent: 'space-evenly',
              }}>
              <Label style={{fontSize: 12, fontWeight: 'bold'}}>
                {'\u25CF'} Kartu ini berlaku untuk pelayanan di klinik/rumah
                sakit rekanan untuk peserta yang terdaftar dan tidak bisa
                dipindahtangankan.
              </Label>
              <Label style={{fontSize: 12, fontWeight: 'bold'}}>
                {'\u25CF'} Jika Anda mengalami kendala pelayanan, silakan
                hubungi kami di Call Center 24 Jam: 021 2997 6333 atau email
                case.managers@fullertonhealth.com
              </Label>
              <Label style={{fontSize: 12, fontWeight: 'bold', width: 240}}>
                {'\u25CF'} Jika menemukan kartu ini mohon menghubungi: FULLERTON
                HEALTH INDONESIA CIBIS Nine Building, Lt 5 JI. TB Simatupang No.
                2 Jakarta Selatan 12560
              </Label>
            </View>
            <Image
              source={require('../../../assets/images/logo_medlinx.png')}
              resizeMode="contain"
              style={{
                width: 100,
                height: 30,
                alignSelf: 'flex-end',
                bottom: 6,
                right: 6,
              }}
            />
          </LinearGradient>
        </View>
        <TouchableNativeFeedback onPress={() => flipCard()}>
          <Image
            source={require('../../../assets/images/refresh.png')}
            style={{
              width: 24,
              height: 24,
              alignSelf: 'flex-end',
              right: 10,
              top: 18,
              opacity: 0.7,
              position: 'absolute',
            }}
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
              colors={['silver', '#ECF0F1', '#FDFEFE']}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
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
              <Image
                source={require('../../../assets/images/Fullerton-Healthcare.png')}
                resizeMode="center"
                style={{
                  width: 150,
                  height: 30,
                  alignSelf: 'flex-end',
                  bottom: 4,
                }}
              />
            </LinearGradient>
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
    borderRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  cardInfo: {
    flex: 2,
    paddingHorizontal: 20,
    top: 20,
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'navy',
  },
  cardDetails: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: 'navy',
  },
  titlecardDetails: {
    fontSize: 14,
    color: 'navy',
  },
  cardFooter: {
    alignItems: 'center',
    width: 100,
    backgroundColor: '#fff',
    borderWidth: 0.4,
    borderColor: '#D0D3D4',
    borderBottomRightRadius: 20,
  },
  countryOfOrigTextStyle: {
    color: 'navy',
    fontSize: 12,
    alignSelf: 'flex-end',
    right: 8,
    marginBottom: 2,
  },
});
