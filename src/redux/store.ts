/* eslint-disable prettier/prettier */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReducer']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middlewares = [thunk]
const enchancers = [applyMiddleware(...middlewares)]

export const store:any = createStore(persistedReducer, compose(...enchancers));
export const persistor = persistStore(store);