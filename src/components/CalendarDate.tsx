import classes from '../style/CalendarDate.module.css'
type Props = {
    date: string;
}
const CalendarDate: React.FC<Props> = (props) => {
    const dateObj = new Date(props.date);
    const month = dateObj.toLocaleString('en-EN', { month: 'long' });
    const day = dateObj.toLocaleString('en-EN', { day: '2-digit' });
    const year = dateObj.getFullYear();
    return (
      <div className={classes['expense-date']}>
        <div className={classes['expense-date__month']}>{month}</div>
        <div className={classes['expense-date__year']}>{year}</div>
        <div className={classes['expense-date__day']}>{day}</div>
      </div>
    );
  }

  export default CalendarDate;