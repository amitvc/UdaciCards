/**
 * Created by amit on 10/22/17.
 */

import * as constants from '../utils/constants';


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