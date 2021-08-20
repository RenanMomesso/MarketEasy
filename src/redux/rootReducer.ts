/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import userReducer from './user/userReducer';

const reducers = combineReducers({
  userReducer: userReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
