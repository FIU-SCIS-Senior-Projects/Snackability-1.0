import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, UIManager, LayoutAnimation, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import { Icon, CheckBox, Overlay, Button as Button2 } from 'react-native-elements';

import logo from '../images/logo2.png';
import { snackChanged, portionChanged, unitsChanged, processedChanged, searchForSnack } from '../actions';

import { Card, CardSection, Input, Button, Spinner } from './common';
import SnackList from './SnackList';

class SearchForm extends Component {



    constructor(props) {
        super(props);
        this.state = {
            expandedSearch: false,
            isVisible: false,
            isModalVisible: false
        };
    }
    componentWillUpdate() {
        var CustomLayoutLinear = {
            duration: 200,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.linear,
            },
        };

        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(CustomLayoutLinear);
    }
    componentWillReceiveProps() {
        if (this.props.processed === undefined) {
            this.props.processed = false;
        }
    }
    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', }}>
                <Text style={styles.modalHeader}>🔎 Search Guide:</Text>
                <Text style={styles.modalText}>
                    1. Use descriptive names{"\n"}
                    include brands when possible i.e Oreos instead of choclate cookie
            </Text>
                <Text style={styles.modalText}>
                    2. Enter your portion size
            </Text>
                <Text style={styles.modalText}>
                    3. What is Highly Processed?{"\n"}
                    This refers to foods that have been heavily
                    modified from their original form, with addition of salt, sugar, fat,
                    and/or food additives (substances added to food to preserve flavor or e
                    nhance its taste, appearance, or other qualities)
            </Text>
                <Text style={styles.modalText}>
                    4. Can't find your snack?{"\n"}
                    Try a different query or headover to info and
                    "add a snack" fill out a simple form and our team will take care of the rest.
            </Text>

                <Button2
                    rounded
                    backgroundColor='#e74c3c'
                    onPress={this._toggleModal}
                    containerViewStyle={{width:200, alignSelf:'center', marginTop:30}}
                    iconRight={{ name: 'times', type: 'font-awesome' }}
                    title='Close' />
            </ScrollView>
        </View>
    );


    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    toggleExpanded() {
        this.setState(previousState => {
            return { expandedSearch: !previousState.expandedSearch };
        });
    }

    onSnackChange(text) {
        this.props.snackChanged(text);
    }

    onUnitsChange(value, index, data) {
        this.props.unitsChanged(value)
    }

    onPortionChange(text) {
        this.props.portionChanged(text);
    }

    onProcssedChange() {
        const bool = !this.props.processed
        this.props.processedChanged(bool);
    }

    onButtonPress() {
        const { snack, portion, processed, units } = this.props;
        this.props.searchForSnack({ snack, portion, processed, units });
    }



    renderButton() {

        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Search
            </Button>
        );
    }

    renderResults() {
        if (this.props.snack_info) {

            if (this.props.snack_info === 'No results') {

                return <Text>{'No Results'}</Text>;

            }
            else {

                return <SnackList snacks={this.props.snack_info} />
            }
        }

        return <Text></Text>;
    }

    renderAdvancedSearch() {

        let units = [{
            value: 'g',
        }, {
            value: 'tbsp',
        }, {
            value: 'tsp',
        }, {
            value: 'oz'
        }, { value: 'kg' }
            ,
        { value: 'lbs' }
        ];

        let data = {
            checked: false
        }

        if (!this.state.expandedSearch) {

            return (
                <Card>
                    <CardSection>
                        <Input
                            label="🍓 Snack"
                            placeholder="Twix"
                            onChangeText={this.onSnackChange.bind(this)}
                            value={this.props.snack}
                        >
                            <TouchableOpacity
                                onPress={() => this.toggleExpanded()}
                                style={{ flex: 1 }}>
                                <Icon
                                    name='plus-circle'
                                    type='font-awesome'
                                    color='#007aff'
                                    size={20}
                                />
                            </TouchableOpacity>
                        </Input>
                    </CardSection>

                    <CardSection>
                        <Text style={styles.errorTextStyle}>
                            {this.props.error}
                        </Text>
                        {this.renderButton()}
                    </CardSection>
                </Card>
            );
        }
        else {
            return (
                <Card>
                    <CardSection>
                        <Input
                            label="🍓 Snack"
                            placeholder="Twix"
                            onChangeText={this.onSnackChange.bind(this)}
                            value={this.props.snack}
                        >
                            <TouchableOpacity
                                onPress={() => this.toggleExpanded()}
                                style={{ flex: 1 }}>
                                <Icon
                                    name='minus-circle'
                                    type='font-awesome'
                                    color='#007aff'
                                    size={20}
                                />
                            </TouchableOpacity>


                        </Input>
                    </CardSection>



                    <CardSection>
                        <Input
                            label="⚖️ Portion"
                            placeholder="20"
                            onChangeText={this.onPortionChange.bind(this)}
                            style={{ marginRight: 85 }}
                            value={this.props.portion}
                        >

                        </Input>

                    </CardSection>

                    <CardSection style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        paddingTop: 0,
                        paddingBottom: 2,
                        paddingLeft: 5,
                        paddingRight: 5
                    }} >

                        <Dropdown
                            label='Units'
                            containerStyle={{ flex: 1, marginLeft: 10 }}
                            onChangeText={(value, index, data) => this.onUnitsChange(value, index, data)}
                            data={units}
                        />
                        <CheckBox
                            containerStyle={{ backgroundColor: '#fff', borderColor: '#fff', }}
                            onPress={() => this.onProcssedChange()}
                            checked={this.props.processed}
                            title={'Highly Processed'}
                            right
                        />



                    </CardSection>


                    <CardSection>
                        <Text style={styles.errorTextStyle}>
                            {this.props.error}
                        </Text>
                        {this.renderButton()}
                    </CardSection>
                </Card>
            );
        }

    }

    render() {


        return (
            <View style={{ flex: 1 }}>
                <View style={styles.viewStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={logo}
                    />
                    <Text style={styles.messageStyle}>
                        Tap the + or - icons to Toggle Advanced Search
                    </Text>
                    <TouchableOpacity onPress={this._toggleModal}>
                        <Text style={styles.messageStyle}>Search Guide ℹ️</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1 }}>
                    {this.renderAdvancedSearch()}
                    {this.renderResults()}
                </View>


                <Modal
                    isVisible={this.state.isModalVisible}
                    backdropColor={"rgba(9, 132, 227,0.9)"}
                    backdropOpacity={1}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                >
                    {this._renderModalContent()}
                </Modal>

            </View>
        );
    }

};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    viewStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        height: 125,
        width: 125,
        marginBottom: 10,
    },
    messageStyle: {
        fontWeight: 'bold',
        color: '#007aff',
        marginBottom: 10,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalText: {
        color: '#ffffff',
        fontSize: 18,
        paddingBottom: 15,
        textAlign: 'center'
    },
    modalHeader: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 15,
        textAlign: 'center'
    }
};

const mapStateToProps = ({ search }) => {
    const { snack, portion, processed, units, error, loading, snack_info } = search;
    return { snack, portion, processed, units, error, loading, snack_info };
};

export default connect(mapStateToProps, {
    snackChanged, portionChanged, unitsChanged, processedChanged, searchForSnack
})(SearchForm);