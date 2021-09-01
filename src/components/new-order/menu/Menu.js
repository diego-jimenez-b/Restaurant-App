import Card from '../../../UI/Card';
import MenuItem from './MenuItem';
import classes from './Menu.module.css';

const Menu = (props) => {
  return (
    <Card className={classes.card}>
      <ul className={classes['available-items']}>
        {props.currentMenu.map((item) => (
          <MenuItem item={item} key={item.id} />
        ))}
      </ul>
    </Card>
  );
};

export default Menu;
