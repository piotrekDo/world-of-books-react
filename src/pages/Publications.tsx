import { useContext } from 'react';
import AudiobookView from '../components/AudiobookView';
import ScientificPaperView from '../components/ScientificPapersView';
import AppContext from '../context/AppContext';
import classes from '../style/Publications.module.css';

const Publications: React.FC = (props) => {
  const context = useContext(AppContext);
  const isAdmin = !context.currentUser ? false : context.currentUser?.roles.indexOf('admin') > -1;
  
  return (
    <section>
      <ScientificPaperView/>
      <AudiobookView/>
    </section>
  );
};

export default Publications;
