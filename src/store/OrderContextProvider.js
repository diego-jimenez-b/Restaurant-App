import { useReducer } from 'react';
import OrderContext from './order-context';

const initialOrderState = {
  items: [],
  totalPrice: 0,
};

const orderReducer = (state, action) => {
  let updatedItems = [...state.items];
  let updatedTotal;

  if (action.type === 'ADD') {
    updatedTotal = state.totalPrice + action.item.price;

    const existingItemIndex = updatedItems.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = updatedItems[existingItemIndex];

    let updatedItem;
    if (existingItem) {
      updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItem = { ...action.item, quantity: 1 };
      updatedItems.push(updatedItem);
    }
  }

  if (action.type === 'REMOVE') {
    const existingItem = updatedItems.find((item) => item.id === action.id);

    updatedTotal = state.totalPrice - existingItem.price;
    if (existingItem.quantity === 1) {
      updatedItems = updatedItems.filter((item) => item.id !== action.id);
    } else {
      existingItem.quantity = existingItem.quantity - 1;
    }
  }

  if (action.type === 'DELETE') {
    const existingItem = updatedItems.find((item) => item.id === action.id);
    updatedItems = updatedItems.filter((item) => item.id !== action.id);
    updatedTotal =
      state.totalPrice - existingItem.price * existingItem.quantity;
  }

  if (action.type === 'RESET') return initialOrderState;

  return {
    items: updatedItems,
    totalPrice: updatedTotal,
  };
};

const OrderContextProvider = (props) => {
  const [orderState, dispatch] = useReducer(orderReducer, initialOrderState);

  const addToOrderHandler = (item) => {
    dispatch({ type: 'ADD', item: item });
  };
  const removeFromOrderHandler = (id) => {
    dispatch({ type: 'REMOVE', id: id });
  };
  const deleteItemHandler = (id) => {
    dispatch({ type: 'DELETE', id: id });
  };
  const resetOrderHandler = () => {
    dispatch({ type: 'RESET' });
  };

  const orderContext = {
    order: orderState,
    addItem: addToOrderHandler,
    removeItem: removeFromOrderHandler,
    deleteItem: deleteItemHandler,
    resetOrder: resetOrderHandler,
  };

  return (
    <OrderContext.Provider value={orderContext}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
