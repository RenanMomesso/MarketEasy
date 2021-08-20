/* eslint-disable prettier/prettier */
import { LoginTypes, ActionLogin } from './userAction';
const initialState = {
  usuario: '',
  senha: '',
  token:'',
};

const userReducer = (state = initialState, action: ActionLogin) => {
  switch (action.type) {
    case LoginTypes.GET_LOGIN_BEGIN:
      return { ...state, loading: true };
    case LoginTypes.GET_LOGIN_SUCCESS:
      return { ...state, payload: action.payload, loading: false };
    case LoginTypes.GET_LOGIN_FAILURE:
      return { ...state, payload: action.payload.error, loading: false };
    default:
      return state;
  }
};

export default userReducer;
