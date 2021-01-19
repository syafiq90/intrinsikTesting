// React Native Library
import {Platform} from 'react-native';
import moment from 'moment';
import {TIMEOUT_ERROR, NETWORK_ERROR} from 'apisauce';
import {store} from '../config/ReduxStore';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';

// Method to check the Platform of the device
export const isIOS = () => {
  return Platform.OS === 'ios';
};

// Tab mode flag
export let isTableted = DeviceInfo.isTablet();
// App version
export let appVersion = DeviceInfo.getVersion();
// Notch flag
export const hasNotch = DeviceInfo.hasNotch();

// Method to format date (14/06/2019)
export const formatDate = (val) => {
  let m = moment(val);
  if (m.isValid()) {
    return m.format('DD-MM-YYYY');
  } else {
    return moment(val, ['DD/MM/YYYY', 'YYYY-MM-DD']).format('DD-MM-YYYY');
  }
};

// Method to format date (YYYY-MM-DD)
export const formatDateForDiff = (val) => {
  let m = moment(val);
  if (m.isValid()) {
    return m.format('YYYY-MM-DD');
  } else {
    return moment(val, ['DD/MM/YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD');
  }
};

// Method to format date and time (Do = 17th, DD = 17, MMMM = Oktober, MM = 09, MMM = Okt)
export const formatDateTime = (val, type) => {
  let m = moment(val);
  if (m.isValid()) {
    if (type == 'line-minute') {
      return m.format('DD/MM/YYYY | H:mm');
    } else if (type == 'dash-minute') {
      return m.format('DD/MM/YYYY, H:mm');
    } else if (type == 'comma-minute') {
      return m.format('Do MMM YYYY, H:mm');
    } else if (type == 'date') {
      return m.format('DD/MM/YYYY');
    } else if (type == 'month-dash') {
      return m.format('Do-MMM-YYYY');
    } else {
      return m.format('MMMM Do YYYY, h:mm:ss');
    }
  } else {
    return '';
  }
};


// Method to format time
export const formatTime = (val, type) => {
  if (val !== null) {
    if (type === '24hr') {
      let m = moment(val);
      return m.isValid() ? m.format('H:mm') : '';
    } else {
      try {
        var sec_num = parseInt(val, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - hours * 3600) / 60);
        var seconds = sec_num - hours * 3600 - minutes * 60;

        if (hours < 10) {
          hours = '0' + hours;
        }
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
        return hours === '00'
          ? minutes + ':' + seconds
          : hours + ':' + minutes + ':' + seconds;
      } catch (error) {
        console.log('error formating the time: ', error);
        return val;
      }
    }
  } else {
    return val;
  }
};

// Method to check connectivity
export const passwordValidator = (pass) => {
  const capital = /[A-Z]/;
  const digit = /[0-9]/;
  if (!capital.test(pass)) {
    return 'Password must contain atleast one uppercase.';
  }
  if (!digit.test(pass)) {
    return 'Password must contain atleast one numeric.';
  }
  return true;
};

// Method to check connectivity
export const checkConnectivity = () => {
  return NetInfo.isConnected.fetch();
};

export const isNotEmpty = (data) => {
  return data !== undefined && data !== null && data !== 'null' && data !== '';
};

export const checkErrorResponse = (response) => {
  if (store.getState().authentication.isSystemError) {
    let resp = {
      message: 'unsuccessful',
      err_code: 'systemError',
    };
    return resp;
  } else if (
    response.problem === TIMEOUT_ERROR ||
    response.problem === NETWORK_ERROR
  ) {
    let resp = {
      message: 'unsuccessful',
      err_code: 'networkError',
    };
    return resp;
  } else {
    return false;
  }
};

export const isEqualArray = (array1, array2, type) => {
  if (array1.length === 0 || array1.length != array2.length) return false;
  else {
    // comapring each element of array
    for (var i = 0; i < array1.length; i++) {
      if (array1[i][type] != array2[i][type]) {
        return false;
      }
    }
    return true;
  }
};

// Make the Utils available to other parts of the application
export default {
  isIOS,
  formatDateTime,
  formatTime,
  formatDate,
  formatDateForDiff,
  checkConnectivity,
  isNotEmpty,
  checkErrorResponse,
  isEqualArray,
  passwordValidator,
};
