import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    CHAT,
    CHAT_SUCCESS,
    CHAT_FAILED
} from './types';


export const loginActions = (value) => {
    return {
        type: LOGIN,
        payload: value
    }
}

export const loginSuccess = (response) => {
    return {
        type: LOGIN_SUCCESS,
        payload: response
    }
}

export const loginFailed = (response) => {
    return {
        type: LOGIN_FAILED,
        payload: response
    }
}

export const chatActions = (value) => {
    return {
        type: CHAT,
        payload: value
    }
}

export const chatSuccess = (response) => {
    return {
        type: CHAT_SUCCESS,
        payload: response
    }
}

export const chatFailed = (response) => {
    return {
        type: CHAT_FAILED,
        payload: response
    }
}
