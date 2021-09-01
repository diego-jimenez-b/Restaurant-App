import { createContext } from 'react';

const OrderContext = createContext({
  order: { items: [], totalPrice: 0 },
  addItem: (item) => {},
  removeItem: (id) => {},
  deleteItem: (id) => {},
  resetOrder: () => {},
});

export default OrderContext;
