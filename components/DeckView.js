/**
 * Created by amit on 10/22/17.
 */

import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


/**
 * Class represents the DeckView
 */
class DeckView extends React.Component {

    render() {

        return(
        <View style={styles.container}>
            <Text>Deck View</Text>
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
    }
});

export default DeckView;