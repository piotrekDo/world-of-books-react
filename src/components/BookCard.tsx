import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AuthorSimpleModel } from '../model/AuthorSimpleModel';
import classes from '../style/BookCard.module.css'

type BookCardProps = {
  id: number;
  name: string;
  authors: AuthorSimpleModel[];
};

const BookCard: React.FC<BookCardProps> = (props) => {
  return (
    <Link className={classes.noDecoration} to={`publication/${props.id}?type=paper`}>
      <Card align="center">
        <CardHeader>
          <Heading size="md"> {props.name} </Heading>
        </CardHeader>
        <CardBody>
          {props.authors.map((aut) => (
            <Text key={aut.id}>
              {aut.firstName} {aut.lastName}
            </Text>
          ))}
        </CardBody>
      </Card>
    </Link>
  );
};

export default BookCard;
