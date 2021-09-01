import { Fragment, useState } from 'react';
import classes from './Kitchen.module.css';
import OrdersList from '../components/orders-list/OrdersList';
import Card from '../UI/Card';

const Kitchen = () => {
  const [showFinishedOrders, setShowFinishedOrders] = useState(false);

  const toggleFinishedOrders = () => {
    setShowFinishedOrders((prevState) => !prevState);
  };

  return (
    <Fragment>
      <OrdersList collectionName={'orders'} />

      <Card className={classes.card}>
        <button onClick={toggleFinishedOrders}>
          {showFinishedOrders ? 'Hide finished orders' : 'Show finished orders'}
        </button>
      </Card>

      {showFinishedOrders && <OrdersList collectionName={'finished-orders'} />}
    </Fragment>
  );
};

export default Kitchen;
