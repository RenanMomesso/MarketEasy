import axios from 'axios';
import { Dispatch } from 'react';

export enum ProductsType {
    GET_PRODUCTS_INIT = 'GET_PRODUCTS_INIT',
    GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
    GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE',
}

export interface productItem {
    Codigo: string;
    Descricao: string
    Preco: number
    CodigoBarras: string
}

interface productsReturn {
    response: {
        status: string;
        messages: Array<string>;
        produtos: productItem[];
        tokenExpiration: string;
    }
}

export interface ProductBegin {
    type: string;
    payload: null;
}
export interface ProductSuccess {
    type: string;
    payload: any;
}
export interface ProductFailure {
    type: string;
    payload: any;
}

export type ProductsAction = ProductBegin | ProductSuccess | ProductFailure

export const getProductBegin = (): ProductBegin => ({
    type: ProductsType.GET_PRODUCTS_INIT,
    payload: null,
});

export const getProductSuccess = (products: object): ProductSuccess => ({
    type: ProductsType.GET_PRODUCTS_SUCCESS,
    payload: { products },
});

export const getProductFailure = (error: any): ProductFailure => ({
    type: ProductsType.GET_PRODUCTS_FAILURE,
    payload: { error },
});

export const getProducts = () => async (dispatch: Dispatch<ProductsAction>) => {
    try {
        dispatch(getProductBegin());
        const { data } = await axios.get<productsReturn>('http://servicosflex.rpinfo.com.br:9000/v2.0/produtounidade/listaprodutos/0/unidade/83402711000110');
        dispatch(getProductSuccess(data.response.produtos));
    } catch (error) {
        dispatch(getProductFailure(error));
    }
};

