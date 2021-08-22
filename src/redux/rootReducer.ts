import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import { productReducer } from './produts/productReducer';

const reducers = combineReducers({
  userReducer,
  productReducer,

});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
