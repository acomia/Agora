import React from 'react'
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import { Container, Icon, Tabs, Tab, TabHeading } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';

import MembInfo from './MembInfo';
import ApprovedUtil from './ApprovedUtil';
import PostedUtil from './PostedUtil';

export default class MemberInformation extends React.Component {
    render() {
        return (
            <Container>
                <Tabs tabBarPosition="overlayBottom" tabBarUnderlineStyle={{ backgroundColor: '#5fb650' }}>
                    <Tab heading={
                        <TabHeading style={styles.tabHeadingStyle}>
                            <Icon type="MaterialIcons" name="person-outline" style={styles.tabIconStyle} />
                        </TabHeading>
                    }>
                        <MembInfo />
                    </Tab>

                    <Tab heading={
                        <TabHeading style={styles.tabHeadingStyle} >
                            <Icon type="MaterialCommunityIcons" name="check-circle-outline" style={styles.tabIconStyle} />
                        </TabHeading>
                    }>
                        <ApprovedUtil />

                    </Tab>

                    <Tab heading={
                        <TabHeading style={styles.tabHeadingStyle}>
                            <Icon type="Ionicons" name="md-clipboard" style={styles.tabIconStyle} />
                        </TabHeading>
                    }>
                        <PostedUtil />
                    </Tab>
                </Tabs>
            </Container>
        );
    };
}

const styles = StyleSheet.create(
    {
        tabStyle: {
            padding: 30,
        },
        tabHeadingStyle: {
            backgroundColor: '#f5f5f5',
            flexDirection: "column",
            borderTopColor: "#5fb650",
        },
        tabIconStyle: {
            color: "#5fb650"
        },
        tabTextStyle: {
            color: "#5fb650"
        }
    }
)