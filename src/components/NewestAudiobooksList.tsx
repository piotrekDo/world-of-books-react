import { Container, Grid } from '@chakra-ui/react';
import { AudiobookModel } from '../model/AudiobookModel';
import BookCard from './BookCard';

type NewestAudiobooksListProps = {
  audiobooks: AudiobookModel[];
};

const NewestAudiobooksList: React.FC<NewestAudiobooksListProps> = (props) => {
  return (
    <Container padding={'50px'} centerContent>
      <h3>Newest Audiobooks</h3>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {props.audiobooks.map((paper: AudiobookModel) => (
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

export default NewestAudiobooksList;
