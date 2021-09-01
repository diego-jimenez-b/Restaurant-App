import { Fragment, useState } from 'react';
import Menu from './menu/Menu';
import Order from './order/Order';
import classes from './NewOrder.module.css';
import { Link } from 'react-router-dom';

const morningMenu = [
  { item: 'American coffee', price: 5, id: 'item_m_01' },
  { item: 'Coffee with milk', price: 7, id: 'item_m_02' },
  { item: 'Cheese and ham sandwich', price: 10, id: 'item_m_03' },
  { item: 'Fruits juice', price: 7, id: 'item_m_04' },
];

const afternoonMenu = [
  { item: 'Simple hamburger', price: 10, id: 'item_a_01' },
  { item: 'Double hamburger', price: 15, id: 'item_a_02' },
  { item: 'Potato chips', price: 5, id: 'item_a_03' },
  { item: 'Onion rings', price: 5, id: 'item_a_04' },
  { item: 'Water 500ml', price: 5, id: 'item_a_05' },
  { item: 'Water 750ml', price: 7, id: 'item_a_06' },
  { item: 'Soda 500ml', price: 7, id: 'item_a_07' },
  { item: 'Soda 750ml', price: 10, id: 'item_a_08' },
];

const NewOrder = () => {
  const [isMorning, setIsMorning] = useState(true);

  const changeToMorningHandler = () => setIsMorning(true);
  const changeToAfternoonHandler = () => setIsMorning(false);

  const currentMenu = isMorning ? morningMenu : afternoonMenu;

  return (
    <Fragment>
      <Link to='/dining-hall' className={classes['back-btn']}>
        &lt;
      </Link>

      <div className={classes['time-btns']}>
        <button onClick={changeToMorningHandler}>Morning</button>
        <button onClick={changeToAfternoonHandler}>Afternoon</button>
      </div>

      <main className={classes.main}>
        <Menu currentMenu={currentMenu} />
        <Order className={classes.order} />
      </main>
    </Fragment>
  );
};

export default NewOrder;
