import React from 'react'
import { StyleSheet, View, Dimensions, Image, TouchableNativeFeedback, ImageBackground, StatusBar, } from 'react-native'
import { Container, Header, Text, Icon, Thumbnail, Button, H1, Left, Body, Right, Card, CardItem } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import SwiperFlatList from 'react-native-swiper-flatlist';

export default class SideBar extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={styles.header}>
                    <Image source={require('../../assets/images/medgatelogo-white.png')} style={styles.medgate} resizeMode="contain" />
                    <Text style={styles.title}>Call Doc. Anytime. Anywhere. No lines.™</Text>
                        <Text style={styles.subtitle}>Get your hassle-free medical consultation. Our Filipino specialist doctors are just a phone call away to give you the case you deserve.</Text>

                </View>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.HowToUse}>How to Use?</Text>
                    </View>
                    <View style={styles.swiperFeatures}>
                        <SwiperFlatList
                            autoplay
                            autoplayDelay={60}
                            autoplayLoop
                            index={0}
                            paginationDefaultColor="#fff"
                            paginationActiveColor="#40ecb8"
                            showPagination
                            paginationStyle={{ marginVertical: 0 }}
                        >
                            <View style={styles.child}>
                                <View style={styles.MedgateContents}>
                                    <Image source={require('../../assets/images/card-calldoc.png')} style={styles.Telemedicine} resizeMode="contain" />
                                    <Text style={styles.cardTitle}>Call Doc</Text>
                                    <Text style={styles.cardDetails}>
                                        Manila: 028 705 0700
                                    </Text>
                                    <Text style={styles.cardDetails}>
                                        Globe: 0917 829 9996
                                    </Text>
                                    <Text style={styles.cardDetails}>
                                        Smart: 0998 990 7540
                                    </Text>
                                    <Text style={styles.cardDetails}>
                                        Sun: 0925 714 7794
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.child}>
                                <View style={styles.MedgateContents}>
                                    <Image source={require('../../assets/images/card-triage.png')} style={styles.Telemedicine} resizeMode="contain" />
                                    <Text style={styles.cardTitle}>Triage</Text>
                                    <Text style={styles.cardDetails}>
                                        A telemedicine assistant will assess your concern and transfer you to our specialist doctor
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.child}>
                                <View style={styles.MedgateContents}>
                                    <Image source={require('../../assets/images/card-consult.png')} style={styles.Telemedicine} resizeMode="contain" />
                                    <Text style={styles.cardTitle}>Consult</Text>
                                    <Text style={styles.cardDetails}>
                                        Speak to a Medgate specialist doctor through your mobile phone
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.child}>
                                <View style={styles.MedgateContents}>
                                    <Image source={require('../../assets/images/card-etreatment.png')} style={styles.Telemedicine} resizeMode="contain" />
                                    <Text style={styles.cardTitle}>E-treatment</Text>
                                    <Text style={styles.cardDetails}>
                                        Receive your e-prescription and care plan via email
                                    </Text>
                                </View>
                            </View>
                        </SwiperFlatList>
                    </View>
                    <View style={{ padding: 30, backgroundColor: "#fff", marginTop: 50 }}>
                        <Text style={{ fontSize: 24, color: "#258bf5", fontWeight: "bold" }}>Easy, fast, secure.</Text>
                        <Text style={{ color: "#2d2d2d", fontSize: 14 }}>Download the Medgate Philippines app now!</Text>
                        <Text style={{ color: "#2d2d2d", fontSize: 14 }}>Call Doc. Anytime. Anywhere. No lines.™</Text>
                        <View style={{ marginTop: 30 }}>
                            <Button iconLeft rounded style={{backgroundColor: "#258bf5", flexDirection: "column"}}>
                                <Icon type="Ionicons" name='ios-call' />
                                <Text>Call a Doctor now!</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    };
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: "#f5f5f5"
        },
        header: {
            backgroundColor: "#258bf5",
            padding: 20,
            alignItems: "center",
            alignItems: "center",
            justifyContent: "center",
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            shadowColor: '#fff',
            shadowOffset: { width: 10, height: 8 },
            shadowOpacity: 0.10,
            shadowRadius: 20,
            elevation: 5,
        },
        title: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
            marginBottom: 10
        },
        subtitle: {
            fontSize: 14,
            color: "#fff",
            alignSelf: "center",
            textAlign: "center"
        },
        HowToUse: {
            fontSize: 24,
            color: "#258bf5",
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: 30
        },
        WhatIsMedgate: {
            fontSize: 20,
            color: "#2d2d2d",
            alignSelf: "center",
        },
        medgate: {
            height: height * 0.05,
            width: width * 0.50,
            marginBottom: 10
        },
        MedgateContents: {
            flex: 5,
            paddingVertical: 40,
            paddingHorizontal: 40,
            marginHorizontal: 60,
            borderRadius: 10,
            backgroundColor: "#fff",
            shadowColor: '#fff',
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 2,
            justifyContent: "center"
        },
        Telemedicine: {
            height: height * 0.15,
            width: width * 0.50,
            marginVertical: 10,
            alignSelf: "center"
        },

        swiperFeatures: {
            flex: 1,
        },
        child: {
            marginBottom: 20,
            paddingVertical: 20,
            height: height * 0.60,
            width,
        },
        cardTitle: {
            color: "#2d2d2d",
            alignSelf: "center",
            marginVertical: 10
        },
        cardDetails: {
            color: "#2d2d2d",
            textAlign: "center",
            fontSize: 12
        },
    }
)