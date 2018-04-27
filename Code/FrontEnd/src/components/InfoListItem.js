import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';


class ListItem extends Component {
    state = {expand:false}
    
    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }
    onRowPress() {
        const id = this.props.members.id;
        this.setState((prevState) => {
            return {expand: !prevState.expand};
          });
      }

    renderDescription() {
        const { members} = this.props;
        if (this.state.expand) {
            return (
                <CardSection>
                    <Text style={styles.descriptionStyle}>
                        {members.Contribution}
                    </Text>
                </CardSection>
            );
        }
    }

    render() {
        const { titleStyle } = styles;
        const { id, Name } = this.props.members;

        return (
            <TouchableWithoutFeedback
                onPress={this.onRowPress.bind(this)}
            >
                <View>
                    <CardSection>
                        <Text style={titleStyle}>
                            {Name}
                        </Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}




const styles = {
    titleStyle: {
        fontSize: 19,
        paddingLeft: 15,
    },
    descriptionStyle: {
        paddingLeft: 10,
        paddingRight: 10,

    }
};

export default ListItem;
