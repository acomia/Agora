import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import {Card, Label, Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

export default function HKCard({
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
    cardBody,
    cardBodyTextStyle,
    cardName,
    cardDetails,
    titlecardDetails,
    cardFooter,
    membshipTextStyle,
    countryOfOrigTextStyle,
    phoneTextStyle,
    wwwTextStyle,
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
          <View style={{top: 5, alignItems: 'center'}}>
            <Label
              style={{
                color: '#000',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Health Maintenance Medical Practice Limited
            </Label>
            <Label
              style={{
                color: '#000',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              維 健 醫 務 有 限 公 司
            </Label>
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
          <View style={{paddingHorizontal: 20, top: 6}}>
            <Label style={{fontSize: 11, marginBottom: 10}}>
              Authorised Signature 授权签名
            </Label>
            <Label style={{fontSize: 11}}>
              In case of emergency, please contact 在紧急情况下，请联系
            </Label>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Label style={{fontSize: 11}}>Name 名称</Label>
              <Label style={{fontSize: 11, right: width * 0.2}}>
                Phone 电话
              </Label>
            </View>
            <Label style={{fontSize: 11}}>Drug Allergy 药物过敏</Label>
            <Label style={{fontSize: 11, marginBottom: 5}}>
              Past Significant Illness 过去重大疾病
            </Label>
            <Label style={{fontSize: 10}}>
              This card may be used by the authorised signatory only.
            </Label>
            <Label style={{fontSize: 10}}>
              This card is the property of HMMTP Ltd., if found please return to
              Unit 405 4/F., Tower 1, Silvercord, No. 30 Canton Road, Tsim Sha
              Tsui, Kowloon. The member to whom this card was issued is
              responsible for any transaction which is not fully settled by the
              Insurance Company.
            </Label>
            <Label style={{fontSize: 11}}>
              该卡仅供授权签字人使用。此卡的财产是維健醫務有限公司，如果找到，请返回
              尖沙咀广东道30号新港中心1座4楼405室 九龙翠这张卡的发卡会员是
              对于未完全解决的交易负责 保险公司。
            </Label>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Label style={{fontSize: 11}}>For enquiry, call 2158 8500</Label>
              <Label style={{fontSize: 11, right: width * 0.3}}>
                咨询电话：2158 8500
              </Label>
            </View>
          </View>
        </View>
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
            colors={['#F17979', '#FEB4B4']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={linearGradient}>
            <View style={cardBody}>
              <Label style={cardBodyTextStyle}>HMMP Ltd.</Label>
              <Label style={cardBodyTextStyle}>維健醫務有限公司</Label>
            </View>
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
          </LinearGradient>
          <View style={cardFooter}>
            <View style={{top: 10}}>
              <Label style={membshipTextStyle}>MEMBERSHIP card 会员证</Label>
            </View>
            <View style={{top: 10}}>
              <Label style={countryOfOrigTextStyle}>
                Country of Origin: Philippines
              </Label>
              <Label style={phoneTextStyle}>2158 8500</Label>
              <Label style={wwwTextStyle}>www.hmmp.com.hk</Label>
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
    height: 104,
    paddingHorizontal: 20,
  },
  cardName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#fff',
  },
  titlecardDetails: {
    fontSize: 14,
    color: '#fff',
  },
  cardBody: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 20,
    right: 50,
  },
  cardBodyTextStyle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    opacity: 0.4,
  },
  cardFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  membshipTextStyle: {
    color: '#DF6161',
    fontSize: 18,
    fontWeight: 'bold',
  },
  countryOfOrigTextStyle: {
    color: '#DF6161',
    fontSize: 12,
    alignSelf: 'flex-end',
    right: 4,
  },
  phoneTextStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#DF6161',
    width: 110,
  },
  wwwTextStyle: {
    color: '#DF6161',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    right: 4,
  },
});
