/**
 * Created by amit on 10/22/17.
 */

import React from 'react'
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'



/**
 * Class represents the DeckView
 */
class DeckView extends React.Component {

    render() {
        const deckId = this.props.navigation.state.params.id;
        const {navigation} = this.props;
        const deck = this.props.decks[deckId];
        return(
        <View style={styles.container}>
            <View style={{alignItems: 'center', paddingTop: 20}}>
                <Text>{deck.title}</Text>
                <Text>{deck.cards.length +" Cards"}</Text>

                <TouchableOpacity style={[styles.btn_small, {backgroundColor: "#84ff1a"}]} onPress={() => { navigation.navigate('AddCard', {id:deck.id})}}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn_small, {backgroundColor: "#daa23a"}]} onPress={() => { navigation.navigate('QuizCardView', {deck})}}>
                    <Text>Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10
    },
    btn_small: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 3
    },

});


const mapStateToProps = ({decks}) => {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckView);