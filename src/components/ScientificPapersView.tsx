import { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import useFetchPapers from '../hooks/UseFetchPapers';
import classes from '../style/ScientificPaperView.module.css';
import AddNewScientificPaperForm from './AddNewScientificPaperForm';
import ScientificPaperCard from './ScientificPaperCard';
import PrimarySpinner from './spinners/PrimarySpinner';

const ScientificPaperView = () => {
  const context = useContext(AppContext);
  const isAdmin = !context.currentUser
    ? false
    : context.currentUser?.roles.indexOf('admin') > -1;

  const {
    publications: papers,
    isLoading: papersLoading,
    error: papersError,
  } = useFetchPapers(2000);
  const [addingMode, setAddingmode] = useState(false);
  const modeSwitchHandler = () => {
    setAddingmode(!addingMode);
  };

  return (
    <section className={classes.main}>
      <div className={classes['header-container']}>
        <h1>Avalible scientific papers</h1>
        {isAdmin && (
          <button
            className={`${classes['button-28']}`}
            type="button"
            disabled={papersLoading}
            onClick={modeSwitchHandler}
          >
            {addingMode ? 'Return to view' : 'Add new scirntific paper'}
          </button>
        )}
      </div>
      {papersLoading && (
        <div className={classes.spinner}>
          <PrimarySpinner message="Getting scientific papers" />
        </div>
      )}
      <div className={classes.container}>
        {!papersLoading && !papersError && !addingMode && (
          <div className={classes.flexParent}>
            {papers.map((paper) => (
              <div className={classes.flexChild} key={paper.id}>
                <ScientificPaperCard paper={paper} />
              </div>
            ))}
          </div>
        )}
        {!papersLoading && papersError && <h3>{papersError}</h3>}
        {addingMode && <AddNewScientificPaperForm />}
      </div>
    </section>
  );
};

export default ScientificPaperView;
