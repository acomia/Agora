import React from 'react'
import { StyleSheet, View, Dimensions, Image, ImageBackground, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { Container, Header, Content, Button, Text, Icon, Left, Right, Body, Card, CardItem, Thumbnail, Item, Input, Tabs, Tab, Tab1, Tab2, Tab3 } from 'native-base'
import { ScrollView, } from 'react-native-gesture-handler';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { DrawerActions } from 'react-navigation-drawer';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

export default class Intellimap extends React.Component {
    render() {
        return (
            <Container>
                <Header searchBar rounded style={styles.headerStyle}>
                    <Item>
                        <Icon name="ios-search" style={styles.searchIcon} />
                        <Input placeholder="Search" placeholderTextColor="#bdc3c7" />
                        <Icon name="md-list" style={styles.searchIcon} />
                    </Item>
                    {/* <Tabs>
                        <Tab heading="Tab1">
                            <Tab1>
                                <Text>Sample Text</Text>
                            </Tab1>
                        </Tab>
                        <Tab heading="Tab2">
                            <Tab2>
                                <Text>Sample Text</Text></Tab2>>
                        </Tab>
                        <Tab heading="Tab3">
                            <Tab3>
                                <Text>Sample Text</Text>
                            </Tab3>
                        </Tab>
                    </Tabs> */}
                </Header>

                <View style={styles.mapSection}>
                    <View style={styles.container}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            region={{
                                latitude: 14.5614258,
                                longitude: 121.0120583,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                            camera={{
                                center: {
                                    latitude: 14.5614258,
                                    longitude: 121.0120583,
                                },
                                pitch: 90,
                                heading: 2,
                                altitude: 8,
                                zoom: 16,
                            }}
                            mapPadding={{bottom: 180, left:10,top:40}}>
                            <Marker coordinate={{
                                latitude: 14.5614258,
                                longitude: 121.0120583,
                            }}
                                title={'INTELLICARE - HEAD OFFICE'}
                                description={'Philippine AXA Life Bldg, Sen. Gil Puyat Ave., Makati City'}
                                
                            />
                        </MapView>
                    </View>
                </View>
            </Container>

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
        }
    }
)