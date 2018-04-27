import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Divider, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { searchLocal } from '../util';
import { Spinner } from './common';


export default class LocalSnackView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calories: '',
            calories_fat: '',
            firstIngredient: '',
            score: '',
            processed: '',
            emoji: '',
            feedback: '',
            soddium: '',
            sugar: '',
            saturated_fat: '',
            trans_fat: '',
            processed: '',
            tableHead: ['Nutrient', 'Value'],
            tableData: null,
            consumed: false
        }
    }


    componentWillMount() {
        console.log(this.props.snack.id)

        searchLocal(
            this.props.snack.id,
            this.props.snack.portion,
            this.props.snack.processed,
            this.props.snack.units
        )
            .then(
                snack => {

                    let {
                        calories,
                        calories_fat,
                        seving_size,
                        units,
                        processed,
                        sugar,
                        saturated_fat,
                        trans_fat,
                        sodium,
                        score,
                        feedback
                    } = snack;

                    //grab the emoji
                    let emoji = feedback.substr(0, feedback.indexOf(' '))
                    feedback = feedback.substr(feedback.indexOf(' '), feedback.length)
                    console.log(emoji);

                    const tableArray = [];

                    Object.keys(snack).forEach(function (key, index) {
                        if (key != 'ingredients'
                            & key != 'score'
                            & key != 'feedback'
                            & key != 'name'
                            & key != 'product'
                            & key != 'id'
                            & key != 'brand_name_search'
                            & key != 'product_search'
                            & key != 'short_name_search'
                        ) {
                            tableArray.push([key, snack[key]])
                        }
                    });

                    console.log(tableArray);


                    this.setState({
                        calories,
                        calories_fat,
                        seving_size,
                        units,
                        processed,
                        sugar,
                        saturated_fat,
                        trans_fat,
                        sodium,
                        score,
                        emoji,
                        feedback,
                        tableData: tableArray
                    });

                });

    }
    renderSnack() {


        const {
            calories,
            carbs,
            cholesterol,
            fiber,
            ingredients,
            protein,
            sodium,
            sugar,
            totalFat,
            transFat,
            tableData
        } = this.state;


        if (this.state.tableData === undefined || this.state.tableData == 0 || this.state.tableData === null) {
            return <Spinner size="large" />;
        }
        else {
            return (
                <View style={styles.container}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={tableData} textStyle={styles.text} />
                    </Table>
                </View>
            );
        }
    }

    renderConsumed() {
        if (this.state.consumed) {
            return (
                <Button
                    buttonStyle={styles.consume}
                    leftIcon={{ name: 'food-apple', type: 'material-community' }}
                    backgroundColor={'#27ae60'}
                    title='Consumed!'
                    rounded
                />
            );
        }
        else {
            return (
                <Button
                    buttonStyle={styles.consume}
                    onPress={() => this.setState({ consumed: true })}
                    leftIcon={{ name: 'food-apple', type: 'material-community' }}
                    backgroundColor={'#4285F4'}
                    title='Ate It?'
                    rounded
                />
            );
        }
    }


    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <Text style={styles.snackScore}>
                    Snack Score: {this.state.score + ' ' + this.state.emoji}
                </Text>

                <Divider style={{ backgroundColor: 'blue', marginBottom: 15 }} />

                <Text style={styles.feedBack}>
                    💬 FeedBack: {this.state.feedback}
                </Text>
                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                    {this.renderConsumed()}
                </View>
                {this.renderSnack()}



            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    consume: { width: 150, paddingLeft: 10, paddingRight: 10, marginTop: 20 },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' },
    snackScore: { textAlign: 'center', fontSize: 26, marginTop: 15, marginBottom: 10 },
    feedBack: { textAlign: 'center', marginBottom: 10, color: 'blue', fontSize: 18, paddingLeft: 10, paddingRight: 10 }
});

