import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import {FloatingLabelTextInput, Spinner} from '../../components';

import {loginActions} from '../../actions/index';

import styles from './styles';

//Redux Library
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

import utils from '../../common/utils';

import {Colors} from '../../themes/colors';

// Create a component
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorPassword: '',
      errorEmail: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loginResponse !== this.props.loginResponse) {
      if (this.props.loginResponse) {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{
              name: 'Chat',
              params: {
                userName: this.props.userName,
              }
            }],
          }),
        );
      } else {
        this.setState({
          errorPassword: 'Please enter a valid Username and Password.',
          errorEmail: 'Please enter a valid Username and Password.',
        });
      }
    }
  }

  submit = async() => {
    const validationPassword = utils.passwordValidator(this.state.password)

    if (validationPassword) {
      let payload =  await Object.assign({
        username: this.state.email,
        password: this.state.password
      })
      this.props.loginApi(payload);
    } else {
      this.setState({
        errorPassword: validationPassword,
      });
    }
  }

  forgotPassword() {

  }


  changeValue = async (type, value) => {
    if (type === 'email') {
      if (this.state.errorEmail !== '') {
        await this.setState({
          email: value,
          errorEmail: '',
        });
      } else {
        this.setState({email: value});
      }
    } else if (type === 'password') {
      if (this.state.errorPassword !== '') {
        await this.setState({
          password: value,
          errorPassword: '',
        });
      } else {
        this.setState({password: value});
      }
    }
  };

  render() {
    const disable = this.state.email === '' || this.state.password === '';
    return (
      <React.Fragment>
        <View style={styles.parentContainer}>
          <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />

          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <View style={styles.topContent}>
                <Animatable.Image
                  animation="bounceIn"
                  duraton="1500"
                  resizeMode="contain"
                  source={require('../../assets/icons/chat.png')}
                  style={styles.logo}
                />
                <Text style={[styles.text, { color: Colors.darkGray}]}>Intrinsik OMS</Text>
              </View>
              <Animatable.View
                style={styles.bottomContent}
                animation="fadeInUpBig">
                <Text style={[styles.text, { marginBottom: 15, color: Colors.black }]}>Sign in</Text>
                <FloatingLabelTextInput
                  keyboardType="default"
                  label="Username"
                  value={this.state.email}
                  onChangeText={(e) => this.changeValue('email', e)}
                  onKeyPress={false}
                  format={false}
                  marginBottom={20}
                  error={this.state.errorEmail}
                />
                <FloatingLabelTextInput
                  keyboardType="default"
                  label="Password"
                  value={this.state.password}
                  onChangeText={(e) => this.changeValue('password', e)}
                  onKeyPress={false}
                  format={false}
                  error={this.state.errorPassword}
                />
                <TouchableOpacity
                  style={styles.forgotPwdView}
                  onPress={() => this.forgotPassword()}>
                  <Text style={styles.forgotPwdTxt}>Forgot Password ?</Text>
                </TouchableOpacity>

                <View style={disable ? styles.buttonDisable : styles.button}>
                  <TouchableOpacity
                    disabled={disable}
                    style={styles.signIn}
                    onPress={() => this.submit()}>
                    <Text
                      style={
                        disable ? styles.textSignDisable : styles.textSign
                      }>
                      SIGN IN
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.buttonDisableNoBorder, {marginTop: 20}]}>
                  <TouchableOpacity
                    disabled={false}
                    style={styles.signIn}>
                    <Text
                      style={
                        styles.textSignUp
                      }>
                      SIGN UP
                    </Text>
                  </TouchableOpacity>
                </View>

              </Animatable.View>
            </ScrollView>
          </SafeAreaView>
          {this.props.spinner && (
            <View style={styles.spinnerContainer}>
              <Spinner />
            </View>
          )}
        </View>
      </React.Fragment>
    );
  }
}

// Method to get the Global State Object
const mapStateToProps = (state) => {
  return {
    loginResponse: state.authentication.loginResponse,
    userName: state.authentication.userName,
    spinner: state.authentication.spinner,
  };
};

// Method to dispatch Actions
const mapDispatchToProps = (dispatch) => ({
  loginApi: (value) => dispatch(loginActions(value)),
});

// Make the Component available to other parts of the application
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
