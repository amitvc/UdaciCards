import React from 'react'
import { StyleSheet, Text, View, StatusBar , Platform} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import {FontAwesome,Ionicons} from '@expo/vector-icons'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import {setInitialState} from './reducers'
import {purple, white} from './utils/colors'
import DeckListView from './components/DeckListView'
import CreateDeckView from './components/CreateDeckView'
import DeckView from './components/DeckView'
import QuickCardView from './components/QuizCardView'
import AddCardView from './components/AddCardView'
import {getDecks, storeDecks} from './utils/storage'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import {NOTIFICATION_KEY} from './utils/constants'


const StackNav = StackNavigator({

    Home : {
        screen : DeckListView
    },

    DeckView : {
        screen : DeckView
    },

    QuizCardView : {
        screen : QuickCardView
    },
    AddCard : {
        screen :AddCardView
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


const default_initialState = {
    decks:{},
    cards:{}
}


export default class App extends React.Component {

     setLocalNotification() {
        AsyncStorage.getItem(NOTIFICATION_KEY)
            .then((data) => {
                if(data === null) {
                    Permissions.askAsync(Permissions.NOTIFICATIONS)
                        .then(({ status }) => {
                            if(status === 'granted') {
                                Notifications.cancelAllScheduledNotificationsAsync()
                                let tomorrow = new Date()
                                tomorrow.setDate(tomorrow.getDate() + 1)
                                tomorrow.setHours(20)
                                tomorrow.setMinutes(0)
                                Notifications.scheduleLocalNotificationAsync(
                                    createNotification(), {time: tomorrow, repeat: 'day'}
                                )
                                AsyncStorage.setItem(NOTIFICATION_KEY, "true")
                            }
                        })
                }
            })
            .catch((error) => {
                console.log("Error With Notifications - ", error);
            })
    }

    componentDidMount() {
         this.setLocalNotification();
    }


    constructor(props) {
        super(props);
        this.state = {
            loading:true
        }
    }

    componentWillMount() {
        let initialState = {};
        getDecks().then((value) => {
            if(value !== null) {
                initialState = JSON.parse(value);
            } else {
                console.log("Initial state from async store is null. Will save default initial state " + default_initialState);
                storeDecks(default_initialState).then((value) => {
                    getDecks().thead((d) => {
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

                <Provider store={createStore(reducer, applyMiddleware(thunkMiddleware))}>
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
