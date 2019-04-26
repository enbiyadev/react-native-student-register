import React, { Component } from "react";
import { Alert, TextInput } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
//
import { emailChanged, passwordChanged } from "../actions";
//
import { Button, Card, CardSection, Spinner } from "../common/index";

class LoginForm extends Component {
  state = { email: "", password: "", loading: false }

  clickLogin() {
    this.setState({ loading: true });

    const { email, password } = this.state;

    if( email === "" || password === "" ) {
      this.setState({ loading: false });
      
      Alert.alert(
        "Mesaj",
        "Her iki alanda dolu olmalı!",
        [
          { text: "Tamam", onPress: () => null }
        ]
      );
    } else {
      firebase.auth().signInWithEmailAndPassword( email, password )
      .then( this.loginSuccess.bind(this) )
      .catch(() => { 
        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( this.loginSuccess.bind(this) )
        .catch( this.loginFail.bind(this) );
      });
    }
  }

  loginSuccess() {
    console.log("Success");

    this.setState({ loading: false });
  }

  loginFail() {
    console.log("Fail");

    this.setState({ loading: false });

    Alert.alert(
      "Mesaj",
      "Kullanıcı adı veya şifre hatalı!",
      [
        { text: "Tamam", onPress: () => null }
      ]
    );
  }

  renderButton() {
    if ( !this.state.loading ){
      return <Button onPress={ this.clickLogin.bind(this) }>GİRİŞ</Button>
    }

    return <Spinner size="small" />;
  }

  render() {
    console.log( "Email password " + this.props.email );
    console.log( "Response password " + this.props.password );

    const { inputStyle } = styles;

    return (
      <Card>
        <CardSection>
          <TextInput 
            placeholder="E-mail"
            style={ inputStyle }
            value={ this.props.email }
            onChangeText={ email => this.props.emailChanged(email) }
          />
        </CardSection>

        <CardSection>
          <TextInput 
            secureTextEntry
            placeholder="Şifre"
            style={ inputStyle }
            value={ this.props.password }
            onChangeText={ password => this.props.passwordChanged(password) }
          />
        </CardSection>

        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  }
}

const mapStateToProps = ({ authenticationResponse }) => {
  const { email, password } = authenticationResponse;

  return {
    email,
    password
  }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged })(LoginForm);