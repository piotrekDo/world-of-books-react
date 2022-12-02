import useInput from '../../hooks/UseInput';
import classes from '../style/Register.module.css';

type Props = {
    value: any;
    label: string;
    onBlur : () => any;
    onChange : () => any;
}

const Input:React.FC<Props> = (props) => {

return(
    <div className={`${classes.inputcontainer} ${classes.ic1}`}>
    <input
      id={props.label}
      name={props.label}
      className={classes.input}
      type="text"
      placeholder=" "
      onBlur={props.onBlur}
      onChange={props.onChange}
      value={props.value}
    />
    <div className={classes.cut}></div>
    <label htmlFor={props.label} className={classes.placeholder}>
      {props.label}
    </label>
  </div>
)
}

export default Input;