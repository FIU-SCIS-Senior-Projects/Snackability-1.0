import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Actions } from 'react-native-router-flux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './src/reducers';
import RouterComponent from './src/Router';

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyBXO8TfcYqBqbaW_EyLcz2yGvl2a3dXJFo",
      authDomain: "snackability-37936.firebaseapp.com",
      databaseURL: "https://snackability-37936.firebaseio.com",
      projectId: "snackability-37936",
      storageBucket: "snackability-37936.appspot.com",
      messagingSenderId: "52773406155"
    };
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
          setTimeout(() => {
            Actions.main()
          },500);
        } else {
          setTimeout(() => {
            Actions.Login()
          },100);
      }

    });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store} >
        <RouterComponent />
      </Provider >
    );
  }
}


