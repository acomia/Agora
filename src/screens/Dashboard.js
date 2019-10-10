import React from 'react'
import { StyleSheet, View, Dimensions, Image, ImageBackground, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { Container, Header, Content, Button, Text, Icon, Left, Right, Body, Card, CardItem, Thumbnail, H1 } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { DrawerActions } from 'react-navigation-drawer';



export default class Dashboard extends React.Component {


    render() {

        // const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

        return (

            <Container style={{ display: 'flex', flex: 1, backgroundColor: "#f5f5f5" }}>
                <Header style={styles.headerStyle}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }} >
                            <Icon style={styles.headerIconStyle} name='ios-menu' />
                        </Button>
                    </Left>
                    <Right>
                        <Body>
                            <Text style={styles.headerLabel}>Hello, Frederick</Text>
                        </Body>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('ProfilePage')}>
                            <Thumbnail small source={require('../../assets/images/sample-image-circle.png')} resizeMode='contain' />
                        </TouchableNativeFeedback>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={styles.swiperFeatures}>
                        <ImageBackground source={require('../../assets/images/intelliappheader.png')} style={styles.backgroundImage}>
                            <SwiperFlatList
                                autoplay
                                autoplayDelay={5}
                                autoplayLoop
                                index={0}
                                showPagination
                                paginationStyle={{ marginBottom: 30, }}
                            >
                                <View style={styles.child}>
                                    <Card style={styles.mainCardStyle}>
                                        <CardItem style={styles.mainCardStyle} style={{ flexDirection: "column" }}>
                                            <Image source={require('../../assets/images/medgatelogo.png')} resizeMode='contain' style={styles.medgateLogo} />
                                            <Text style={styles.mainCardText}>
                                                Get your hassle-free medical consultation. Our Filipino specialist doctors are just one phone call away to give you the care you deserve.
                                            </Text>
                                            <Button iconLeft rounded style={styles.medgateButton}>
                                                <Icon name='ios-call' />
                                                <Text>Call a Doctor now!</Text>
                                            </Button>
                                        </CardItem>
                                    </Card>
                                </View>
                                <View style={styles.child}>
                                    <Card style={styles.mainCardStyle}>
                                        <CardItem style={styles.mainCardStyle} style={{ flexDirection: "column" }}>
                                            <Text style={{ color: "#5fb650", fontSize: 40, fontWeight: "bold" }}>The Intellicare Way!</Text>
                                            <Text style={styles.mainCardText}>
                                                We’re constantly striving to make processes better, faster, more high-tech and high-touch – all to make your life simpler and healthier.
                                            </Text>
                                        </CardItem>
                                    </Card>
                                </View>
                                <View style={styles.child}>
                                    <Card style={styles.mainCardStyle}>
                                        <CardItem style={styles.mainCardStyle} style={{ flexDirection: "column" }}>
                                            <Image source={require('../../assets/images/medgatelogo.png')} resizeMode='contain' style={styles.medgateLogo} />
                                            <Text style={styles.mainCardText}>
                                                Get your hassle-free medical consultation. Our Filipino specialist doctors are just one phone call away to give you the care you deserve.
                                            </Text>
                                            <Button iconLeft rounded style={styles.medgateButton}>
                                                <Icon name='ios-call' />
                                                <Text>Call a Doctor now!</Text>
                                            </Button>
                                        </CardItem>
                                    </Card>
                                </View>
                            </SwiperFlatList>
                        </ImageBackground>
                    </View>
                    <View style={styles.menuTiles}>
                        <View style={styles.menuRow}>
                            <View style={styles.cardItemStyle}>
                                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('MembersPage')}>
                                    <Card style={styles.cardStyle}>
                                        <CardItem style={styles.cardStyle}>
                                            <Left>
                                                <Body>
                                                    <Text style={styles.cardText}>Account Profiles</Text>
                                                </Body>
                                                <Thumbnail source={require('../../assets/images/team.png')} resizeMode='contain' />
                                            </Left>
                                        </CardItem>
                                    </Card>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={styles.cardItemStyle}>
                                <Card style={styles.cardStyle}>
                                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('IntellimapPage')}>
                                        <CardItem style={styles.cardStyle}>
                                            <Left>
                                                <Body>
                                                    <Text style={styles.cardText}>IntelliMap</Text>
                                                </Body>
                                                <Thumbnail source={require('../../assets/images/map.png')} resizeMode='contain' />
                                            </Left>
                                        </CardItem>
                                    </TouchableNativeFeedback>
                                </Card>
                            </View>
                        </View>
                        {/* <View style={styles.menuRow}>
                            <View style={styles.cardItemStyle}>
                                <Card style={styles.cardStyle}>
                                    <CardItem style={styles.cardStyle}>
                                        <Left>
                                            <Body>
                                                <Text style={styles.cardText}>Request ERCS1</Text>
                                            </Body>
                                            <Thumbnail source={require('../../assets/images/form1.png')} resizeMode='contain' />
                                        </Left>
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={styles.cardItemStyle}>
                                <Card style={styles.cardStyle}>
                                    <CardItem style={styles.cardStyle}>
                                        <Left>
                                            <Body>
                                                <Text style={styles.cardText}>Request ERCS2</Text>
                                            </Body>
                                            <Thumbnail source={require('../../assets/images/clipboard.png')} resizeMode='contain' />
                                        </Left>
                                    </CardItem>
                                </Card>
                            </View>
                        </View> */}
                        <View style={styles.menuRow}>
                            <View style={styles.cardItemStyle}>
                                <Card style={styles.cardStyle}>
                                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('DoctorProfilePage')}>
                                        <CardItem style={styles.cardStyle}>
                                            <Left>
                                                <Body>
                                                    <Text style={styles.cardText}>Find a Medical Provider</Text>
                                                </Body>
                                                <Thumbnail source={require('../../assets/images/doctor.png')} resizeMode='contain' />
                                            </Left>
                                        </CardItem>
                                    </TouchableNativeFeedback>
                                </Card>
                            </View>
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
        scrollViewBackground: {
            flex: 1,
            backgroundColor: "#f5f5f5"
        },
        headerStyle: {
            backgroundColor: '#fff',
            borderBottomColor: '#2d2d2d'
        },
        imageStyle: {
            flex: 1,
            height: '10%',
            width: width * 0.10,
            alignSelf: "center",
        },
        headerIconStyle: {
            color: '#2d2d2d',
            marginHorizontal: 10,
        },
        swiperContainer: {
            flex: 1,
            backgroundColor: 'white'
        },
        child: {
            paddingHorizontal: 5,
            paddingVertical: 20,
            height: height * 0.45,
            width,
        },
        text: {
            fontSize: width * 0.5,
            textAlign: 'center'
        },
        mapSection: {
            borderRadius: 50,
            padding: 10,
            flex: 7,
            backgroundColor: '#fff'
        },
        menuTiles: {
            flex: 8,
        },
        menuRow: {
            flexDirection: 'row'
        },
        cardItemStyle: {
            flex: 1,
            margin: 5,
        },
        cardStyle: {
            borderRadius: 10,
            borderColor: '#f5f5f5',
            shadowColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.10,
            shadowRadius: 2,
            elevation: 1,
        },
        cardText: {
            color: '#5fb650'
        },
        container: {
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        headerLabel: {
            alignSelf: 'flex-end',
            paddingHorizontal: 10
        },
        swiperFeatures: {
            flex: 1,
        },
        Section1: {
            flex: 1,
            backgroundColor: '#f5f5f5',
        },
        medgateLogo: {
            height: height * 0.05,
            width: width * 0.50,
        },
        medgateButton: {
            backgroundColor: "#1665ce"
        },
        mainCardStyle: {
            minHeight: 250,
            borderRadius: 20,
            borderColor: '#f5f5f5',
            shadowColor: '#fff',
            shadowOffset: { width: 10, height: 8 },
            shadowOpacity: 0.10,
            shadowRadius: 20,
            elevation: 5,
            color: "#2d2d2d",
            justifyContent: "center"
        },
        mainCardText: {
            marginVertical: 15,
            textAlign: "justify"
        },
        backgroundImage: {
            resizeMode: "contain",
        },

    }
)