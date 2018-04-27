import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';
import firebase from 'firebase'


export default class Settings extends Component {
    addSnack() {
        Actions.addSnack();
    }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            Actions.Login();
        } catch (e) {
            console.log(e);
        }
    }
    

    render() {
        return (
            <View style={styles.container}>
                <Button buttonStyle={styles.buttons}
                    large
                    rounded
                    onPress={this.signOutUser}
                    backgroundColor='#2958a5'
                    icon={{ name: 'user-circle', type: 'font-awesome' }}
                    title='Logout' />
                <Button buttonStyle={styles.buttons}
                    large
                    rounded
                    onPress={this.addSnack}
                    backgroundColor='#2958a5'
                    icon={{ name: 'plus', type: 'font-awesome' }}
                    title='Add A Snack' />
                <Button buttonStyle={styles.buttons}
                    large
                    rounded
                    onPress={() => Communications.email(['snackability@gmail.com'],null,null,'Application FeedBack','Feedback:')}
                    backgroundColor='#2958a5'
                    icon={{ name: 'comment', type: 'font-awesome' }}
                    title='Feedback' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        marginBottom: 30
    }
});