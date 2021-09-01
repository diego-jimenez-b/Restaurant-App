import { addToCollection, deleteFromCollection } from '../../firebaseActions';
import classes from './OrdersListItem.module.css';

const KitchenListItem = ({ data, isFinished, delivering }) => {
  const finishOrderHandler = () => {
    addToCollection('finished-orders', data);
    deleteFromCollection('orders', data.key);
  };
  const deliverOrderHandler = () => {
    deleteFromCollection('finished-orders', data.key);
  };

  const items = data.items;
  const time = new Date(data.timestamp).toLocaleTimeString();
  const total = data.totalPrice.toFixed(2);

  let numItems = 0;
  items.forEach((item) => (numItems += item.quantity));

  return (
    <li className={classes.order}>
      <span>
        {time} - S/ {total} - ({numItems})
      </span>

      <ul className={classes.items}>
        {items.map((item, ind) => (
          <li key={`${item.id}_${ind}`}>
            <span>{item.item}</span> x{item.quantity}
          </li>
        ))}
      </ul>

      {!isFinished && <button onClick={finishOrderHandler}>Order ready</button>}
      {delivering && <button onClick={deliverOrderHandler}>Delivered!</button>}
    </li>
  );
};

export default KitchenListItem;
