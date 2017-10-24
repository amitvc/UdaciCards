/**
 * Created by amit on 10/23/17.
 */
import {AsyncStorage} from 'react-native'
import {ASYNC_STORAGE_KEY} from './constants'

export const getDecks = () => {
    return AsyncStorage.getItem(ASYNC_STORAGE_KEY);
}

export const storeDecks = (decks) => {
    return AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(decks));
}

