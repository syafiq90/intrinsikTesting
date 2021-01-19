import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import {Spinner} from '../../components';

import {chatActions} from '../../actions/index';

import styles from './styles';

//Redux Library
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { GiftedChat, Send, Message } from "react-native-gifted-chat";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

// Create a component
class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  setMenuRef = ref => {
    this._menu = ref;
  };
  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };
  componentDidMount(){
    this.props.navigation.setOptions({
      headerTitle:<Text style={{color: 'black'}}>{this.props.route.params.userName}</Text>,
      headerLeft: (props) => (
        <TouchableOpacity
          style={{marginLeft: 8}}
          >
          <MaterialCommunityIcons
            name="chevron-left"
            color={'#5ec6c5'}
            size={25}
          />
        </TouchableOpacity>
         
      ),
      headerRight: (props) => (
        <Menu
        ref={this.setMenuRef}
        button={
          <TouchableOpacity
            style={{marginRight: 8}}
            onPress={()=>this.showMenu()}>
            <MaterialCommunityIcons
              name="dots-vertical"
              color={'#5ec6c5'}
              size={25}
            />
          </TouchableOpacity>
        }
      >
        <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
        <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
        <MenuItem onPress={this.hideMenu} disabled>
          Menu item 3
        </MenuItem>
        <MenuDivider />
        <MenuItem onPress={this.logout}>Logout</MenuItem>
      </Menu> 
      ),
  })
  }

  renderCustomActions = () => {
      const icon_color ="#5ec6c5";
      return (
        <View style={styles.customActionsContainer}>
          <TouchableOpacity >
            <View style={styles.buttonContainer}>
              <MaterialCommunityIcons name="paperclip" size={30} color={icon_color} />
            </View>
          </TouchableOpacity>
        </View>
      );

  }
  appendMessage = async(message) => {
    this.props.chatActions(
      ...message
    )
  }

  renderSend = props => {
      return (
        <Send
        {...props}
        containerStyle={{
          height: 60,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons name="send-outline" size={40} color={"#5ec6c5"}/>
      </Send>
      );
  }

  logout = () => {
    this.hideMenu()
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{
          name: 'Login'
        }],
      }),
    );
  }
  render() {
    return (
      <React.Fragment>
        <View style={styles.parentContainer}>
          <SafeAreaView style={{flex:1}}>
              <GiftedChat
                messages={this.props.chat}
                onSend={messages => this.appendMessage(messages)}
                user={{
                  _id: 1
                }}
                renderActions={this.renderCustomActions}
                renderSend={this.renderSend}
                renderAvatar={null}
              />
             
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
    chat: state.chatReducer.chat,
    spinner: state.chatReducer.spinner,
  };
};

// Method to dispatch Actions
const mapDispatchToProps = (dispatch) => ({
  chatActions: (value) => dispatch(chatActions(value)),
});

// Make the Component available to other parts of the application
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
