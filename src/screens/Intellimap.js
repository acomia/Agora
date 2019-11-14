import React, { PureComponent } from 'react'
import { StyleSheet, View, Dimensions, PermissionsAndroid, Alert, Image, Animated, ListView, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import { Container, Header, Text, Icon, Item, Input, ListItem, Segment, Button, Left, Body, Title, Right, Content, List, Label } from 'native-base'
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Geolocation from 'react-native-geolocation-service'
import getDirections from 'react-native-google-maps-directions'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'
import Spinner from 'react-native-spinkit'
// import isEqual from 'lodash.isequal'
// import Geocoder from 'react-native-geocoding'

const offices = require('../../offices.json')

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
export default class Intellimap extends PureComponent {
    scroll = new Animated.Value(0)
    headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, 56), -1)

    constructor(props) {
        super(props);
        global.token = ''
        this.state = {
            latitude: 0, longitude: 0, curLatitude: 0, curLongitude: 0, hospitals: [], clinics: [], offices: offices, markers: [], imgSrc: '', loading: false,
            officeSelected: false, clinicPressed: false, hospitalPressed: false,
        }
    }
    async componentDidMount() {
        this.setState({
            loading: true
        })
        await request_location_runtime_permission()
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    curLatitude: position.coords.latitude,
                    curLongitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
        )
        // Geocoder.init('AIzaSyAEr63gs_sYIqF9HFTvqQX4rvdPEcrNQTo')
        // Geocoder.from(curLatitude, curLongitude)
        //     .then(json => {
        //         var addressComponent = json.results[0].address_components[0];
        //         console.log('Current Address:', addressComponent);
        //         Alert.alert(addressComponent);
        //     })
        //     .catch(error => console.warn(error));

        // Fetching token for map authentication //
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
                        if (data.code === 200) {
                            global.token = data.response.token
                            { this._getMarkersData() }
                        } else {
                            alert('Username not found!')
                        }
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }
    _getMarkersData() {
        // Fetching all accredited hospitals //
        fetch('http://www.intellicare.com.ph/uat/webservice/thousandminds/api/providers/map?type=H', {
            method: 'GET',
            headers: {
                'authToken': global.token,
            }
        })
            .then((response) => {
                response.json()
                    .then((hospitalData) => {
                        this.setState({
                            hospitals: hospitalData.data
                        })
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
        // Fetching all accredited clinics //
        fetch('http://www.intellicare.com.ph/uat/webservice/thousandminds/api/providers/map?type=C', {
            method: 'GET',
            headers: {
                'authToken': global.token,
            }
        })
            .then((response) => {
                response.json()
                    .then((clinicData) => {
                        this.setState({
                            clinics: clinicData.data,
                            loading: false
                        })
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }
    onHospitalButtonPress = (hospitals) => {
        this.setState({
            markers: hospitals,
            imgSrc: require('../../assets/images/location-red.png'),
            destination: '',
            hospitalPressed: true,
            clinicPressed: false,
            officeSelected: false
        })
        { this.renderMarker() }
    }
    onClinicButtonPress = (clinics) => {
        this.setState({
            markers: clinics,
            imgSrc: require('../../assets/images/location-blue.png'),
            destination: '',
            hospitalPressed: false,
            clinicPressed: true,
            officeSelected: false
        })
        { this.renderMarker() }
    }
    onOfficesButtonPress() {
        this.setState({
            markers: offices,
            imgSrc: require('../../assets/images/intellicare-icon.png'),
            destination: '',
            hospitalPressed: false,
            clinicPressed: false,
            officeSelected: true
        })
        { this.renderMarker() }
    }
    handleGetDirections = (destination) => {
        const { curLatitude, curLongitude, officeSelected } = this.state
        var desLat = 0
        var desLong = 0
        if (officeSelected) {
            desLat = destination.coords.latitude
            desLong = destination.coords.longitude
        } else {
            var newDesLat = Number(destination.latitudes)
            var newDesLong = Number(destination.longitudes)
            desLat = newDesLat
            desLong = newDesLong
        }
        const data = {
            source: {
                latitude: curLatitude,
                longitude: curLongitude,
            },
            destination: {
                latitude: desLat,
                longitude: desLong
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
        }
        getDirections(data)
    }
    renderHeaderMapButton() {
        const { hospitals, clinics } = this.state
        return (
            <View style={{paddingVertical: 15, height: 70}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row'}}>
                        <TouchableOpacity
                            disabled={this.state.hospitalPressed ? true : false}
                            style={!this.state.hospitalPressed ? styles.buttonStyle : styles.disabledButtonStyle}
                            onPress={() => this.onHospitalButtonPress(hospitals)}>
                            <Image
                                source={require('../../assets/images/location-red.png')}
                                style={{ width: 18, height: 18, marginTop: 5 }} />
                            <Text style={styles.textStyle}>Accredited Hospitals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={this.state.clinicPressed ? true : false}
                            style={!this.state.clinicPressed ? styles.buttonStyle : styles.disabledButtonStyle}
                            onPress={() => this.onClinicButtonPress(clinics)}>
                            <Image
                                source={require('../../assets/images/location-blue.png')}
                                style={{ width: 18, height: 18, marginTop: 5 }} />
                            <Text style={styles.textStyle}>Accredited Clinics</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={this.state.officeSelected ? true : false}
                            style={!this.state.officeSelected ? styles.buttonStyle : styles.disabledButtonStyle}
                            onPress={() => this.onOfficesButtonPress()}>
                            <Image
                                source={require('../../assets/images/intellicare-icon.png')}
                                style={{ width: 8, height: 18, marginTop: 5 }} />
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
                        if (this.state.officeSelected) {
                            const { coords: { latitude, longitude } } = location
                            return (
                                <Marker
                                    key={idx}
                                    coordinate={{ latitude, longitude }}
                                    title={location.name}
                                    onPress={this.onMarkerPress(location)}>
                                    <Image
                                        source={imgSrc}
                                        style={{ height: 46, width: 20 }} />
                                </Marker>
                            )
                        } else {
                            const { latitudes, longitudes, hospital_name } = location
                            var newLatitude = Number(latitudes)
                            var newLongitude = Number(longitudes)
                            if (newLatitude == NaN || newLatitude == 0 || newLatitude == null) {
                                newLatitude == 14.5594041
                            } if (newLongitude == NaN || newLongitude == 0 || newLongitude == null) {
                                newLongitude == 121.014414
                            }
                            this.state = { coordinate: { latitude: newLatitude, longitude: newLongitude, } }
                            return (
                                <Marker
                                    key={idx}
                                    coordinate={this.state.coordinate}
                                    title={hospital_name}
                                    onPress={this.onMarkerPress(location)}>
                                    <Image
                                        source={imgSrc}
                                        style={{ height: 30, width: 30 }} />
                                </Marker>
                            )
                        }
                    })
                }
            </View>
        )

    }
    onMarkerPress = location => () => {
        if (this.state.officeSelected) {
            const { coords: { latitude, longitude } } = location
            this.setState({
                destination: location,
                latitude: latitude,
                longitude: longitude
            })
        } else {
            const { latitudes, longitudes } = location
            var newLatitude = Number(latitudes)
            var newLongitude = Number(longitudes)
            this.setState({
                destination: location,
                latitude: newLatitude,
                longitude: newLongitude
            })
        }
    }
    deg2Rad = (deg) => {
        return deg * Math.PI / 180;
    }
    pythagorasEquirectangular = (lat1, lon1, lat2, lon2) => {
        lat1 = this.deg2Rad(lat1);
        lat2 = this.deg2Rad(lat2);
        lon1 = this.deg2Rad(lon1);
        lon2 = this.deg2Rad(lon2);
        console.log('Pytha:', lat1, lat2, lon1, lon2)
        const R = 6371;
        const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        const y = (lat2 - lat1);
        const d = Math.sqrt(x * x + y * y) * R;
        console.log('D:', d)
        return d;
    }
    nearestMarker = (latitude, longitude) => {
        const { hospitals } = this.state
        let mindif = 2999;
        let closest;
        console.log('LatLong:', latitude, longitude)
        for (index = 0; index < hospitals.length; ++index) {
            const dif = this.pythagorasEquirectangular(latitude, longitude, hospitals.latitudes,
                hospitals.longitudes);
            console.log('Difference:', dif)
            if (dif < mindif) {
                closest = index;
                mindif = dif;
            }
            console.log('Closest:', closest)
            return hospitals[closest]
        }
    }
    officeMarkerDetails = (destination) => {
        const { imgSrc } = this.state
        return (
            <View style={styles.markerDetailsStyle}>
                <View style={styles.imgNameStyle}>
                    <Image
                        source={{ uri: destination.image_url }}
                        resizeMode='cover'
                        style={styles.markerDetImgStyle} />
                    <Text style={{ color: "green", fontSize: 14, fontWeight: 'bold', marginHorizontal: 5 }}>{destination.name}</Text>
                    <Label style={{ color: '#D6D6D6', marginHorizontal: 5 }}>|</Label>
                    <Icon name="md-call" style={{ marginRight: 5, color: 'green' }} />
                    <Text style={styles.markerDetTextStyle}>{destination.phone}</Text>
                </View>
                <View style={styles.markerDetSchedStyle}>
                    <ListItem>
                        <Icon name="md-time" style={{ color: 'green', marginHorizontal: 5 }} />
                        <Text style={styles.markerDetTextStyle}>{destination.ofc_hrs}   {destination.ofc_schedule}</Text>
                    </ListItem>
                </View>
                <View style={styles.markerDetListStyle}>
                    <ListItem>
                        <Icon name="md-map" style={{ color: 'green', marginHorizontal: 5 }} />
                        <Text style={styles.markerDetTextStyle}>{destination.address}</Text>
                    </ListItem>
                    <ListItem >
                        <TouchableOpacity
                            style={styles.directionButtonStyle}
                            onPress={() => this.handleGetDirections(destination)}>
                            <Image
                                source={imgSrc}
                                style={{ width: 9, height: 21, top: 2, marginHorizontal: 3 }} />
                            <Text style={styles.textStyle}>Get Direction</Text>
                        </TouchableOpacity>
                    </ListItem>
                </View>
            </View >
        )
    }
    hospclinicMarkerDetails = (destination) => {
        const { imgSrc } = this.state
        return (
            <View style={styles.markerDetailsStyle}>
                <View style={styles.imgNameStyle}>
                    <Image
                        source={this.state.hospitalPressed ? require('../../assets/images/hospital_img.png') : require('../../assets/images/clinic_img.png')}
                        resizeMode='cover'
                        style={styles.markerDetImgStyle} />
                    <ScrollView horizontal={true}>
                        <Text style={{ color: "green", fontSize: 13, fontWeight: 'bold' }}>{destination.hospital_name}</Text>
                        <Label style={{ marginHorizontal: 16, color: '#D6D6D6' }}>|</Label>
                        <Icon name="md-call" style={this.state.clinicPressed ? { marginRight: 5, color: '#5DADE2' } : { marginRight: 5, color: 'red' }} />
                        <Text style={styles.markerDetTextStyle}>{destination.phone}</Text>
                    </ScrollView>
                </View>
                <View style={styles.markerDetSchedStyle}>
                    <ListItem>
                        <Icon name="md-time" style={this.state.clinicPressed ? { marginHorizontal: 5, color: '#5DADE2' } : { marginHorizontal: 5, color: 'red' }} />
                        <Text style={styles.markerDetTextStyle}>{destination.clinic_hrs}</Text>
                    </ListItem>
                </View>
                <View style={styles.markerDetListStyle}>
                    <ListItem>
                        <Icon name="md-medical" style={{ color: 'green', marginHorizontal: 5 }} />
                        <TouchableOpacity>
                            <Text style={[styles.markerDetTextStyle, { textDecorationLine: 'underline' }]}>See Available Doctors</Text>
                        </TouchableOpacity>
                    </ListItem>
                    <ListItem>
                        <Icon name="md-map" style={this.state.clinicPressed ? { marginHorizontal: 5, color: '#5DADE2' } : { marginHorizontal: 5, color: 'red' }} />
                        <Text style={styles.markerDetTextStyle}>{destination.street} {destination.subd_brgy} {destination.city_prov}</Text>
                    </ListItem>
                    <ListItem >
                        <TouchableOpacity
                            style={styles.directionButtonStyle}
                            onPress={() => this.handleGetDirections(destination)}>
                            <Image
                                source={imgSrc}
                                style={{ width: 20, height: 20, top: 2, marginHorizontal: 3 }} />
                            <Text style={styles.textStyle}>Get Direction</Text>
                        </TouchableOpacity>
                    </ListItem>
                </View>
            </View>
        )
    }
    render() {
        const { latitude, longitude, destination, markers } = this.state
        const { container, map, mapSection, searchIcon, imgBoxStyle, spinnerTextStyle, spinnerStyle } = styles
        var imgBox = null
        if (!_.isEmpty(destination)) {
            if (this.state.officeSelected) {
                imgBox = this.officeMarkerDetails(destination)
            } else {
                imgBox = this.hospclinicMarkerDetails(destination)
            }
        }
        return (
            <View style={StyleSheet.absoluteFillObject}>
                <Animated.ScrollView scrollEventThrottle={5}
                    showsVerticalScrollIndicator={false}
                    style={{ zIndex: 0, backgroundColor: 'transparent' }}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scroll } } }], { useNativeDriver: true })}>
                    <Animated.View style={{
                        height: height * 1.0,
                        width: '100%',
                        transform: [{ translateY: Animated.multiply(this.scroll, 0.5) }]
                    }}>
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
                            }}>
                            {markers.length > 0 ? this.renderMarker() : null}
                        </MapView>
                    </Animated.View>
                    <View style={{
                        transform: [{ translateY: -70 }],
                        width: width,
                    }}>
                        <View style={imgBoxStyle} />
                        {imgBox}
                    </View>
                </Animated.ScrollView>
                <Animated.View style={{
                    width: "100%",
                    position: "absolute",
                    transform: [{
                        translateY: this.headerY
                    }],
                    flex: 1,
                    backgroundColor: 'transparent'
                }}>
                    <Header searchBar rounded style={{ height: 80}} backgroundColor={'#5fb650'}>
                        <Item style={{marginTop: 25}}>
                            <Icon name="ios-search" style={searchIcon} />
                            <Input
                                placeholder="Search hospitals/clinics"
                                placeholderTextColor="#bdc3c7"
                                value={this.state.searchValue}
                                onChangeText={(searchValue) => this.setState({ searchValue })} />
                            <Icon name="md-close" style={searchIcon} onPress={() => this.setState({ searchValue: '' })} />
                        </Item>
                    </Header>
                    {this.renderHeaderMapButton()}
                </Animated.View>
                {this.state.loading &&
                    <View style={spinnerStyle}>
                        <Spinner
                            color={'green'}
                            size={200}
                            type={'Bounce'}
                        />
                        <Text style={spinnerTextStyle}>Fetching data...</Text>
                    </View>
                }
            </View>
        );
    };
}

export const { width, height } = Dimensions.get('window');

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
            color: "#c4c4c4",
        },
        textStyle: {
            alignSelf: 'center',
            color: '#c4c4c4',
            fontSize: 12,
            fontWeight: '600',
        },
        buttonStyle: {
            backgroundColor: '#fff',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#c4c4c4",
            justifyContent: "center",
            flexDirection: "row",
            width: 140,
            height: 30,
            marginHorizontal: 3,
            shadowColor: '#2d2d2d',
            shadowOffset: {width: 1, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 20,
            elevation: 3,
            borderWidth: 0,
        },
        disabledButtonStyle: {
            alignSelf: 'stretch',
            backgroundColor: '#F2F3F4',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#0000',
            justifyContent: 'center',
            flexDirection: 'row',
            width: 140,
            height: 22,
            marginHorizontal: 3
        },
        directionButtonStyle: {
            backgroundColor: '#fff',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#1AA811',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '100%',
            height: 30,
        },
        markerDetailsStyle: {
            height: '50%',
            backgroundColor: 'transparent',
            borderRadius: 10,
            flexDirection: 'column',
            justifyContent: 'center'
        },
        spinnerStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            opacity: 0.2,
            backgroundColor: 'black',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        spinnerTextStyle: {
            textAlign: 'center',
            fontSize: 20,
            color: 'red'
        },
        searchTextInput: {
            borderWidth: 1,
        },
        imgBoxStyle: {
            ...StyleSheet.absoluteFillObject,
            position: 'absolute',
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 10
        },
        imgNameStyle: {
            backgroundColor: 'white',
            marginVertical: 2,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: 'center',
            marginLeft: 5,
            marginRight: 5,
            height: '23%'
        },
        markerDetTextStyle: {
            color: "#000",
            fontSize: 12
        },
        markerDetImgStyle: {
            width: 60,
            height: 60,
            borderRadius: 50,
            marginHorizontal: 10
        },
        markerDetSchedStyle: {
            backgroundColor: 'white',
            marginVertical: 2,
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: 5,
            marginRight: 5,
            height: '10%',
            paddingHorizontal: 5
        },
        markerDetListStyle: {
            backgroundColor: 'white',
            marginVertical: 2,
            borderRadius: 5,
            marginLeft: 5,
            marginRight: 5,
            paddingHorizontal: 5
        }
    }
)