import React, { Component } from "react";
import { AppRegistry, View } from "react-native";
//
import firebase from "firebase";
//
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from  "redux-thunk";
import reducers from "./src/reducers";
//
import LoginForm from "./src/components/LoginForm";

export default class App extends Component<{}> {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDGiZil8lOy7IteGrOF4O8JhvVPuVvvdJw',
      authDomain: 'ogrencikayit-1d391.firebaseapp.com',
      databaseURL: 'https://ogrencikayit-1d391.firebaseio.com',
      projectId: 'ogrencikayit-1d391',
      storageBucket:'ogrencikayit-1d391.appspot.com',
      messagingSenderId: '777310841475'
    });
  }

  render() {
    const store = createStore( reducers, {}, applyMiddleware(ReduxThunk) )

    return (
      <Provider store={ store }>
        <View>
          <LoginForm />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent("ogrenci_kayit", () => App);