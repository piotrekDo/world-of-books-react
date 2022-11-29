import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScientificPaperModel } from '../model/ScientificPaperModel';
import classes from '../style/ScientificPaperCard.module.css';
import {scrollHandle} from '../utils/ScrollHandler'

type BookCardProps = {
  paper: ScientificPaperModel;
};

const ScientificPaperCard: React.FC<BookCardProps> = (props) => {
  return (
    <a
      className={classes.noDecoration}
      href="/"
      onClick={scrollHandle}
    >
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.box}>
            <div className={classes.content}>
              <h2>{props.paper.field}</h2>
              <h3>{props.paper.name}</h3>
              <p>{props.paper.description}</p>
              {props.paper.authors.map((aut) => (
                <p key={aut.id}>
                  {aut.firstName} {aut.lastName}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ScientificPaperCard;
