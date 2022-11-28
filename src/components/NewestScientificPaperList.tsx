import { Container, Grid } from '@chakra-ui/react';
import { ScientificPaperModel } from '../model/ScientificPaperModel';
import BookCard from './BookCard';
import classes from '../style/NewestList.module.css'

type NewestScientificPaperListProps = {
  papers: ScientificPaperModel[];
};

const NewestScientificPaperList: React.FC<NewestScientificPaperListProps> = (
  props
) => {
  return (
    <Container bg={'green.400'} h={'50%'} className={`${classes.container}`} >
      <div ></div>
      <h2>Newest scientific papers</h2>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {props.papers.map((paper: ScientificPaperModel) => (
          <BookCard
            key={paper.id}
            id={paper.id}
            name={paper.name}
            authors={paper.authors}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default NewestScientificPaperList;
