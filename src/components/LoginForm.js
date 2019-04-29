import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { connect } from "react-redux";
//
import { emailChanged, passwordChanged, loginUser } from "../actions";
//
import { Button, Card, CardSection, Spinner } from "../common/index";

class LoginForm extends Component {
  // state = { email: "", password: "", loading: false }

  clickLogin() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  /*loginSuccess() {
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
  }*/

  renderButton() {
    if ( !this.props.loading ){
      return <Button onPress={ this.clickLogin.bind(this) }>GİRİŞ</Button>
    }

    return <Spinner size="small" />;
  }

  render() {
    // console.log( "Email password " + this.props.email );
    // console.log( "Response password " + this.props.password );

    const { viewStyle, inputStyle } = styles;

    return (
      <View style= { viewStyle }>
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
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1,
    backgroundColor: "#fff"
  },
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
  const { email, password, loading } = authenticationResponse;

  return {
    email,
    password,
    loading
  }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);