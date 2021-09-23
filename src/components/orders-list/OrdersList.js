import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useState, useEffect } from 'react';

import Card from '../../UI/Card';
import classes from './OrdersList.module.css';
import OrdersListItem from './OrdersListItem';
import { useHistory } from 'react-router';

const KitchenList = ({ collectionName }) => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const q = query(collection(db, collectionName));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const ordersList = [];
        querySnapshot.forEach((order) => {
          const orderItem = order.data();
          const key = order['_key'].path.segments[6];
          ordersList.push({ ...orderItem, key });
        });
        if (ordersList.length === 0) {
          setOrders(null);
          return;
        }
        setOrders(ordersList);
      },
      (error) => {
        alert(error.message);
      }
    );

    return unsubscribe;
  }, [collectionName, history]);

  if (!orders) {
    return (
      <Card className={classes.card}>
        <p>
          {collectionName === 'orders'
            ? 'No pending orders for now'
            : 'No finished orders'}
        </p>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className={classes.card}>
        <p>Loading...</p>
      </Card>
    );
  }

  const sortedOrders = [...orders].sort((a, b) => a.timestamp - b.timestamp);
  const finished = collectionName === 'finished-orders';
  const delivering = history.location.pathname === '/dining-hall';

  return (
    <Card className={classes.card}>
      <h2>{finished ? 'Finished orders' : 'Pending orders'}</h2>
      <ol className={classes.list}>
        {sortedOrders.map((item, ind) => (
          <OrdersListItem
            data={item}
            key={`${ind}_listItem`}
            isFinished={finished}
            delivering={delivering}
          />
        ))}
      </ol>
    </Card>
  );
};

export default KitchenList;
