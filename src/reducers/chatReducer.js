import {
    CHAT,
    CHAT_SUCCESS,
    CHAT_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
    chatrequest: [],
    chat: [    {
      _id: 1,
      text: 'I want buy Wheelchair accessories are made specifically to improve a patient’s quality of life.',
      createdAt: new Date(),
      user: {
        _id: 2,
      },
    },{
      _id: 2,
      text: 'Yes, Intrinsik in here ',
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    },
    {
      _id: 3,
      text: 'Hello Intrinsik',
      createdAt: new Date(),
      user: {
        _id: 2,
      },
    }
   ],
    spinner: false
};


export default (state, action) => {
    if (typeof state === 'undefined') {
       return INITIAL_STATE
     }
    switch (action.type) {
       case CHAT:
          return { ...state, chatrequest: [action.payload,...state.chatrequest], spinner: true}
       case CHAT_SUCCESS:
          return { 
             ...state, 
             chat: [action.payload,...state.chat] ,
            spinner: false,
         }
       case CHAT_FAILED:
          return { ...state, chat: action.payload, spinner: false}
       default:
            return state;
      }
   };