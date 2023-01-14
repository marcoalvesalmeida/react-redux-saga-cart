import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../../store";
import { ICartState } from "../../store/modules/cart/types";

const Cart: React.FC = () => {
  const { items } = useSelector<IState, ICartState>((state) => state.cart);

  return (
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.product.id}>
            <td>{item.product.title}</td>
            <td>{item.product.price.toFixed(2)}</td>
            <td>{item.quantity}</td>
            <td>{(item.quantity * item.product.price).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Cart;
