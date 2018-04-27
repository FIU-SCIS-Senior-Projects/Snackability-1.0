
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, ListView, Text, View } from 'react-native';
import ListItem from './SnackListItem';

class SnackList extends Component {
    state = { placehold: '' }

    componentWillMount() {
        this.createDataSource(this.props.snacks);
    }

    componentWillReceiveProps(newProps, oldProps) {
        this.createDataSource(newProps.snacks);

    }


    createDataSource(snacks) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.snacks);
    }

    renderRow(snack) {
        return <ListItem snack={snack}/>;
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <Text style={styles.textStyles}>
                    {'Results:'}
                </Text>
                <ListView keyboardShouldPersistTaps="always" style={styles.listStyles}
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}
const styles = {
    textStyles: {
        marginTop: 15,
        marginLeft: 35,
        fontSize: 18,
        color: '#0000FF',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    listStyles: {
        marginTop: 15
    }
}

export default SnackList;