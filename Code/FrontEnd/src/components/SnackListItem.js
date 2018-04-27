import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {

    state = { portion: '', processed: '', units: '' }

    onRowPress() {
        if (this.props.snack.ndbno) {
            Actions.snackDetail({ snack: this.props.snack });
        }
        else {
            Actions.localDetail({snack: this.props.snack});
        }

    }

    extrasParse(extras) {
        console.log(extras)
    }

    localDBParse(snack) {
        let name = snack.brand_name.concat(':', snack.short_name)
        return name
    }

    usdaParse(snack) {
        let convert = snack.name;
        convert = convert.substring(0, 50);
        return snack.name
    }

    render() {
        const snack = this.props.snack
        var displayName = '';
        //LOCAL DB has id identifiers
        if (this.props.snack.id) {
            displayName = this.localDBParse(snack)
        }
        else {
            displayName = this.usdaParse(snack)
        }

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection style={styles.sectionStyles}>
                        <Text style={styles.titleStyle}>
                            {displayName}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    sectionStyles: {
        paddingLeft: 15,
        paddingLeft: 15,
        marginLeft: 7,
        marginRight: 7
    }
};

export default ListItem;
