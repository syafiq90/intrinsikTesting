import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
    loginrequest: {},
    loginResponse: null,
    userName: '',
    spinner: false
};


export default (state, action) => {
    if (typeof state === 'undefined') {
       return INITIAL_STATE
     }
    switch (action.type) {
       case LOGIN:
          return { ...state, loginrequest: action.payload, spinner: true}
       case LOGIN_SUCCESS:
          return { 
             ...state, 
            loginResponse: action.payload ? action.payload : {},
            userName: action.payload ? action.payload.username: " ", //
            spinner: false,
         }
       case LOGIN_FAILED:
          return { ...state, loginResponse: action.payload, spinner: false}
       default:
            return state;
      }
   };