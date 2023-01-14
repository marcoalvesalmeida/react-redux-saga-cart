import { all } from 'redux-saga/effects';
import cart from './cart/sagas';
 
export default function* rootSaga() {
    // @ts-ignore
    return yield all([
        cart, 
    ]);
}