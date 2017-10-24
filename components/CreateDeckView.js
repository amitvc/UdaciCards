/**
 * Created by amit on 10/22/17.
 */

import React from 'react'
import {View, Text,StyleSheet,TouchableOpacity,TextInput, Dimensions} from 'react-native'
import {connect} from 'react-redux'


class CreateDeckView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            title : ""
        }
    }

    render() {
        return (

            <View style={styles.container}>

                <Text style={styles.text_bold}> What is the title of your new deck?</Text>
                <TextInput style={styles.text_field} placeholder="Title"
                           value={this.state.title}/>

                <TouchableOpacity style={styles.btn_submit} onPress={() => this.checkInput()}>
                    <Text>Submit</Text>
                </TouchableOpacity>
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

    text_bold: {
        fontWeight:'bold',
        fontSize:20,
        color:'red'
    },

    btn_submit: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10,
        backgroundColor: "#1f5cff",
        borderRadius: 3
    },
});



export default  CreateDeckView;