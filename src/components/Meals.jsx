/* eslint-disable react/prop-types */
import { MealItem } from './MealItem';
import { useFetch } from '../hooks/useFetch';
import { Error } from './Error';

export const Meals = () => {
  const { data, isLoading, isError } = useFetch('http://localhost:3000/meals');
  if (isLoading) {
    return <p className='center'>Fetching meals...</p>;
  }
  if (isError) {
    return <Error title='Failed to fetch meals' message={isError} />;
  }
  console.log('loaded meals ', data, isLoading, isError);
  return (
    <ul id='meals'>
      {data.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
};
