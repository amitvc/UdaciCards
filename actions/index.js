/**
 * Created by amit on 10/22/17.
 */

import * as constants from '../utils/constants';
import {getDecks, storeDecks} from '../utils/storage'



/**
 * Action creator for adding new card to the deck
 * @param deckId
 * @param card
 * @returns {{type, card: *, deckId: *}}
 */
export function addNewCard(deckId, card) {
    return {
        type: constants.ADD_NEW_CARD_TO_DECK,
        card,
        deckId
    }
}


export const addNewCardToAsyncStorage = (deckId, card) => dispatch => {
    getDecks().then((value) => {
        if(value != null) {
            currentAsyncState = JSON.parse(value);
            currentAsyncState.decks[deckId].cards.push(card.id);
            currentAsyncState.cards[card.id] = card;
            storeDecks(currentAsyncState).then(() => {
                dispatch(addNewCard(deckId, card));
            })
        }
    })
}


/**
 * Function responsible for storing deck in asyn storage and also update redux state
 * by dispatch addNewDeck action.
 * @param deck
 */
export const addNewDeckToAsyncStorage = (deck)  => dispatch => {

    getDecks().then((value) => {
        if(value !== null) {
            currentAsyncState = JSON.parse(value);
            currentAsyncState.decks[deck.id] = deck;
            storeDecks(currentAsyncState).then((value) => {
            })
        } else {
            let initialState = {cards:{}, decks:{}};
            initialState.decks[deck.id] = deck;
            storeDecks(initialState).then((value) => {
            })
        }
        dispatch(addNewDeck(deck));
    })

}

/**
 * Action creator for adding new deck
 * @param deck
 * @returns {{type, deck: *}}
 */
export function addNewDeck(deck) {
    return {
        type: constants.ADD_NEW_DECK,
        deck
    }
}