import { CartContext } from '../context/CartContext';
import { UserProgressContext } from '../context/UserProgressContext';
import { currencyFormatter } from '../utils/formatting';
import { Button } from './UI/Button';
import { Input } from './UI/Input';
import { Modal } from './UI/Modal';
import { useContext } from 'react';
/* import { useContext } from "react" */
/* import axios from 'axios'; */
import { useUpate } from '../hooks/useUpdate';
/* 
const requesConfig = {}; */
export const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { data, isLoading, isError, updateData, clearData } = useUpate();
  /* const { data, isLoading, isError } = useFetch(
    'http://localhost:3000/orders',
    requestConfig,
    'update'
  ); */

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleClose = () => {
    userProgressCtx.hideCheckout();
  };
  const handleFinish = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    updateData('http://localhost:3000/orders', {
      order: {
        items: cartCtx.items,
        customer: customerData,
      },
    });
  };
  let action = (
    <>
      <Button textOnly type='button' onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isLoading) {
    action = <span>Sending order data...</span>;
  }
  console.log('in checkout, ', data, isError);
  if (data && !isError) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted auccessfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes
        </p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label='Full Name' type='text' id='name' />
        <Input label='E-Mail Address' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>
        <p className='modal-actions'>{action}</p>
      </form>
    </Modal>
  );
};
