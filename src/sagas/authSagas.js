//Async Storage Library
import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../services/api';
import {
  LOGIN,

} from '../actions/types';
import {
  loginSuccess,
  loginFailed,
} from '../actions/index';
import Utils from '../common/utils';
 

/* eslint-disable import/prefer-default-export */
function* workerLogin(api, params) {
  try {
    if (params.payload) {
      const payload = yield Object.assign(
        {
        token: "R2yFaGoSpxonWgnin8wG7Q",// token for fakejson
        data: params.payload
      })
      const response = yield call(api.postLogin, payload);
      console.log('response', response)
      if (response.status === 200) {
        yield put(loginSuccess(response.data));
      } else {
        yield put(loginFailed(response.data))
      }
    }
  } catch (error) {
    console.log(error)
  }
}


export const watcherAuth = [
  takeLatest(LOGIN, workerLogin, api),
]