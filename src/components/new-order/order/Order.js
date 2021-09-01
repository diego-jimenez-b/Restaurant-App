import { addToCollection } from '../../../firebaseActions';
import { useContext, useEffect, useState } from 'react';
import Card from '../../../UI/Card';
import OrderContext from '../../../store/order-context';
import OrderItem from './OrderItem';
import classes from './Order.module.css';

const Order = () => {
  const orderCtx = useContext(OrderContext);
  const { order, resetOrder } = orderCtx;
  const [sending, setSending] = useState(false);

  const sendOrderHandler = () => {
    if (order.items.length === 0) return;

    const timestamp = new Date().getTime();
    setSending(true);
    addToCollection('orders', { ...order, timestamp }, resetOrder);
  };

  useEffect(() => {
    if (order.items.length !== 0) {
      setSending(false);
    }
  }, [order.items]);

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
