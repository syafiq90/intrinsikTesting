import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import ChatReducer from './chatReducer';

const appReducer = combineReducers({
   authentication: AuthReducer,
   chatReducer: ChatReducer
 })

const rootReducer = (state, action) => {
   return appReducer(state, action)
}

export default rootReducer;