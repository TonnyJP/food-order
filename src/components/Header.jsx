import logo from '../assets/logo.jpg';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Button } from './UI/Button';
import { UserProgressContext } from '../context/UserProgressContext';
export const Header = () => {
  const { items } = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);
  const totalCartItems = items.reduce((totalNumberOfItems, items) => {
    return totalNumberOfItems + items.quantity;
  }, 0);

  const handleShowCart = () => {
    progressCtx.showCart();
  };

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logo} alt='A restaurant' />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};
