import useFetchPublications from '../hooks/UseFetchPublications';
import classes from '../style/ScientificPaperView.module.css';
import ScientificPaperCard from './ScientificPaperCard';
import PrimarySpinner from './spinners/PrimarySpinner';

const ScientificPaperView = () => {
 const {
    publications: papers,
    isLoading: papersLoading,
    error: papersError
 } = useFetchPublications(2000) ;

 console.log(papers);

  return (
    <section className={classes.main}>
      <h1>Avalible scientific papers</h1>
        {papersLoading && <div className={classes.spinner}><PrimarySpinner message='Getting scientific papers'/></div>}
      <div className={classes.container}>
        {(!papersLoading && !papersError) && <div className={classes.flexParent}>
            {papers.map(paper => <div className={classes.flexChild} key={paper.id}><ScientificPaperCard paper={paper}/></div>)}</div>}
        {(!papersLoading && papersError) && <h3>{papersError}</h3>}
      </div>
    </section>
  );
};

export default ScientificPaperView;
