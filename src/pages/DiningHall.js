import { Fragment } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import OrdersList from '../components/orders-list/OrdersList';
import NewOrder from '../components/new-order/NewOrder';
import Card from '../UI/Card';
import classes from './DiningHall.module.css';

const DiningHall = () => {
  return (
    <Fragment>
      <Route path='/dining-hall' exact>
        <div className={classes.container}>
          <Card className={classes.card}>
            <Link to='/dining-hall/new-order'>
              <h2>---- Take a new order! ----</h2>
            </Link>
          </Card>

          <OrdersList collectionName='finished-orders' />
        </div>
      </Route>

      <Route path='/dining-hall/new-order' exact>
        <NewOrder />
      </Route>
    </Fragment>
  );
};

export default DiningHall;
