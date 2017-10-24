import React from 'react'
import { StyleSheet, Text, View, StatusBar , Platform} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import {FontAwesome,Ionicons} from '@expo/vector-icons'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import {setInitialState} from './reducers'
import {purple, white} from './utils/colors'
import DeckListView from './components/DeckListView'
import CreateDeckView from './components/CreateDeckView'
import DeckView from './components/DeckView'
import QuickCardView from './components/QuizCardView'
import {getDecks, storeDecks} from './utils/storage'



const StackNav = StackNavigator({

    Home : {
        screen : DeckListView
    },

    DeckView : {
        screen : DeckView
    },

    QuizCardView : {
        screen : QuickCardView
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

    constructor(props) {
        super(props);
        this.state = {
            loading:true
        }
    }

    componentWillMount() {
        let initialState = {};
        getDecks().then((value) => {
            console.log("Loading store from asyc store");
            console.log(value);
            if(value !== null) {
                console.log("Setting initial state");
                initialState = JSON.parse(value);
            } else {
                console.log("Calling storeDecks");
                storeDecks(initialStates).then((value) => {
                    console.log("stored initial value" + value);
                    getDecks().thead((d) => {
                        console.log("reading back value from async"+ d);
                        initialState = JSON.parse(d);
                    });
                });
            }
            setInitialState(initialState);
            this.setState({loading:false});
        })

    }

  render() {

        if(this.state.loading) {
            return (
                <View style={styles.container}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
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
            )
        }

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
