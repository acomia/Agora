import React, { PureComponent } from 'react'
import { View, PermissionsAndroid, Image, StatusBar, ScrollView, TouchableOpacity, Platform, FlatList, Linking, Animated, TouchableNativeFeedback } from 'react-native'
import { Text, ListItem, Container } from 'native-base'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import getDirections from 'react-native-google-maps-directions'
import _ from 'lodash'
import Spinner from 'react-native-spinkit'
import { SearchBar } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome5'

import styles from './IntellimapStyle'

const offices = require('../../../offices.json')
const SCREEN_WIDTH = require('react-native-extra-dimensions-android').getRealWindowWidth()
const SCREEN_HEIGHT = require('react-native-extra-dimensions-android').getRealWindowHeight()
const STATUSBAR_HEIGHT = require('react-native-extra-dimensions-android').getStatusBarHeight()

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
        }
        else {
        }
    } catch (err) {
        console.warn(err)
    }
}
export default class Intellimap extends PureComponent {
    constructor(props) {
        super(props);
        global.token = ''
        this.state = {
            latitude: 0, longitude: 0, curLatitude: 0, curLongitude: 0, hospitals: [], clinics: [], offices: offices, markers: [], searchData: [], imgSrc: "hospital-symbol", search: '',
            officeSelected: false, clinicPressed: false, hospitalPressed: true, loading: false, searchTextChanged: false,
            detailsHeight: new Animated.Value(71), rotateArrow: new Animated.Value(0), detailsOpacity: new Animated.Value(0), expandDetails: false
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

        this._retrieveData()
        // Fetching token for map authentication //
        fetch('https://intellicare.com.ph/uat/webservice/thousandminds/api/login', {
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
                            if (this.state.hospitals.length > 0 && this.state.clinics.length > 0) {
                                this.setState({ loading: false })
                                this.arrayholder = this.state.hospitals
                                console.log('Got it!')
                            } else {
                                { this._getMarkersData() }
                            }
                        } else {
                            alert('Username not found!')
                        }
                    })
            })
            .catch((error) => {
                alert('Error!' + error)
            })
    }
    _storeData = async (hospital, clinic) => {
        const hospitalSet = ['hospitalData', JSON.stringify(hospital)]
        const clinicSet = ['clinicData', JSON.stringify(clinic)]
        try {
            await AsyncStorage.multiSet([hospitalSet, clinicSet]);
        } catch (error) {
            alert('Cannot save the data!')
        }
    }
    _retrieveData = async () => {
        try {
            const hData = await AsyncStorage.getItem('hospitalData');
            const cData = await AsyncStorage.getItem('clinicData');
            if (hData !== null && cData !== null) {
                // We have data!!
                this.setState({ hospitals: JSON.parse(hData), clinics: JSON.parse(cData) })
            }
        } catch (error) {
            alert('Cannot retrieve the data!')
        }
    }
    _getMarkersData() {
        // Fetching all accredited hospitals //
        fetch('https://intellicare.com.ph/uat/webservice/thousandminds/api/providers/map?type=H', {
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
        fetch('https://intellicare.com.ph/uat/webservice/thousandminds/api/providers/map?type=C', {
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
                        let hospitalData = this.state.hospitals
                        let clinic_Data = this.state.clinics
                        this._storeData(hospitalData, clinic_Data)
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
    onHospitalButtonPress = (hospitals) => {
        this.setState({
            searchData: hospitals,
            imgSrc: "hospital-symbol",
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
            imgSrc: "clinic-medical",
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
            searchData: [],
            imgSrc: require('../../../assets/images/intellicare-icon.png'),
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
            <View style={{ height: 30, justifyContent: 'center', backgroundColor: 'transparent', top: STATUSBAR_HEIGHT }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ backgroundColor: 'transparent' }} >
                    <TouchableOpacity
                        disabled={this.state.hospitalPressed}
                        style={!this.state.hospitalPressed ? [styles.buttonStyle, { backgroundColor: '#F2F3F4', borderColor: 'silver' }] : [styles.buttonStyle, { backgroundColor: '#fff', borderColor: '#1AA811' }]}
                        onPress={() => this.onHospitalButtonPress(hospitals)}>
                        <Image
                            source={require('../../../assets/images/location-red.png')}
                            style={{ width: 18, height: 18, top: 2 }} />
                        <Text style={styles.textStyle}>Accredited Hospital</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.state.clinicPressed}
                        style={!this.state.clinicPressed ? [styles.buttonStyle, { backgroundColor: '#F2F3F4', borderColor: 'silver' }] : [styles.buttonStyle, { backgroundColor: '#fff', borderColor: '#1AA811' }]}
                        onPress={() => this.onClinicButtonPress(clinics)}>
                        <Image
                            source={require('../../../assets/images/location-blue.png')}
                            style={{ width: 18, height: 18, top: 2 }} />
                        <Text style={styles.textStyle}>Accredited Clinic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.state.officeSelected}
                        style={!this.state.officeSelected ? [styles.buttonStyle, { backgroundColor: '#F2F3F4', borderColor: 'silver' }] : [styles.buttonStyle, { backgroundColor: '#fff', borderColor: '#1AA811' }]}
                        onPress={() => this.onOfficesButtonPress()}>
                        <Image
                            source={require('../../../assets/images/intellicare-icon.png')}
                            style={{ width: 8, height: 18, top: 2 }} />
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
    onMarkerPress = location => () => {
        if (this.state.officeSelected) {
            const { coords: { latitude, longitude } } = location
            this.setState({
                destination: location,
                latitude: latitude,
                longitude: longitude
            })
        } else {
            const { latitudes, longitudes, hospital_name } = location
            var newLatitude = Number(latitudes)
            var newLongitude = Number(longitudes)
            this.setState({
                destination: location,
                latitude: newLatitude,
                longitude: newLongitude,
                searchData: [],
            })
        }
    }
    officeMarkerDetails = (destination) => {
        return (
            <View style={styles.markerDetailsStyle}>
                <Animated.View style={{ backgroundColor: '#fff', borderRadius: 6, height: this.state.detailsHeight }}>
                    <ListItem style={{ alignItems: 'center' }}>
                        <Image
                            source={{ uri: destination.image_url }}
                            resizeMode='cover'
                            style={styles.markerDetImgStyle} />
                        <View style={{ flexDirection: 'column', marginLeft: 6 }}>
                            <Text style={{ color: "#5FB650", fontSize: 13, fontWeight: 'bold', marginVertical: 6 }}>{destination.name}</Text>
                            <Text style={{ fontSize: 10, color: 'silver', alignSelf: 'flex-start' }}>{destination.phone}</Text>
                        </View>
                    </ListItem>
                    <Animated.ScrollView style={{ opacity: this.state.detailsOpacity }}>
                        <ListItem style={{ backgroundColor: '#fff', flexDirection: 'row', height: 60 }}>
                            <Icon name="clock" color='#5FB650' size={22} />
                            <Text style={{ fontSize: 10, color: 'silver', marginLeft: 6 }}>{destination.ofc_hrs.trim() === '' && destination.ofc_schedule.trim() === '' ? 'N/A'
                                : `${destination.ofc_hrs} ${destination.ofc_schedule}`}</Text>
                        </ListItem>
                        <ListItem style={{ backgroundColor: '#fff', flexDirection: 'row', height: 60 }}>
                            <Icon name="map-marked" color='#5FB650' size={22} />
                            <Text
                                onPress={() => this.handleGetDirections(destination)}
                                style={{ fontSize: 10, color: 'silver', marginLeft: 6 }}>{destination.address}</Text>
                        </ListItem>
                    </Animated.ScrollView>
                </Animated.View>
                <Animated.View style={[styles.arrowDownDetailsStyle, { rotation: this.state.rotateArrow }]}>
                    <TouchableOpacity onPress={() => this._animateDetails()}>
                        <Icon name="chevron-circle-down" size={22} color="#5FB650" />
                    </TouchableOpacity>
                </Animated.View>
            </View >
        )
    }
    hospclinicMarkerDetails = (destination) => {
        const { imgSrc } = this.state
        return (
            <View style={styles.markerDetailsStyle}>
                <Animated.View style={{ backgroundColor: '#fff', borderRadius: 6, height: this.state.detailsHeight }}>
                    <ListItem style={{ alignItems: 'center' }}>
                        <Icon name={imgSrc} color='#5FB650' size={30} />
                        <View style={{ flexDirection: 'column', marginLeft: 6 }}>
                            <Text style={{ color: this.state.hospitalPressed ? "red" : "#5DADE2", fontSize: 13, fontWeight: 'bold', marginVertical: 6 }}>{destination.hospital_name}</Text>
                            <Text style={{ fontSize: 10, color: 'silver', alignSelf: 'flex-start' }}>{destination.phone}</Text>
                        </View>
                    </ListItem>
                    <Animated.ScrollView style={{ opacity: this.state.detailsOpacity }}>
                        <ListItem style={{ backgroundColor: '#fff', flexDirection: 'row', height: 60 }}>
                            <Icon name="clock" color='#5FB650' size={22} />
                            <Text style={{ fontSize: 10, color: 'silver', marginLeft: 6 }}>{destination.clinic_hrs.trim() === '' ? 'N/A' : destination.clinic_hrs}</Text>
                        </ListItem>
                        <ListItem style={{ backgroundColor: '#fff', flexDirection: 'row', height: 60 }}>
                            <Icon name="map-marked" color='#5FB650' size={22} />
                            <Text
                                onPress={() => this.handleGetDirections(destination)}
                                style={{ fontSize: 10, color: 'silver', marginLeft: 6 }}>{`${destination.street} ${destination.subd_brgy} ${destination.city_prov}`}</Text>
                        </ListItem>
                    </Animated.ScrollView>
                </Animated.View>
                <Animated.View style={[styles.arrowDownDetailsStyle, { rotation: this.state.rotateArrow }]}>
                    <TouchableOpacity onPress={() => this._animateDetails()}>
                        <Icon name="chevron-circle-down" size={22} color="#5FB650" />
                    </TouchableOpacity>
                </Animated.View>
            </View >
        )
    }
    _animateDetails = () => {
        if (this.state.expandDetails === true) {
            Animated.timing(this.state.detailsHeight, {
                toValue: 71,
                duration: 1000
            }).start()
            Animated.timing(this.state.rotateArrow, {
                toValue: 0,
                duration: 1200
            }).start()
            Animated.timing(this.state.detailsOpacity, {
                toValue: 0,
                duration: 800
            }).start()
            this.setState({ expandDetails: false })
        } else {
            Animated.timing(this.state.detailsHeight, {
                toValue: 220,
                duration: 1000
            }).start()
            Animated.timing(this.state.rotateArrow, {
                toValue: 180,
                duration: 1200
            }).start()
            Animated.timing(this.state.detailsOpacity, {
                toValue: 1,
                duration: 1200
            }).start()
            this.setState({ expandDetails: true })
        }
    }
    makeCall = (telNumber) => {

        let phoneNumber = telNumber;
        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${' + phoneNumber + '}'
        } else {
            phoneNumber = 'telprompt:${' + phoneNumber + '}'
        }

        Linking.openURL(phoneNumber);
    }
    render() {
        const { latitude, longitude, destination, markers, searchData } = this.state
        const { map, spinnerStyle, } = styles
        var imgBox = null
        if (!_.isEmpty(destination)) {
            if (this.state.officeSelected) {
                imgBox = this.officeMarkerDetails(destination)
            } else {
                imgBox = this.hospclinicMarkerDetails(destination)
            }
        }
        return (
            <Container>
                <View style={styles.container}>
                    <StatusBar backgroundColor='#5FB650' />
                    <MapView
                        showsUserLocation
                        provider={PROVIDER_GOOGLE}
                        style={map}
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}>
                        {markers.length > 0 ? this.renderMarker() : null}
                    </MapView>
                    <SearchBar
                        lightTheme
                        containerStyle={styles.searchBarContainerStyle}
                        inputContainerStyle={{ backgroundColor: 'white', height: 34, bottom: 6 }}
                        inputStyle={{ fontSize: 12 }}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        onClear={() => this.setState({ searchData: [], destination: '', latitude: this.state.curLatitude, longitude: this.state.curLongitude })}
                        placeholder="Search Facilities/City Municipality..."
                        value={this.state.value}
                        autoCorrect={false}
                    />
                    {this.renderHeaderMapButton()}
                    {searchData.length > 0 && this.state.searchTextChanged && this.state.search !== '' ?
                        <FlatList
                            data={this.state.searchData}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            renderItem={({ item }) => (
                                <View style={styles.searchViewStyle}>
                                    <ListItem>
                                        <TouchableOpacity onPress={this.onMarkerPress(item)}>
                                            <Text style={this.state.hospitalPressed ? [styles.hospitalNameSeachTextStyle, { color: 'red' }] : [styles.hospitalNameSeachTextStyle, { color: '#5DADE2' }]}>{item.hospital_name}</Text>
                                            <Text style={styles.hospitalSubitemSeachTextStyle}>{`${item.street} ${item.subd_brgy} ${item.city_prov}`}</Text>
                                            <Text style={styles.hospitalSubitemSeachTextStyle}>{item.phone}</Text>
                                        </TouchableOpacity>
                                    </ListItem>
                                </View>
                            )}
                            keyExtractor={item => item.hospital_code}
                        /> : null}
                    {imgBox}
                </View>
                {this.state.loading &&
                    <View style={spinnerStyle}>
                        <Spinner color={'green'} size={200} type={'Bounce'} />
                    </View>
                }
            </Container>
        );
    };
}