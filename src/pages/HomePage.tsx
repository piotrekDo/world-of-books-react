import { Container } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import classes from '../style/HomePage.module.css';
import { ScientificPaperApi } from '../lib/ScientificpaperApi';
import { AudiobookApi } from '../lib/AudiobookApi';
import NewestScientificPaperList from '../components/NewestScientificPaperList';
import NewestAudiobooksList from '../components/NewestAudiobooksList';

const HomePage: React.FC = () => {
  const loaderData: any = useLoaderData();

  return (
    <>
      <section>
        <Container padding={'50px'} centerContent>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={loaderData.posts}
              errorElement={<p>Error loading blog posts.</p>}
            >
              {(loadedData) => {
                const papers = loadedData.papers.data.content;
                const audiobooks = loadedData.audiobooks.data;
                return (
                  <>
                    <section className={classes.mainSectionPapers}>
                      <NewestScientificPaperList papers={papers} />
                    </section>
                    <section className={classes.mainSectionAudiobooks}>
                      <NewestAudiobooksList audiobooks={audiobooks} />
                    </section>
                  </>
                );
              }}
            </Await>
          </Suspense>
        </Container>
      </section>
    </>
  );
};

export default HomePage;

export async function loader() {
  return defer({
    posts: {
      papers: await ScientificPaperApi.getNewestScientificPapers(),
      audiobooks: await AudiobookApi.getNewestAudiobooks(),
    },
  });
}
