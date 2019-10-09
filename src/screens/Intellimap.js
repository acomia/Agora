import React from 'react'
import { StyleSheet, View, Dimensions, PermissionsAndroid, Alert, Button, Image } from 'react-native'
import { Container, Header, Text, Icon, Item, Input } from 'native-base'
import { ScrollView, TouchableOpacity, } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import _ from 'lodash'
import Geolocation from 'react-native-geolocation-service'
import getDirections from 'react-native-google-maps-directions'
import ImageOverlay from 'react-native-image-overlay'

const hospitals = require('../../hospitals.json')

export async function request_location_runtime_permission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'IntelliMap Location Permission',
                'message': 'Intellicare Mobile App needs access to your location '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Alert.alert("Location Permission Granted.");
        }
        else {
            // Alert.alert("Location Permission Not Granted");
        }
    } catch (err) {
        console.warn(err)
    }
}

export default class Intellimap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            curLatitude: 0,
            curLongitude: 0,
            hospitals: hospitals,
        }
    }
    async componentDidMount() {
        await request_location_runtime_permission()

        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    curLatitude: position.coords.latitude,
                    curLongitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
        )

        // const { hospitals: [sampleLocations] } = this.state
        // this.setState({
        //     desLatitude: sampleLocations.coords.latitude,
        //     desLongitude: sampleLocations.coords.longitude
        // })

    }
    onHospitalButtonPres() {

    }
    renderMarker() {
        const { hospitals } = this.state
        return (
            <View>
                {
                    hospitals.map((location, idx) => {
                        const { coords: { latitude, longitude } } = location
                        return (
                            <Marker
                                key={idx}
                                coordinate={{ latitude, longitude }}
                                title={location.name}
                                description={location.address}
                                onPress={this.onMarkerPress(location)}
                            >
                                <Image
                                    source={require('../../assets/images/location-red.png')}
                                    style={{ height: 30, width: 30 }}
                                />
                                {/* <MapView.Callout>
                                    <View>
                                        <Text>Address:{location.address}</Text>
                                        <Button title='Get Direction' />
                                    </View>
                                </MapView.Callout> */}
                            </Marker>
                            // <Marker
                            //     key={idx}
                            //     coordinate={{ latitude, longitude }}
                            //     onPress={this.onMarkerPress(location)}
                            // />
                        )
                    })
                }
            </View>
        )
    }
    onMarkerPress = location => () => {
        const { coords: { latitude, longitude } } = location
        this.setState({
            destination: location,
            latitude: latitude,
            longitude: longitude
        })
    }
    updateSearch = search => {
        this.setState({ search });
    };

    handleGetDirections = () => {
        const { curLatitude, curLongitude, destination } = this.state
        console.log('Direction:', this.state)
        const data = {
            source: {
                latitude: curLatitude,
                longitude: curLongitude,
            },
            destination: {
                latitude: destination.coords.latitude,
                longitude: destination.coords.longitude
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"
                },
                {
                    key: "dir_action",
                    value: "navigate"
                }
            ],
            // waypoints: [
            //     {
            //         latitude: curLatitude,
            //         longitude: curLongitude,
            //     },
            //     {
            //         latitude: curLatitude,
            //         longitude: curLongitude,
            //     },
            // ]
        }
        getDirections(data)
    }
    renderHeaderMapButton() {
        return (
            <View style={{ height: 24 }}>
                <ScrollView
                    horizontal={true}
                >
                    <View style={{ flexDirection: 'row', height: 30, justifyContent: 'center', }}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => this.renderMarker()}
                        >
                            <Image
                                source={require('../../assets/images/location-red.png')}
                                style={{ width: 18, height: 18, top: 1 }}
                            />
                            <Text style={styles.textStyle}>Accredited Hospital</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle}>
                            <Image
                                source={require('../../assets/images/location-blue.png')}
                                style={{ width: 18, height: 18, top: 1 }}
                            />
                            <Text style={styles.textStyle}>Accredited Clinic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle}>
                            <Image
                                source={require('../../assets/images/location-green.png')}
                                style={{ width: 18, height: 18, top: 1 }}
                            />
                            <Text style={styles.textStyle}>Intellicare Offices</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        const { latitude, longitude, destination } = this.state
        console.log('Current position', this.state)
        const { container, map, mapSection, headerStyle, searchIcon, textStyle, buttonStyle } = styles
        var imgBox = null
        if (!_.isEmpty(destination)) {
            imgBox =
                <View style={{
                    bottom: 5,
                    width: width * 0.98,
                    height: height * 0.10,
                    backgroundColor: 'gray',
                    borderRadius: 10,
                    // alignContent: 'flex-start',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Text style={{ color: "white", fontSize: 11 }}>{destination.name}</Text>
                    <Text style={{ color: "white", fontSize: 11 }}>{destination.address}</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 6,
                            borderWidth: 1,
                            borderColor: '#1AA811',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            width: 100,
                            height: 30,
                            margin: 2
                        }}
                        onPress={() => this.handleGetDirections()}
                    >
                        <Image
                            source={require('../../assets/images/location-red.png')}
                            style={{ width: 20, height: 20, top: 1 }}
                        />
                        <Text style={styles.textStyle}>Get Direction</Text>
                    </TouchableOpacity>
                </View>
        }

        return (
            <Container>
                <Header searchBar rounded style={headerStyle}>
                    <Item>
                        <Icon name="ios-search" style={searchIcon} />
                        <Input placeholder="Search" placeholderTextColor="#bdc3c7" />
                        <Icon name="md-list" style={searchIcon} />
                    </Item>

                </Header>
                {this.renderHeaderMapButton()}
                <View style={mapSection}>
                    <View style={container}>
                        <MapView
                            showsUserLocation
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={map}
                            region={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                            camera={{
                                center: {
                                    latitude: latitude,
                                    longitude: longitude,
                                },
                                pitch: 90,
                                heading: 2,
                                altitude: 8,
                                zoom: 16,
                            }}
                        >
                            {this.renderMarker()}
                        </MapView>

                        {imgBox}
                    </View>
                </View>
            </Container>
        );
    };
}

export const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create(
    {
        container: {
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        mapSection: {
            flex: 1,
            borderRadius: 50,
            padding: 10,
            flex: 7,
            backgroundColor: '#fff'
        },
        headerStyle: {
            backgroundColor: "#f5f5f5"
        },
        searchIcon: {
            color: "#2d2d2d",
        },
        textStyle: {
            alignSelf: 'center',
            color: '#1AA811',
            fontSize: 12,
            fontWeight: '600',
        },
        buttonStyle: {
            alignSelf: 'stretch',
            backgroundColor: '#fff',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#1AA811',
            justifyContent: 'center',
            flexDirection: 'row',
            width: 140,
            height: 22,
            margin: 2
        }
    }
)