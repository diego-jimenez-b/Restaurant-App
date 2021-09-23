import { addToCollection } from '../../../firebaseActions';
import { useState } from 'react';
import Card from '../../../UI/Card';
import OrderItem from './OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../../store/order-slice';
import classes from './Order.module.css';

const Order = () => {
  const [sending, setSending] = useState(false);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const sendOrderHandler = () => {
    if (order.items.length === 0) return;

    const timestamp = new Date().getTime();
    setSending(true);
    addToCollection('orders', { ...order, timestamp }).then(() => {
      setSending(false);
      dispatch(orderActions.resetOrder());
    });
  };

  if (order.items.length === 0) {
    return (
      <Card className={classes.card}>
        <p>No items added to order</p>
      </Card>
    );
  }

  return (
    <Card className={classes.card}>
      <ul>
        {order.items.map((item) => (
          <OrderItem key={`order_${item.id}`} id={item.id} itemInfo={item} />
        ))}
      </ul>

      <div className={classes.total}>
        <h3>Total: S/ {order.totalPrice.toFixed(2)}</h3>
        {sending && <span>Sending... </span>}
        <button
          className={sending ? classes.disabled : ''}
          onClick={sendOrderHandler}
          disabled={sending}
        >
          Send order
        </button>
      </div>
    </Card>
  );
};

export default Order;
