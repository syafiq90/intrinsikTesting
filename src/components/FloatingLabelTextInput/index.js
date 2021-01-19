import React, {Component} from 'react';
import {Text, TextInput, View, Image} from 'react-native';
import {Colors, Fonts, ApplicationStyles} from '../../themes';
import {isTableted} from '../../common/utils';
import Utils from '../../common/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

class FloatingLabelTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      secureTextEntry: true
    };
  }

  componentDidMount = () => {
    if (this.props.value) {
      this.setState({isFocused: true});
    }
  };

  changeFocus = () => {
    if (!this.props.value) {
      this.setState({isFocused: false});
    }
  };

  secure = () => {
    const secureTextEntry = this.state.secureTextEntry
    this.setState({
      secureTextEntry: !secureTextEntry
    })
  }

  textInputOnBlur = (e) => {
    if (!this.props.value) {
      this.setState({isFocused: false});
    }
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };


  render() {
  return (
      <View style={{width: '100%', marginBottom: 
      this.props.marginBottom && this.props.marginBottom}}>
        <View
          style={[
            styles.container,
            this.props.label == 'Password' && styles.justifyAlignCenter,
            {
              borderColor:
                this.props.error && this.props.error != ''
                  ? Colors.dangerRed
                  : Colors.mediumGray,
             
            },
          ]}>
          <View style={[styles.flexVertical, {flex: 1}]}>
            <View style={styles.flexHorizontal}>
              <Text
                onPress={() => this.setState({isFocused: true})}
                style={[
                  styles.leftFlex,
                  !(this.state.isFocused || this.props.value)
                    ? [styles.normalLabelStyles, styles.robotoRegular]
                    : [styles.floatLabelStyles, styles.gothamBold],
                ]}>
                {!(this.state.isFocused || this.props.value)
                  ? this.props.label
                  : this.props.label.toUpperCase()}
              </Text>
              {!(
                (this.state.isFocused || this.props.value) &&
                this.props.maxLength
              ) ? null : (
                <Text style={styles.rightFlex}>
                  {this.props.remainingLength}/{this.props.maxLength}
                </Text>
              )}
            </View>
            {(this.state.isFocused)? (
              <TextInput
                {...this.props}
                allowFontScaling={false}
                placeholder={
                  !(this.state.isFocused || this.props.value)
                    ? ''
                    : this.props.placeholder
                    ? this.props.placeholder
                    : ''
                }
                onBlur={this.textInputOnBlur}
                autoFocus={this.state.isFocused}
                keyboardType={this.props.keyboardType}
                value={this.props.value}
                onKeyPress={() => {
                  this.props.onKeyPress ? this.props.onChangeValue() : null;
                }}
                onChangeText={(e) => this.props.onChangeText(e)}
                autoCapitalize = 'none'
                textContentType="telephoneNumber"
                maxLength={this.props.maxLength}
                secureTextEntry={this.props.label == 'Password' ? this.state.secureTextEntry : false}
                style={
                  Utils.isIOS() ? styles.iosTextInput : styles.androidTextInput
                }
              />
            ) : null}
            </View>
            {this.props.label == 'Password' && <TouchableOpacity onPress={() => this.secure()} >
                {this.state.secureTextEntry ?
                <Image style={styles.iconEyes} source={require('../../assets/icons/eyes.png')}/>:
                <Image style={styles.iconEyes} source={require('../../assets/icons/eyesFalse.png')}/>
                }
              </TouchableOpacity>
               }
        </View>
        {this.props.error && this.props.error != '' ? (
          <Text style={styles.errorFont}>{this.props.error}</Text>
        ) : null}
      </View>
    );
  }
}

// Styles
const {...applicationStyles} = ApplicationStyles;
const styles = {
  ...Fonts,
  ...applicationStyles,
  container: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    height: isTableted ? 74 : 52,
    paddingLeft: 8,
    flexDirection: 'row',
  },
  normalLabelStyles: {
    ...Fonts.description,
    color: '#5ec6c5',
    lineHeight: isTableted ? 74 : 52,
  },
  floatLabelStyles: {
    ...Fonts.subTag,
    position: 'relative',
    left: 0,
    top: isTableted ? 10 : 10.41,
    color: '#5ec6c5',
    letterSpacing: 1.5,
  },
  iosTextInput: {
    fontSize: Fonts.description.fontSize,
    height: isTableted ? 52 : 42,
    paddingTop: isTableted ? 10 : 6,
    lineHeight: isTableted ? 23 : 17,
    letterSpacing: 0.5,
  },
  androidTextInput: {
    fontSize: Fonts.description.fontSize,
    height: isTableted ? 52 : 42,
    paddingTop: isTableted ? 16 : 12,
    lineHeight: 23,
    letterSpacing: 0.5,
    textAlignVertical: 'top',
  },
  leftFlex: {
    flex: 0.8,
  },
  rightFlex: {
    flex: 0.2,
    ...Fonts.gothamBold,
    ...Fonts.subTag,
    color: Colors.mediumGray,
    letterSpacing: 0.25,
    lineHeight: 15,
    textAlign: 'right',
    position: 'relative',
    left: 0,
    top: isTableted ? 10 : 10.41,
  },
  iconEyes: {
    height: isTableted ? 32 : 20, 
    width: isTableted ? 20 : 23, 
    marginHorizontal: 8,
  },
  iconCalendar: {
    height: 25, 
    width: 25, 
    marginHorizontal: 8,
    marginTop: isTableted ? 17 : 12.5
  }
};

// Make the Component available to other parts of the application
export {FloatingLabelTextInput};
