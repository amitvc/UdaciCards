/**
 * Created by amit on 10/22/17.
 */

import * as constants from '../utils/constants'
import uuidv1  from 'uuid/v1'
import {getDecks, storeDecks} from '../utils/storage'



let initialState = {};



export const setInitialState = ( state) =>{
    initialState = state;
}



const reducer = (state= initialState, action) => {
    switch(action.type) {

        case constants.ADD_NEW_DECK:
            let newDecks = {...state.decks};
            newDecks[action.deck.id] = action.deck;
            return {
                ...state,
                decks : newDecks
            }

        case constants.ADD_NEW_CARD_TO_DECK:
            let deckId = action.deckId;
            let decks = {...state.decks};
            let cards = {...state.cards};
            cards[action.card.id] = action.card;
            decks[deckId].cards.push(action.card.id);
            return {
            ...state,
                decks,
                cards
        }

        default:
            return state;
    }
}

export default reducer;

