import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import ScientificPaperPage from '../components/ScientificPaperPage';
import { ScientificPaperApi } from '../lib/ScientificpaperApi';

const ScientificPaper: React.FC = (props) => {
  const publicationData = useLoaderData();
  return(
    <Suspense fallback={<p>Loading...</p>}>
    <Await
      resolve={publicationData}
      errorElement={<p>Error loading blog posts.</p>}
    >
      {(loadedPaper) => <ScientificPaperPage paper={loadedPaper.data}/>}
    </Await>
  </Suspense>
  )
};
export default ScientificPaper;

export function loader({ params }: any) {
  const id = params.id;
  return ScientificPaperApi.getScientificPaper(id);
}
