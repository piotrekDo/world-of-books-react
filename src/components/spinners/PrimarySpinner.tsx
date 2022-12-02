import classes from '../../style/PrimarySpinner.module.css';

type Props = {
    message: string
}

const PrimarySpinner: React.FC<Props> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes['lds-dual-ring']}></div>
      <h3 style={{fontSize: '1rem'}}>{props.message}</h3>
    </div>
  );
};

export default PrimarySpinner;
