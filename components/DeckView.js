/**
 * Created by amit on 10/22/17.
 */

import React from 'react'
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native'



/**
 * Class represents the DeckView
 */
class DeckView extends React.Component {

    render() {
        const {deck} = this.props.navigation.state.params;
        const {navigation} = this.props;
        return(
        <View style={styles.container}>
            <View style={{alignItems: 'center', paddingTop: 20}}>
                <Text>{deck.item.title}</Text>
                <Text>{deck.item.cards.length +" Cards"}</Text>

                <TouchableOpacity style={[styles.btn_small, {backgroundColor: "#84ff1a"}]}>
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



export default DeckView;