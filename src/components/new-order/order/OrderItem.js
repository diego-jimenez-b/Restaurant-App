import { useDispatch } from 'react-redux';
import { orderActions } from '../../../store/order-slice';
import classes from './OrderItem.module.css';

const Order = (props) => {
  const dispatch = useDispatch();

  const { item, price, quantity, id } = props.itemInfo;
  const total = price * quantity;

  const addToOrderHandler = () => {
    dispatch(orderActions.addItem({ ...props.itemInfo, quantity: 1 }));
  };
  const removeFromOrderHandler = () => {
    dispatch(orderActions.removeItem(id));
  };
  const deleteItemHandler = () => {
    dispatch(orderActions.deleItem(id));
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
