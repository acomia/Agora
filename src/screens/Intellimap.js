import React, { PureComponent } from 'react'
import { StyleSheet, View, Dimensions, PermissionsAndroid, Alert, Image, Animated, ListView, ScrollView, TouchableOpacity, Platform, FlatList, Linking } from 'react-native'
import { Container, Header, Text, Item, Input, Segment, Button, Left, Body, Title, Right, Content, Label, ListItem } from 'native-base'
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import getDirections from 'react-native-google-maps-directions'
import _ from 'lodash'
import Spinner from 'react-native-spinkit'
import Geocoder from 'react-native-geocoding'
import { SearchBar, Icon } from 'react-native-elements'

const offices = require('../../offices.json')
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

export async function request_location_runtime_permission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'IntelliMap Location Permission',
                message: 'Intellicare Mobile App needs access to your location ',
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
            latitude: 0, longitude: 0, curLatitude: 0, curLongitude: 0, hospitals: [], clinics: [], offices: offices, markers: [], searchData: [], imgSrc: '', search: '',
            officeSelected: false, clinicPressed: false, hospitalPressed: true, loading: false, searchTextChanged: false
        }
        this.arrayholder = [];
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
    SearchFilterFunction(text) {
        this.setState({
            value: text,
        });
        const newData = this.arrayholder.filter(item => {
            // const itemData = item.hospital_name ? item.hospital_name.toUpperCase() : ''.toUpperCase()
            const itemData = `${item.hospital_name.toUpperCase()} ${item.city_prov.toUpperCase()} ${item.hospital_code.toUpperCase()}`;
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1;
        })
        this.setState({
            searchData: newData,
            search: text,
            searchTextChanged: true
        })
    }
    ListViewItemSeparator = () => {
        return (
            <View style={styles.listViewItemSeparatorStyle} />
        )
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
                        this.arrayholder = hospitalData.data
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
            searchData: hospitals,
            imgSrc: require('../../assets/images/location-red.png'),
            destination: '',
            hospitalPressed: true,
            clinicPressed: false,
            officeSelected: false,
            value: ''
        })
        this.arrayholder = hospitals
    }
    onClinicButtonPress = (clinics) => {
        this.setState({
            searchData: clinics,
            imgSrc: require('../../assets/images/location-blue.png'),
            destination: '',
            hospitalPressed: false,
            clinicPressed: true,
            officeSelected: false,
            value: ''
        })
        this.arrayholder = clinics
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
            <View style={{ height: 26, justifyContent: 'center', backgroundColor: 'transparent' }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ backgroundColor: 'transparent' }} >
                    <TouchableOpacity
                        disabled={this.state.hospitalPressed ? true : false}
                        style={!this.state.hospitalPressed ? styles.buttonStyle : styles.disabledButtonStyle}
                        onPress={() => this.onHospitalButtonPress(hospitals)}>
                        <Image
                            source={require('../../assets/images/location-red.png')}
                            style={{ width: 18, height: 18, top: 1 }} />
                        <Text style={styles.textStyle}>Accredited Hospital</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.state.clinicPressed ? true : false}
                        style={!this.state.clinicPressed ? styles.buttonStyle : styles.disabledButtonStyle}
                        onPress={() => this.onClinicButtonPress(clinics)}>
                        <Image
                            source={require('../../assets/images/location-blue.png')}
                            style={{ width: 18, height: 18, top: 1 }} />
                        <Text style={styles.textStyle}>Accredited Clinic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.state.officeSelected ? true : false}
                        style={!this.state.officeSelected ? styles.buttonStyle : styles.disabledButtonStyle}
                        onPress={() => this.onOfficesButtonPress()}>
                        <Image
                            source={require('../../assets/images/intellicare-icon.png')}
                            style={{ width: 8, height: 18, top: 1 }} />
                        <Text style={styles.textStyle}>Intellicare Offices</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View >
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
                        }
                        // else {
                        //     const { latitudes, longitudes, hospital_name } = location
                        //     var newLatitude = Number(latitudes)
                        //     var newLongitude = Number(longitudes)
                        //     if (newLatitude == NaN || newLatitude == 0 || newLatitude == null) {
                        //         newLatitude == 14.5594041
                        //     } if (newLongitude == NaN || newLongitude == 0 || newLongitude == null) {
                        //         newLongitude == 121.014414
                        //     }
                        //     this.state = { coordinate: { latitude: newLatitude, longitude: newLongitude, } }
                        //     return (
                        //         <Marker
                        //             coordinate={this.state.coordinate}
                        //             title={hospital_name}
                        //             onPress={this.onMarkerPress(location)}>
                        //             <Image
                        //                 source={imgSrc}
                        //                 style={{ height: 30, width: 30 }} />
                        //         </Marker>
                        //     )
                        // }
                    })
                }
            </View>
        )

    }
    renderSearchMarker(item) {
        const { imgSrc } = this.state
        var newLatitude = Number(item.latitudes)
        var newLongitude = Number(item.longitudes)
        if (newLatitude == NaN || newLatitude == 0 || newLatitude == null) {
            newLatitude == 14.5594041
        } else if (newLongitude == NaN || newLongitude == 0 || newLongitude == null) {
            newLongitude == 121.014414
        }
        this.state = { coordinate: { latitude: newLatitude, longitude: newLongitude, } }
        return (
            <Marker
                coordinate={this.state.coordinate}
                title={item.hospital_name}
                onPress={this.onMarkerPress(item)}>
                <Image
                    source={imgSrc}
                    style={{ height: 30, width: 30 }} />
            </Marker>
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
            this.setState({ destination: location, searchData: [] })
        }
    }
    officeMarkerDetails = (destination) => {
        const { imgSrc } = this.state
        return (
            <View style={styles.markerDetailsStyle}>
                <View style={styles.markerDetListStyle}>
                    <ListItem>
                        <Image
                            source={{ uri: destination.image_url }}
                            resizeMode='cover'
                            style={styles.markerDetImgStyle} />
                        <Text style={{ color: "green", fontSize: 13, fontWeight: 'bold', marginHorizontal: 10 }}>{destination.name}</Text>
                        <TouchableOpacity style={{ alignContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                            <Icon name='star' type='evilicon' color='green' size={26} />
                        </TouchableOpacity>
                    </ListItem>
                    <ListItem>
                        <Text style={{ alignSelf: 'center', fontSize: 12, color: 'silver' }}>{destination.phone}</Text>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.makeCall(destination.phone)}>
                                <Icon name='phone' color='green' size={26} iconStyle={{ marginHorizontal: 8, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name='comment' type='evilicon' color='green' size={32} />
                            </TouchableOpacity>
                        </View>
                    </ListItem>
                </View>
                <View style={styles.markerDetSchedStyle}>
                    <ListItem>
                        <Icon name="clock" type='evilicon' color='green' size={32} iconStyle={{ marginHorizontal: 5 }} />
                        <Text style={styles.markerDetTextStyle}>{`${destination.ofc_hrs} ${destination.ofc_schedule}`}</Text>
                    </ListItem>
                </View>
                <View style={styles.markerDetListStyle}>
                    <ListItem>
                        <Icon name="location" type='evilicon' color='green' size={32} iconStyle={{ marginHorizontal: 5 }} />
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
                <View style={styles.markerDetListStyle}>
                    <ListItem>
                        <Image
                            source={this.state.hospitalPressed ? require('../../assets/images/hospital_img.png') : require('../../assets/images/clinic_img.png')}
                            resizeMode='cover'
                            style={styles.markerDetImgStyle} />
                        <Text style={{ color: "green", fontSize: 13, fontWeight: 'bold', marginHorizontal: 10 }}>{destination.hospital_name}</Text>
                        <TouchableOpacity style={{ alignContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                            <Icon name='star' type='evilicon' color='green' size={26} />
                        </TouchableOpacity>
                    </ListItem>
                    <ListItem>
                        <Text style={{ alignSelf: 'center', fontSize: 12, color: 'silver' }}>{destination.phone}</Text>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity >
                                <Icon name='phone' color='green' size={26} iconStyle={{ marginHorizontal: 8, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name='comment' type='evilicon' color='green' size={32} />
                            </TouchableOpacity>
                        </View>
                    </ListItem>
                </View>
                <View style={styles.markerDetSchedStyle}>
                    <ListItem>
                        <Icon name="clock" type='evilicon' color='green' size={32} iconStyle={{ marginHorizontal: 5 }} />
                        <Text style={styles.markerDetTextStyle}>{destination.clinic_hrs}</Text>
                    </ListItem>
                </View>
                <View style={styles.markerDetListStyle}>
                    {/* <ListItem>
                        <Icon name="md-medical" type='ionicon' color='green' size={32} iconStyle={{ marginHorizontal: 5 }} />
                        <TouchableOpacity>
                            <Text style={[styles.markerDetTextStyle, { textDecorationLine: 'underline' }]}>See Available Doctors</Text>
                        </TouchableOpacity>
                    </ListItem> */}
                    <ListItem >
                        <Icon name="location" type='evilicon' color='green' size={32} iconStyle={{ marginHorizontal: 5 }} />
                        <Text style={[styles.markerDetTextStyle, { flexWrap: 'wrap' }]}>{`${destination.street} ${destination.subd_brgy} ${destination.city_prov}`}</Text>
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
            </View >
        )
    }
    makeCall = (telNumber) => {

        let phoneNumber = telNumber;
        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${' + phoneNumber + '}'
        } else {
            phoneNumber = 'telprompt:${' + phoneNumber + '}'
        }

        Linking.openURL(phoneNumber);
    };
    render() {
        const { latitude, longitude, destination, markers, searchData } = this.state
        const { map, spinnerTextStyle, spinnerStyle, headerStyle } = styles
        var imgBox = null
        if (!_.isEmpty(destination)) {
            if (this.state.officeSelected) {
                imgBox = this.officeMarkerDetails(destination)
            } else {
                imgBox = this.hospclinicMarkerDetails(destination)
            }
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white', marginTop: Platform.OS == 'ios' ? 30 : 30 }}>
                <Header androidStatusBarColor={'#5FB650'} style={headerStyle}>
                    <SearchBar
                        containerStyle={{ backgroundColor: '#5FB650', width: SCREEN_WIDTH }}
                        inputContainerStyle={{ backgroundColor: 'white' }}
                        inputStyle={{ fontSize: 14 }}
                        round
                        searchIcon={{ size: 24 }}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        onClear={() => this.setState({ searchData: [], destination: '' })}
                        placeholder="Search Facilities/City Municipality..."
                        value={this.state.value}
                        autoCorrect={false}
                    />
                </Header>
                {this.renderHeaderMapButton()}
                <View style={styles.mapSection}>
                    <MapView
                        showsUserLocation
                        provider={PROVIDER_GOOGLE}
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
                    {imgBox}
                    {searchData.length > 0 && this.state.searchTextChanged && this.state.search !== '' ?
                        <FlatList
                            data={this.state.searchData}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            renderItem={({ item }) => (
                                <View style={{ backgroundColor: 'white' }}>
                                    {/* <ListItem
                                        title={item.hospital_name}
                                        subtitle={item.city_prov}
                                    /> */}
                                    <ListItem>
                                        <TouchableOpacity onPress={this.onMarkerPress(item)}>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 12, fontWeight: 'bold' }}>{item.hospital_name}</Text>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 10, color: 'silver' }}>{item.city_prov}</Text>
                                        </TouchableOpacity>
                                    </ListItem>
                                </View>
                            )}
                            keyExtractor={item => item.hospital_code}
                        /> : null}
                </View>
                {this.state.loading &&
                    <View style={spinnerStyle}>
                        <Spinner color={'green'} size={200} type={'Bounce'} />
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
            flex: 1,
            backgroundColor: '#fff'
        },
        headerStyle: {
            backgroundColor: "#f5f5f5",
        },
        searchTextStyle: {
            padding: 10,
        },
        searchHeaderStyle: {
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'white',
            marginTop: Platform.OS == 'ios' ? 30 : 30
        },
        searchIcon: {
            color: "#2d2d2d",
        },
        searchTextInput: {
            borderWidth: 1,
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
            fontSize: 20,
            color: 'red',
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
            top: 2,
            width: 140,
            height: 22,
            marginHorizontal: 3
        },
        disabledButtonStyle: {
            alignSelf: 'stretch',
            backgroundColor: '#F2F3F4',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#0000',
            justifyContent: 'center',
            flexDirection: 'row',
            top: 2,
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
            backgroundColor: 'transparent',
            flexDirection: 'column',
            top: SCREEN_HEIGHT * 0.5,
            height: SCREEN_HEIGHT * 0.4
        },
        imgBoxStyle: {
            ...StyleSheet.absoluteFillObject,
            position: 'absolute',
            backgroundColor: 'transparent',
            borderRadius: 10
        },
        imgNameStyle: {
            backgroundColor: 'white',
            marginVertical: 2,
            borderRadius: 5,
            flexDirection: "column",
            alignItems: 'center',
            height: '30%'
        },
        markerDetTextStyle: {
            color: "#000",
            fontSize: 12
        },
        markerDetImgStyle: {
            width: 40,
            height: 40,
            borderRadius: 50,
        },
        markerDetSchedStyle: {
            backgroundColor: 'white',
            marginVertical: 2,
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '12%',
        },
        markerDetListStyle: {
            backgroundColor: 'white',
            marginVertical: 2,
            borderRadius: 5,
            marginLeft: 2,
            marginRight: 2,
            paddingHorizontal: 5
        },
        listViewItemSeparatorStyle: {
            height: 0.8,
            width: SCREEN_WIDTH,
            backgroundColor: '#58D68D',
            marginLeft: 5,
        }
    }
)