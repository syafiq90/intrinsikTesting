//Async Storage Library
import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../services/api';
import {
  CHAT,
} from '../actions/types';
import {
  chatSuccess,
  chatFailed,
} from '../actions/index';
 

function* workerChat(api, params) {
  try {
    if (params.payload) {
      const payload = yield Object.assign(
        {
        token: "R2yFaGoSpxonWgnin8wG7Q",// token for fakejson
        data: params.payload
      })
      const response = yield call(api.postChat, payload);
      console.log('response', response)
      if (response.status === 200) {
        yield put(chatSuccess(response.data));
      } else {
        yield put(chatFailed(resp))
      }
    }
  } catch (error) {
    console.log(error)
  }
}


export const watcherChat = [
  takeLatest(CHAT, workerChat, api),
]