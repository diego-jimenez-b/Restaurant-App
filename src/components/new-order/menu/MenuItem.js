import { useDispatch } from 'react-redux';

import { orderActions } from '../../../store/order-slice';

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();

  const addToCarthandler = () => {
    dispatch(orderActions.addItem({ ...item, quantity: 1 }));
  };

  return (
    <li onClick={addToCarthandler} id={item.id}>
      <span>{item.item} </span>
      <span>S/ {item.price.toFixed(2)}</span>
    </li>
  );
};

export default MenuItem;
