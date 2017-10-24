/**
 * Created by amit on 10/22/17.
 */


import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {gray} from '../utils/colors';




class QuizCardView extends React.Component {


    constructor(props){
        super(props);

        let cards = this.getCurrentCard(this.props.cards, this.props.navigation.state.params.deck.item.cards);

        // This component will maintain internal state.
        this.state = {
            currentIndex : 0,
            cards,
            right:0,
            wrong:0,
            title: this.props.navigation.state.params.deck.item.title,
            hintAnswer:""
        }
    }

    getCurrentCard(cardsArray, cardIds) {
        let cards = [];
        cardIds.forEach((cardId) => {
           Object.keys(cardsArray).forEach((id) => {
               if(cardId === id) {
                   cards.push(cardsArray[id]);
               }
           })
        });
        return cards;
    }

    restartQuiz() {
        this.setState({currentIndex: 0, right: 0, wrong: 0, hintAnswer:""});
    }


    checkAnswer(answer) {

        if(answer === this.state.cards[this.state.currentIndex].answer) {
            this.setState((prevState) => {
                return {hintAnswer: "", right: prevState.right + 1, currentIndex: prevState.currentIndex + 1}
            });
        } else {
            this.setState((prevState) => {
                return {hintAnswer: "", wrong: prevState.wrong + 1, currentIndex: prevState.currentIndex + 1}
            });
        }

    }


    render() {
        console.log(JSON.stringify(this.state));
            if(this.state.currentIndex < this.state.cards.length) {
                return (
                <View style={styles.container}>
                    <Text style={{marginTop: 50, marginBottom: 50, textAlign: 'center'}}>{this.state.title} Quiz</Text>

                    <Text style={styles.headTextCenter}>{this.state.cards[this.state.currentIndex].question}</Text>
                    <Text style={{margin: 20, textAlign: 'center'}}>{this.state.hintAnswer}</Text>

                    <TouchableOpacity style={[styles.btn_small, {backgroundColor:"#b192b9"}]} onPress={() => this.setState({hintAnswer: String(this.state.cards[this.state.currentIndex].answer) })}>
                        <Text>Show Answer</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity style={[styles.btn_small, {backgroundColor:"#68b937"}]} onPress={() => this.checkAnswer(true)}>
                            <Text>True</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btn_small, {backgroundColor:"#b91c05"}]} onPress={() => this.checkAnswer(false)}>
                            <Text>False</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={{margin: 10}}>Right: {this.state.right}</Text>

                        <Text style={{margin: 10}}>Wrong: {this.state.wrong}</Text>
                    </View>

                    <Text style={{marginTop: 40, marginBottom: 30, textAlign: 'center'}}>{`${this.state.currentIndex + 1}/${this.state.cards.length}`} Questions</Text>

                    <TouchableOpacity style={styles.btnLP} onPress={() => this.startOver()}>
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn_small, {backgroundColor:"#68b937"}]} onPress={() => this.props.navigation.goBack()}>
                        <Text>Back To Deck</Text>
                    </TouchableOpacity>

                </View>
                )
            } else {
                return (
                    <View style={styles.QuizContainer}>
                            <Text style={{marginTop: 50, marginBottom: 50, textAlign: 'center'}}>{this.state.title} Quiz</Text>

                            <Text style={{fontSize: 25,
                                fontWeight: 'bold', alignItems:'center', justifyContent:'center'}}>Quiz Results</Text>
                            <Text>Final Score: {(this.state.right / this.state.cards.length) * 100}%</Text>

                            <TouchableOpacity style={[styles.btn_small,{backgroundColor:"#DAA23A"}]} onPress={() => this.restartQuiz()}>
                                <Text>Restart Quiz</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.btn_small,{backgroundColor:"#68b937"}]} onPress={() => this.props.navigation.goBack()}>
                                <Text>Back To Deck</Text>
                            </TouchableOpacity>
                    </View>
                )
            }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    btn_small: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 3
    }
})

const mapStateToPros = ({cards}) => {
    return {
        cards
    }
}


export default connect(mapStateToPros)(QuizCardView);