import { productItem, ProductsAction, ProductsType } from './productAction';

interface InitialState {
    loading: boolean;
    products: [productItem] | [];

}

const initialState: InitialState = {
    loading: false,
    products: [],
};

export const productReducer = (state = initialState, action: ProductsAction) => {
    switch (action.type) {
        case ProductsType.GET_PRODUCTS_INIT:
            return { ...state, loading: true };
        case ProductsType.GET_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload.products, loading: false };
        case ProductsType.GET_PRODUCTS_FAILURE:
            return { ...state, error: action.payload.error, loading: false };
        default:
            return state;
    }
};
