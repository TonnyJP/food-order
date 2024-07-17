/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import {
  useState,
  useEffect,
  useReducer,
  useCallback,
  createContext,
} from 'react';
import { useFetch } from '../hooks/useFetch';

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedItems = [...state.items];
      const { id, name, price, description, image } = action.payload;
      if (existingCartItemIndex > -1) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ id, name, price, description, image, quantity: 1 });
      }
      return {
        ...state,
        items: updatedItems,
      };
    case 'REMOVE_ITEM':
      const existingCartItemIdx = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingCartItem = state.items[existingCartItemIdx];
      const updatesRemoveItems = [...state.items];
      if (existingCartItem.quantity === 1) {
        updatesRemoveItems.splice(existingCartItemIdx, 1);
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatesRemoveItems[existingCartItemIdx] = updatedItem;
      }
      return {
        ...state,
        items: updatesRemoveItems,
      };
    case 'CLEAR_CART':
      console.log('in reducer clear, ', state, action);
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  const addTocart = (item) => {
    //const toAdd = data.find((elt) => elt.id !== item.id);
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id,
    });
  };
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  console.log('in context, ', cart);
  // const value = { data, isError, isLoading };
  const value = {
    items: cart.items,
    addItem: addTocart,
    removeItem: removeItem,
    clearCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
