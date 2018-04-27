import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Logo from '../common/Logo';
import Spinner from '../common/Spinner';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../images/login_bg.png');

class SignIn extends Component {


  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }
  onButtonPress2() {
   Actions.search()
  }
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }


  renderButton() {
    return (
      <Button
        medium
        loading={this.props.loading}
        onPress={this.onButtonPress.bind(this)}
        style={styles.button}
        leftIcon={{ name: 'user', type: 'font-awesome' }}
        backgroundColor={'#4285F4'}
        title='Sign In'
        rounded
      />
    );
  }

  signUp() {
    Actions.Signup();
  }


  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage}
        >
          <Logo />
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
          <TextInput
            autoCapitalize='none'
            style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            onChangeText={this.onEmailChange.bind(this)}
            onSubmitEditing={() => this.password.focus()}
          />
          <TextInput
            autoCapitalize='none'
            style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#ffffff"
            onChangeText={this.onPasswordChange.bind(this)}
            ref={(input) => this.password = input}
          />
          {this.renderButton()}
          <Button
            buttonStyle={{ marginTop: 20 }}
            onPress={this.onButtonPress2.bind(this)}
            leftIcon={{ name: 'google', type: 'font-awesome' }}
            backgroundColor={'#4285F4'}
            title='Sign in with Google'
            rounded
          />
          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Don't have an Account?</Text>
            <TouchableOpacity onPress={this.signUp}><Text style={styles.signupButton}> Sign Up
            </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },

  inputBox: {
    width: SCREEN_WIDTH * .8,
    height: 45,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 20,
  },

  button: {
    paddingVertical: 2
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(SignIn);