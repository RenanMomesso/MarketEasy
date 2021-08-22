import axios from 'axios';
import { Dispatch } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum LoginTypes {
    GET_LOGIN_BEGIN = 'GET_LOGIN_BEGIN',
    GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS',
    GET_LOGIN_FAILURE = 'GET_LOGIN_FAILURE',
    CLEAR_TOKEN = 'CLEAR_TOKEN'
}



export interface LoginBegin {
    type: string;
    payload: any;
}
export interface LoginFailure {
    type: string;
    payload: any;
}
export interface LoginSucess {
    type: string;
    payload: any;
}
interface clearTokens {
    type: string;
    payload:any;
}

export type ActionLogin = LoginBegin | LoginFailure | LoginSucess | clearTokens;

interface userReturn {
    response: {
        status: string;
        messages: Array<string>;
        token: string;
        tokenExpiration: string;
    }
}

export const clearToken = (): clearTokens => ({
    type: LoginTypes.CLEAR_TOKEN,
    payload:null,
});


export const getLoginBegin = (): LoginBegin => ({
    type: LoginTypes.GET_LOGIN_BEGIN,
    payload: null,
});

export const getLoginSucess = (userLogin: any): LoginSucess => ({
    type: LoginTypes.GET_LOGIN_SUCCESS,
    payload: { userLogin },
});

export const getLoginFailure = (error: any): LoginFailure => ({
    type: LoginTypes.GET_LOGIN_FAILURE,
    payload: { error },
});

export const loginUser = (user = '100000', pass = '123456') => async (dispatch: Dispatch<ActionLogin>) => {
    try {
        dispatch(getLoginBegin());
        const { data } = await axios.post<userReturn>('http://servicosflex.rpinfo.com.br:9000/v1.1/auth', { usuario: user, senha: pass });
        const userToken = JSON.stringify(data.response.token);
        await AsyncStorage.setItem('token', userToken);
        dispatch(getLoginSucess(data.response));
    } catch (error) {
        dispatch(getLoginFailure(error));
    }
};

export const clearTokens = () => (dispatch: Dispatch<clearTokens>) => {
    dispatch(clearToken());
};

