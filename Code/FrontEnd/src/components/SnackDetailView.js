import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Divider, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { historyCreate } from '../actions'
import { searchNbdno } from '../util';
import { Spinner } from './common';


class snackDetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calories: '',
            carbs: '',
            cholesterol: '',
            fiber: '',
            ingredients: {},
            protein: '',
            sodium: '',
            score: '',
            processed: '',
            emoji: '',
            feedback: '',
            sugar: '',
            totalFat: '',
            transFat: '',
            tableHead: ['Nutrient', 'Value'],
            tableData: null,
        }
    }

    consumedButton() {
        console.log('in the button');
       console.log( this.props.snack.ndbno);
        this.props.historyCreate(
            this.props.snack.ndbno, 
            this.props.snack.portion, 
            this.props.snack.processed, 
            this.props.snack.units)
    }


    componentWillMount() {

        searchNbdno(
            this.props.snack.ndbno,
            this.props.snack.portion,
            this.props.snack.processed,
            this.props.snack.units
        )
            .then(
                snack => {

                    let {
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
                        score,
                        processed,
                        feedback
                    } = snack;

                    //grab the emoji
                    let emoji = feedback.substr(0, feedback.indexOf(' '))
                    feedback = feedback.substr(feedback.indexOf(' '), feedback.length)
                    console.log(emoji);

                    const tableArray = [];

                    Object.keys(snack).forEach(function (key, index) {
                        if (key != 'ingredients' & key != 'score' & key != 'feedback' & key != 'name') {
                            tableArray.push([key, snack[key]])
                        }
                    });

                    console.log(tableArray);


                    this.setState({
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
                        score,
                        emoji,
                        processed,
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
        if (this.props.consumed) {
            return (
                <Button
                    buttonStyle={styles.consume}
                    leftIcon={{ name: 'food-apple', type: 'material-community' }}
                    backgroundColor={'#27ae60'}
                    title='Consumed ✓'
                    onPress={this.consumedButton.bind(this)}
                    rounded
                />
            );
        }
        else {
            return (
                <Button
                    buttonStyle={styles.consume}
                    onPress={this.consumedButton.bind(this)}
                    loading={this.props.loading2}
                    leftIcon={{ name: 'food-apple', type: 'material-community' }}
                    backgroundColor={'#4285F4'}
                    title='Consumed?'
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

const mapStateToProps = ({ snackHistory }) => {
    const { consumed, loading2 } = snackHistory;
    return { consumed, loading2 };
};

export default connect(mapStateToProps,
    { historyCreate })
    (snackDetailView);

