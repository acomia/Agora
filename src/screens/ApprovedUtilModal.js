import React from 'react'
import { Text, View, Button, Modal, StyleSheet } from 'react-native';

export default class ApprovedUtilModal extends React.Component {

    state = {
        modalVisible: false,
    };

    render() {
         modalVisible: true
        const { ap_code } = this.props.navigation.state.params
      
       return (

        <View style={StyleSheet.create}>
        <Modal
            visible={this.state.modalVisible}
            animationType={'fade'}
            onRequestClose={() => this.closeModal()}>
            <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                    <Text>RCS No.</Text>
                    <Text>sasas</Text>
                    <Button rounded block success style={{ marginTop: 50 }} onPress={() => this.closeModal()}
                    title="Okay">
                    </Button>
                </View>
            </View>
        </Modal>
    </View>
       )   
    }
}

const styles = StyleSheet.create(
    {
        listStyle: {
            color: "green",
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white',
        },
        innerContainer: {
            alignItems: 'center',
        }

    }
)