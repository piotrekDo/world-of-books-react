import useInput from '../../hooks/UseInput';
import classes from '../style/Register.module.css';

type Props = {
    label: string;
}

const Input:React.FC<Props> = (props) => {
   const {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
   } =  useInput((text) => text.trim().length > 0);

return(
    <div className={`${classes.inputcontainer} ${classes.ic1}`}>
    <input
      id={props.label}
      name={props.label}
      className={classes.input}
      type="text"
      placeholder=" "
      onBlur={inputBlurHandler}
      onChange={valueChangeHandler}
      value={enteredValue}
    />
    <div className={classes.cut}></div>
    <label htmlFor={props.label} className={classes.placeholder}>
      {props.label}
    </label>
  </div>
)
}

export default Input;