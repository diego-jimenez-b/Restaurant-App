import { useContext } from 'react';
import OrderContext from '../../../store/order-context';
import classes from './OrderItem.module.css';

const Order = (props) => {
  const orderCtx = useContext(OrderContext);

  const { item, price, quantity, id } = props.itemInfo;
  const total = price * quantity;

  const addToOrderHandler = () => {
    orderCtx.addItem(props.itemInfo);
  };
  const removeFromOrderHandler = () => {
    orderCtx.removeItem(id);
  };
  const deleteItemHandler = () => {
    orderCtx.deleteItem(id);
  };

  return (
    <li className={classes.item}>
      <h3>{item}</h3>
      <span>S/ {price.toFixed(2)}</span>
      <span>x{quantity}</span>
      <button onClick={addToOrderHandler}>+</button>
      <button onClick={removeFromOrderHandler}>-</button>
      <button onClick={deleteItemHandler}>del</button>
      <span>S/ {total.toFixed(2)}</span>
    </li>
  );
};

export default Order;
