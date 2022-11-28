import { ScientificPaperModel } from '../model/ScientificPaperModel';

type ScientificPaperPageProps = {
  paper: ScientificPaperModel;
};

const ScientificPaperPage: React.FC<ScientificPaperPageProps> = (props) => {
    console.log(props.paper)
  return (
    <div>
        <h3>{props.paper.name}</h3>
        <h4>{props.paper.description}</h4>
        {props.paper.authors.map(aut=> <p key={aut.id}>{aut.firstName + ' ' + aut.lastName}</p>)}
    </div>
  );
};

export default ScientificPaperPage;
