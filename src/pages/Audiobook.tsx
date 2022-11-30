import { Suspense} from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { AudiobookApi } from '../lib/AudiobookApi';
import classes from '../style/AudioBookPage.module.css'
import AudioboookPage from '../components/AudiobookPage';

const AudioBook: React.FC = (props) => {

  const publicationData = useLoaderData();
  return (
    <section className={classes.main}>
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={publicationData}
          errorElement={<p>Error loading blog posts.</p>}
        >
          {(loadedPaper) => <AudioboookPage audiobook={loadedPaper.data} />}
        </Await>
      </Suspense>
    </section>
  );
};
export default AudioBook;

export function loader({ params }: any) {
  const id = params.id;
  return AudiobookApi.getAudiobook(id);
}
