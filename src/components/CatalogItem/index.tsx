import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { IState } from '../../store';
import { addProductToCartRequest } from '../../store/modules/cart/actions';
import {  IProduct } from '../../store/modules/cart/types';

interface Props {
    product: IProduct;
}

const CatalogItem = ({product}: Props): JSX.Element => {
    const dispatch = useDispatch();
    const hasFailedStockCheck = useSelector<IState, boolean>(state => state.cart.failedStockCheck.includes(product.id));

    const handleAddProductToCart = useCallback(
    (product: IProduct) => {
        dispatch(addProductToCartRequest(product));
    },
    [dispatch]
    );

  return (
    <article key={product.id}>
        <>
            <strong>{product.title}</strong>
            {" - "}
            <span>{product.price}</span>
            <br></br>
            <button
                type="button"
                onClick={() => handleAddProductToCart(product)}
            >
                Comprar
            </button>
            {hasFailedStockCheck && <span style={{color: 'red'}}>Esgotado!</span> }
        </>
        <br></br>
    </article>
  );
}

export default CatalogItem;