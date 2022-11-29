import { Link } from 'react-router-dom';
import { AudiobookModel } from '../model/AudiobookModel';
import classes from '../style/AudiobookCard.module.css'

type AudiobookCardProps = {
  audiobook: AudiobookModel;
};

const AudiobookCard: React.FC<AudiobookCardProps> = (props) => {
  return (
    <>
      <Link
        className={classes.noDecoration}
        to={`publication/${props.audiobook.id}?type=paper`}
      >
        <div className={classes.container}>
          <div className={classes.card}>
            <div className={classes.box}>
              <div className={classes.content}>
                <h2>{props.audiobook.length / 60} min</h2>
                <h3>{props.audiobook.name}</h3>
                <p>{props.audiobook.description}</p>
                {props.audiobook.authors.map((aut) => (
                  <p key={aut.id}>
                    {aut.firstName} {aut.lastName}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default AudiobookCard;
