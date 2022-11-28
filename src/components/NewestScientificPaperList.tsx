import { Container, Grid } from '@chakra-ui/react';
import { ScientificPaperModel } from '../model/ScientificPaperModel';
import classes from '../style/NewestList.module.css'
import ScientificPaperCard from './ScientificPaperCard';

type NewestScientificPaperListProps = {
  papers: ScientificPaperModel[];
};

const NewestScientificPaperList: React.FC<NewestScientificPaperListProps> = (
  props
) => {
  return (
    <Container bg={'green.400'} h={'50%'} className={`${classes.container}`} >
      <div ></div>
      <h1>Newest scientific papers</h1>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {props.papers.map((paper: ScientificPaperModel) => (
          <ScientificPaperCard paper={paper}/>
        ))}
      </Grid>
    </Container>
  );
};

export default NewestScientificPaperList;
