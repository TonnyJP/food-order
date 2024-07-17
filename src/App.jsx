import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Header } from './components/Header';
import { Meals } from './components/Meals';

/* eslint-disable react/no-unescaped-entities */
function App() {
  return (
    <>
      <Cart />
      <Checkout />
      <Header />
      <Meals />
    </>
  );
}

export default App;
