import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation, Image } from 'react-native';
import { Card, List, ListItem, Button } from 'react-native-elements'
import InfoList from '../InfoList';

class Info extends Component {

    componentWillMount() {
    }

    render() {
        const list2 = [
            {
                name: 'Christina Palacios',
                avatar_url: 'https://i.imgur.com/WeG8mAm.png',
                subtitle: 'Associate Professor'
            },
            {
                name: 'Lukkamol Prapkre',
                avatar_url: 'https://i.imgur.com/B1Imo2h.png',
                subtitle: 'PhD Student'
            },
            {
                name: 'Bérénice De La Mota',
                avatar_url: 'https://i.imgur.com/zp6PZsh.png',
                subtitle: 'Master Student'
            },
            {
                name: 'Bertha Perez',
                avatar_url: 'https://i.imgur.com/D5BJoDa.png',
                subtitle: 'CS Undergrad'
            },
            {
                name: 'Frank Hernandez',
                avatar_url: 'https://i.imgur.com/yVn4Nm4.png',
                subtitle: 'CS Undergrad'
            }
        ]

        return (
            <View style={styles.container}>
                <Text style={styles.header2}>
                    Our Mission:
                </Text>
                <Text style={styles.textStyles}>
                The goal of Snackability app is to help you identify healthy snacks by providing a score {'\n'}from 0 (not healthy) to 10 (very healthy) to each snack searched in our app.
                </Text>
                <Text style={styles.header2}>
                    Snackability 1.0 Team
                </Text>
                <List>
                    {
                        list2.map((l, i) => (
                            <ListItem
                                roundAvatar
                                avatar={{ uri: l.avatar_url }}
                                key={i}
                                title={l.name}
                                subtitle={l.subtitle}
                            />
                        ))
                    }
                </List>
                {/* <InfoList /> */}
            </View>
        );
    }
}
const styles = {
    container: {
        flex: 1
    },
    textStyles: {
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 14,
        marginBottom: 20
    },
    header2: {
        textAlign: 'center',
        fontSize: 20,
        color: '#007aff',
        marginVertical: 10
    }
};

export default Info;