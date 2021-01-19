import { all } from 'redux-saga/effects'
import { watcherAuth } from '../sagas/authSagas'
import { watcherChat } from '../sagas/chatSagas '


export default function* reduxSaga() {
    yield all([
        ...watcherAuth,
        ...watcherChat,
    ])
}