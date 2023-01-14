import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { IState } from '../..';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';
import api from '../../../services/api';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
    id: number;
    quantity: number;
}

function* checkProductStock({payload}: CheckProductStockRequest){
    const {product} = payload;

    const currencyQuantity: number = yield select((state: IState) => {
        return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0
    })

    // @ts-ignore
    const avaliableStockResponse: AxiosResponse<IStockResponse>  = yield call(api.get, `stock/${product.id}`);

    if(avaliableStockResponse.data.quantity > currencyQuantity){
        yield put(addProductToCartSuccess(product));
    }else{
        yield put(addProductToCartFailure(product.id));
    }
}

export default all([
    takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock)
]);