import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import ScientificPaperPage from '../components/ScientificPaperPage';
import { AudiobookApi } from '../lib/AudiobookApi';
import { ScientificPaperApi } from '../lib/ScientificpaperApi';
import classes from '../style/AudioBookPage.module.css'

const AudioBookPage: React.FC = (props) => {
  const publicationData = useLoaderData();
  return (
    <section className={classes.main}>
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={publicationData}
          errorElement={<p>Error loading blog posts.</p>}
        >
          {(loadedPaper) => <ScientificPaperPage paper={loadedPaper.data} />}
        </Await>
      </Suspense>
    </section>
  );
};
export default AudioBookPage;

export function loader({ params }: any) {
  const id = params.id;
  return AudiobookApi.getAudiobook(id);
}
