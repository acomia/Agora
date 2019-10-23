import React from 'react'
import { StyleSheet, View, Dimensions, PermissionsAndroid, Alert, Button, Image } from 'react-native'
import { Container, Header, Text, Icon, Item, Input } from 'native-base'
import { ScrollView, TouchableOpacity, } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import _ from 'lodash'
import Geolocation from 'react-native-geolocation-service'
import getDirections from 'react-native-google-maps-directions'


const hospitals = require('../../hospital.json')
const clinics = require('../../clinic.json')

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
            clinics: clinics,
            loginToken: global.loginToken,
            markers: '',
            authToken: '',
            imgSrc: ''
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

    _getAuthToken() {
        fetch('http://www.intellicare.com.ph/uat/webservice/thousandminds/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                username: 'digitalxform',
                password: 'th2p@ssw0rd'
            })
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (data.message === 'Success!') {
                            console.log('Token:', data.response.token)
                            this.setState({
                                authToken: data.response.token
                            })
                        } else {
                            alert('Username not found!')
                        }
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }

    async _getHospitals() {
        fetch('http://www.intellicare.com.ph/uat/webservice/thousandminds/api/providers/map?type=H', {
            method: 'GET',
            headers: {
                'authToken': loginAuthToken,
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        console.log(data)
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }
    _getClinics() {
        fetch('http://www.intellicare.com.ph/uat/webservice/thousandminds/api/providers/map?type=C', {
            method: 'GET',
            headers: {
                'authToken': loginToken,
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        alert(JSON.stringify(data.key))
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }
    _getOffices() {
        fetch('http://www.intellicare.com.ph/uat/webservice/thousandminds/api/providers/map?type=H', {
            method: 'GET',
            headers: {
                'authToken': loginToken,
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        alert(JSON.stringify(data.key))
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }
    onHospitalButtonPress() {
        this.setState({
            markers: hospitals,
            imgSrc: require('../../assets/images/location-red.png'),
            destination: ''
        })
        { this.renderMarker() }
    }
    onClinicButtonPress() {
        this.setState({
            markers: clinics,
            imgSrc: require('../../assets/images/location-blue.png'),
            destination: ''
        })
        { this.renderMarker() }

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
                <ScrollView horizontal={true}>
                    <View style={{ flexDirection: 'row', height: 30, justifyContent: 'center', }}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => this.onHospitalButtonPress()}
                        >
                            <Image
                                source={require('../../assets/images/location-red.png')}
                                style={{ width: 18, height: 18, top: 1 }}
                            />
                            <Text style={styles.textStyle}>Accredited Hospital</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => this.onClinicButtonPress()}
                        >
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
    renderMarker() {
        const { markers, imgSrc } = this.state
        return (
            <View>
                {
                    markers && markers.map((location, idx) => {
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
                                    source={imgSrc}
                                    style={{ height: 30, width: 30 }}
                                />
                            </Marker>
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

    render() {
        const { latitude, longitude, destination, imgSrc } = this.state
        const { container, map, mapSection, headerStyle, searchIcon, textStyle, buttonStyle, directionButtonStyle, markerDetailsStyle } = styles
        var imgBox = null
        if (!_.isEmpty(destination)) {
            imgBox =
                <View style={markerDetailsStyle}>
                    <Image
                        source={{ uri: destination.image_url }}
                        resizeMode='cover'
                        style={{ width: 100, height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 3 }}
                    />
                    <View style={{ flex: 1, paddingLeft: 3, flexDirection: 'column' }}>
                        <Text style={{ color: "white", fontSize: 12, fontWeight: 'bold' }}>{destination.name}</Text>
                        <Text allowFontScaling={true} style={{ color: "white", fontSize: 11 }}>{destination.address}</Text>
                        <TouchableOpacity
                            style={directionButtonStyle}
                            onPress={() => this.handleGetDirections()}
                        >
                            <Image
                                source={imgSrc}
                                style={{ width: 18, height: 18, top: 1 }}
                            />
                            <Text style={textStyle}>Get Direction</Text>
                        </TouchableOpacity>
                    </View>

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
                            {this.state.markers.length > 0 ? this.renderMarker() : null}
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
            backgroundColor: "#f5f5f5",
            height: 50
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
        },
        directionButtonStyle: {
            backgroundColor: '#fff',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#1AA811',
            justifyContent: 'center',
            flexDirection: 'row',
            width: 100,
            height: 22,
            margin: 2
        },
        markerDetailsStyle: {
            position: 'absolute',
            bottom: 0,
            padding: 1,
            width: '100%',
            height: height * 0.10,
            backgroundColor: 'gray',
            borderRadius: 10,
            flexDirection: 'row',
        }
    }
)