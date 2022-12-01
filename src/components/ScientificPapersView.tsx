import { useState } from 'react';
import useFetchPapers from '../hooks/UseFetchPapers';
import classes from '../style/ScientificPaperView.module.css';
import AddNewScientificPaperForm from './AddNewScientificPaperForm';
import ScientificPaperCard from './ScientificPaperCard';
import PrimarySpinner from './spinners/PrimarySpinner';

const ScientificPaperView = () => {
  const {
    publications: papers,
    isLoading: papersLoading,
    error: papersError,
  } = useFetchPapers(2000);
  const [addingMode, setAddingmode] = useState(false);
  console.log(addingMode);
  const modeSwitchHandler = () => {
    setAddingmode(!addingMode);
  };

  return (
    <section className={classes.main}>
      <h1>Avalible scientific papers</h1>
      {/* <button type="button" disabled={papersLoading} onClick={modeSwitchHandler}>
        Add new
      </button> */}
      {/* {papersLoading && (
        <div className={classes.spinner}>
          <PrimarySpinner message="Getting scientific papers" />
        </div>
      )} */}
      <div className={classes.container}>
        {/* {!papersLoading && !papersError && !addingMode && (
          <div className={classes.flexParent}>
            {papers.map((paper) => (
              <div className={classes.flexChild} key={paper.id}>
                <ScientificPaperCard paper={paper} />
              </div>
            ))}
          </div>
        )}
        {!papersLoading && papersError && <h3>{papersError}</h3>}
        {addingMode && <AddNewScientificPaperForm/>} */}
        <AddNewScientificPaperForm/>
      </div>
    </section>
  );
};

export default ScientificPaperView;
