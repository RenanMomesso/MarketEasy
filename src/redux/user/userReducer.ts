import { LoginTypes, ActionLogin } from './userAction';
const initialState = {
  usuario: '',
  senha: '',
  token: '',
  tokenExpiration: '',
};

const userReducer = (state = initialState, action: ActionLogin) => {
  switch (action.type) {
    case LoginTypes.GET_LOGIN_BEGIN:
      return { ...state, loading: true };
    case LoginTypes.GET_LOGIN_SUCCESS:
      return { ...state, token: action.payload.userLogin.token, loading: false, tokenExpiration: action.payload.userLogin.tokenExpiration };
    case LoginTypes.GET_LOGIN_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
    case LoginTypes.CLEAR_TOKEN:
      return { ...state, token: '', tokenExpiration: '' };
    default:
      return state;
  }
};

export default userReducer;
