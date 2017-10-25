/**
 * Created by amit on 10/24/17.
 */
import React from 'react';
import {Text, TextInput, View, TouchableOpacity, Switch,StyleSheet,Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { lightPurp } from '../utils/colors'
import {addNewCardToAsyncStorage} from '../actions'
import {bindActionCreators} from 'redux';

import  uuidv1  from 'uuid/v1'


class AddCardView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            question: "",
            answer: false,
            msg: ""
        }
    }

    checkInput() {
        if(this.state.question < 5) {
            alert("Question Must Be At Least 5 Characters Long");
            return
        } else {
            this.addCard()
        }
    }

    addCard() {
        let deckId = this.props.navigation.state.params.id;
        const card = {id:uuidv1(), question:this.state.question, answer: this.state.answer};
        const deckCardObj = {deckId, card};
        this.props.addNewCardToAsyncStorage(deckId, card);
        this.props.navigation.goBack();
    }

    render() {
        let deckId = this.props.navigation.state.params.id;
        let deck = this.props.decks[deckId];
        return (
            <View style={styles.container}>
                <Text style={{marginTop: 50, textAlign:'center'}}>Please add card to the {deck.title} deck</Text>
                <TextInput style={styles.text_field} placeholder="Enter Question"
                           value={this.state.question} onChangeText={(question) => this.setState({question: question})} />
                <Text style={{margin: 20, textAlign:'center'}}>Set The Answer</Text>
                <View style={{flexDirection: 'row', justifyContent:'center'}}>
                    <Text style={{marginRight: 20}}>False</Text>
                    <Switch value={this.state.answer} onValueChange={(value) => this.setState({answer: value})}/>
                    <Text style={{marginLeft: 20}}>True</Text>
                </View>
                <Text style={{marginTop: 30}}>{this.state.msg}</Text>
                <Text style={{margin: 15}}></Text>
                <TouchableOpacity style={styles.btn_add} onPress={() => this.checkInput()}>
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10
    },
    text_field: {
        height: 45,
        width: Dimensions.get('window').width-10,
        marginTop: 50,
        marginBottom: 20,
        padding: 3,
        borderRadius: 3,
        borderColor: "#d7f7ff",
        borderWidth: 1
    },
    btn_add: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10,
        backgroundColor: "#1f5cff",
        borderRadius: 3
    },

});

const mapStateToProps = ({decks}) => {
    return {
        decks
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        addNewCardToAsyncStorage: bindActionCreators(addNewCardToAsyncStorage,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddCardView)
