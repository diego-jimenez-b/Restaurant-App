import { useContext } from 'react';
import OrderContext from '../../../store/order-context';

const MenuItem = ({ item }) => {
  const orderCtx = useContext(OrderContext);

  const addToCarthandler = () => {
    orderCtx.addItem(item);
  };

  return (
    <li onClick={addToCarthandler} id={item.id}>
      <span>{item.item} </span>
      <span>S/ {item.price.toFixed(2)}</span>
    </li>
  );
};

export default MenuItem;
