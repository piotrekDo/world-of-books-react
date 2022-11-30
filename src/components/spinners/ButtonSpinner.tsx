import classes from '../../style/PrimarySpinner.module.css';

type Props = {
    message: string
}

const ButtonSpinner: React.FC<Props> = (props) => {
  return (
    <div className={classes.containerSM}>
      <div className={classes['lds-dual-ring-small']}></div>
      <h3>{props.message}</h3>
    </div>
  );
};

export default ButtonSpinner;