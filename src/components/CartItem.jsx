/* eslint-disable react/prop-types */
import { CartContext } from '../context/CartContext';
import { currencyFormatter } from '../utils/formatting';
import { useContext } from 'react';

export const CartItem = ({ name, quantity, price, id }) => {
  const { addItem, removeItem } = useContext(CartContext);
  return (
    <li className='cart-item'>
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className='cart-item-actions'>
        <button onClick={() => removeItem(id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => addItem({ name, quantity, price, id })}>
          +
        </button>
      </p>
    </li>
  );
};
