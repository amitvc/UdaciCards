import React from 'react'
import { StyleSheet, Text, View, StatusBar , TouchableOpacity, Platform} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import {FontAwesome,Ionicons} from '@expo/vector-icons'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import {purple, white} from './utils/colors'
import DeckListView from './components/DeckListView'
import CreateDeckView from './components/CreateDeckView'
import DeckView from './components/DeckView'



const StackNav = StackNavigator({

    Home : {
        screen : DeckListView
    },

    DeckView : {
        screen : DeckView
    }

});

const TabNav =  TabNavigator({
    Decks: {
        screen: StackNav,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='th-list' size={30} color={tintColor} />
        },
    },
    AddEntry: {
        screen: CreateDeckView,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle' size={30} color={tintColor} />
        },
    },
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})





export default class App extends React.Component {
  render() {
    return (

    <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
            <StatusBar
                backgroundColor="blue"
                barStyle="light-content"
            />
            <TabNav/>
        </View>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B6D8E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
