import { Container, Grid } from '@chakra-ui/react';
import { AudiobookModel } from '../model/AudiobookModel';
import classes from '../style/NewestList.module.css'
import AudiobookCard from './AudiobookCard';

type NewestAudiobooksListProps = {
  audiobooks: AudiobookModel[];
};

const NewestAudiobooksList: React.FC<NewestAudiobooksListProps> = (props) => {
  return (
    <Container bg={'green.400'} h={'50%'} className={classes.container}>
          
      <h1>Newest Audiobooks</h1>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {props.audiobooks.map((audiobook: AudiobookModel) => (
          <AudiobookCard key={audiobook.id} audiobook={audiobook}/>
        ))}
      </Grid>
    </Container>
  );
};

export default NewestAudiobooksList;
