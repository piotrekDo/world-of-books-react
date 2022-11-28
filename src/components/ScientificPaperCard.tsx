import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ScientificPaperModel } from '../model/ScientificPaperModel';
import classes from '../style/BookCard.module.css'

type BookCardProps = {
  paper: ScientificPaperModel;
};

const ScientificPaperCard: React.FC<BookCardProps> = (props) => {
  return (
    <Link className={classes.noDecoration} to={`publication/${props.paper.id}?type=paper`}>
      <Card align="center">
        <CardHeader>
          <Heading size="md"> {props.paper.name} </Heading>
        </CardHeader>
        <CardBody>
          {props.paper.authors.map((aut) => (
            <Text key={aut.id}>
              {aut.firstName} {aut.lastName}
            </Text>
          ))}
        </CardBody>
      </Card>
    </Link>
  );
};

export default ScientificPaperCard;
