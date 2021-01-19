import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import ReduxNavigation from '../../navigation/appNavigation';
import { connect } from 'react-redux';
import NavigationService from '../../navigation/navigationService';

// Import Components
import { MyStatusBar } from '../../components/';

// Themes
import { ApplicationStyles } from '../../themes';

class RootContainer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={ApplicationStyles.flexContainer}>
        <MyStatusBar />
        <ReduxNavigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
