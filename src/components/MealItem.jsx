import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { currencyFormatter } from '../utils/formatting';
import { Button } from './UI/Button';

/* eslint-disable react/prop-types */
export const MealItem = ({ meal }) => {
  const { addItem } = useContext(CartContext);
  /* console.log('meals, ', meal); */
  const hanldeAddMealToCart = () => {
    addItem(meal);
  };
  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className='meal-item-price'>
            {currencyFormatter.format(meal.price)}
          </p>
          <p className='meal-item-description'>{meal.description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button onClick={hanldeAddMealToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
};
