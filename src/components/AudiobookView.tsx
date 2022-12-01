import useFetchAudiobooks from '../hooks/UseFetchAudiobooks';
import classes from '../style/AudiobookView.module.css';
import AudiobookCard from './AudiobookCard';
import PrimarySpinner from './spinners/PrimarySpinner';

const AudiobookView = () => {
 const {
    publications: papers,
    isLoading: papersLoading,
    error: papersError
 } = useFetchAudiobooks(3500) ;

 console.log(papers);

  return (
    <section className={classes.main}>
      <h1>Avalible audiobooks</h1>
        {papersLoading && <div className={classes.spinner}><PrimarySpinner message='Getting audiobooks'/></div>}
      <div className={classes.container}>
        {(!papersLoading && !papersError) && <div className={classes.flexParent}>
            {papers.map(audiobook => <div className={classes.flexChild} key={audiobook.id}><AudiobookCard audiobook={audiobook}/></div>)}</div>}
        {(!papersLoading && papersError) && <h3>{papersError}</h3>}
      </div>
    </section>
  );
};

export default AudiobookView;
