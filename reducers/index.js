/**
 * Created by amit on 10/22/17.
 */

import * as constants from '../utils/constants'
import uuidv1  from 'uuid/v1'


const initialState = {
    decks: {
        '15c36ce2-301f-46eb-81ac-8347d3473213': {
            id:'15c36ce2-301f-46eb-81ac-8347d3473213',
            title: 'Udacity',
            cards: ['b82eb5e7-e3e8-4ab0-980c-2ecf692ff60b', 'b82eb5e7-e3e8-4ab0-980c-2ecf692ff60c']
        },
     '15c36ce2-301f-46eb-81ac-8347d3473211' : {
            id:'15c36ce2-301f-46eb-81ac-8347d3473211',
            title: 'React',
            cards: ['e28889f8-0489-4c69-91a4-8502d8cea306', 'e28889f8-0489-4c69-91a4-8502d8cea307']
        }
    },
    cards: {
        'b82eb5e7-e3e8-4ab0-980c-2ecf692ff60b': {
            id:'b82eb5e7-e3e8-4ab0-980c-2ecf692ff60b',
            question: 'Udacity is an online learn portal',
            answer: true
        },
        'b82eb5e7-e3e8-4ab0-980c-2ecf692ff60c': {
            id:'b82eb5e7-e3e8-4ab0-980c-2ecf692ff60c',
            question: 'All courses on udacity are free',
            answer: false
        },
        'e28889f8-0489-4c69-91a4-8502d8cea306': {
            id:'e28889f8-0489-4c69-91a4-8502d8cea306',
            question: 'React was developed at facebook',
            answer: true
        },
        'e28889f8-0489-4c69-91a4-8502d8cea307': {
            id:'e28889f8-0489-4c69-91a4-8502d8cea307',
            question: 'React is backend library',
            answer: false
        }
    }
}



const reducer = (state=initialState, action) => {
    switch(action.type) {

        case constants.ADD_NEW_DECK:
            let newDecks = {...state.decks};
            newDecks[uuidv1()] = deck;
            return {
                ...state,
                decks : newDecks
            }

        case constants.ADD_NEW_CARD_TO_DECK:
            let deckId : action.deckId;
            let decks = {...state.decks};
            let cards = {...state.cards};
            let cardId = uuidv1();
            cards[cardId] = action.card;
            decks[deckId].push(cardId);
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

