import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { AudiobookModel } from '../model/AudiobookModel';
import classes from '../style/AudiobookCard.module.css'
import {scrollHandle} from '../utils/ScrollHandler'
import { truncate } from '../utils/StringUtlis';

type AudiobookCardProps = {
  audiobook: AudiobookModel;
};

const AudiobookCard: React.FC<AudiobookCardProps> = (props) => {
  const context = useContext(AppContext);
  const navigation = useNavigate();
  const user = context.currentUser;

  const redirectHandler = () => {
    console.log(props.audiobook.id)
   return navigation(`/audiobook/${props.audiobook.id}`)
  }
  return (
    <>
      <a
        className={classes.noDecoration}
        onClick={user ? redirectHandler : scrollHandle}
      >
        <div className={classes.container}>
          <div className={classes.card}>
            <div className={classes.box}>
              <div className={classes.content}>
                <h2>{props.audiobook.length / 60} min</h2>
                <h3>{truncate(props.audiobook.name, 30)}</h3>
                <p style={{marginBottom: '50px'}}>{truncate(props.audiobook.description, 100)}</p>
                {props.audiobook.authors.map((aut) => (
                  <p key={aut.id}>
                    <i>~{aut.firstName} {aut.lastName}</i>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default AudiobookCard;
