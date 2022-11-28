import { Container, Grid } from '@chakra-ui/react';
import { ScientificPaperModel } from '../model/ScientificPaperModel';
import BookCard from './BookCard';

type NewestScientificPaperListProps = {
  papers: ScientificPaperModel[];
};

const NewestScientificPaperList: React.FC<NewestScientificPaperListProps> = (
  props
) => {
  return (
    <Container bg={'green.400'}>
      <h3>Newest scientific papers</h3>
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
