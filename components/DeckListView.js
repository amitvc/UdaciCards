/**
 * Created by amit on 10/22/17.
 */

import React from 'react';
import { StyleSheet, View, FlatList,Text,TouchableHighlight, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import {gray} from '../utils/colors';
import Video from "expo/src/Video";




class DeckListView extends React.Component {

    constructor(props) {
        super(props);
    }


    createDeckListItem(obj) {
        return (
        <TouchableHighlight style={styles.deckItemBtn} onPress={() => this.props.navigation.navigate('DeckView', {deck:obj})}>
            <View style={styles.deckItemView}>
                <Text style={{textAlign:'center'}}>{obj.item.title}</Text>
                <Text style={{textAlign:'center'}}>{obj.item.cards.length + " Cards"}</Text>
            </View>
        </TouchableHighlight>)
    }

    buildDeckList(decks, cards) {
        let decksList = [];
        if(decks !== undefined) {
            Object.keys(decks).forEach((deck_id, index) => {
                let deck = decks[deck_id];
                decksList.push(deck);
            });
        }
        return decksList;
    }

    render() {
        const {decks} = this.props;

        let decksList = this.buildDeckList(decks);

        if(decksList.length === 0) {
            <View style={{alignItems: 'center' , flex:1, paddingTop:100}}>
                <Text>No decks found. Please add decks</Text>
            </View>
        } else {
            return (
                <View style={styles.container}>
                    <View style={{alignItems: 'center' , flex:1, paddingTop:100, justifyContent:'center'}}>
                        <FlatList style={styles.deckView}
                                  data={decksList}
                                  renderItem={this.createDeckListItem.bind(this)}
                        />
                    </View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        padding: 10
    },

    deckView: {
        flex:1,
        width: Dimensions.get('window').width
    },

    btnOne: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10,
        backgroundColor: gray,
        borderRadius: 3
    },
    deckItemBtn: {
        flex: 1,
        justifyContent: 'center',
        borderBottomColor: '#FF5A03'

    },
    deckItemView: {
        flex: 1,
        backgroundColor: '#d7f7ff',
        justifyContent: 'center',
        paddingTop:10,
        paddingBottom:20,
        marginBottom:8,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#daa23a'
    }
});

const mapStateToProps  = ({decks}) => {
    return {
        decks
    }
}
export default  connect(mapStateToProps, null)(DeckListView);