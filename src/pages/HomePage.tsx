import { Container } from '@chakra-ui/react';
import React, { Suspense, useContext } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import classes from '../style/HomePage.module.css';
import { ScientificPaperApi } from '../lib/ScientificpaperApi';
import { AudiobookApi } from '../lib/AudiobookApi';
import NewestScientificPaperList from '../components/NewestScientificPaperList';
import NewestAudiobooksList from '../components/NewestAudiobooksList';
import HomePageRegisterSection from '../components/HomePageRegisterSection';
import KnowlageAtFingertips from '../components/KnowlageAtFingertips';
import HomePageWelcomeSection from '../components/HomePageWelcomeSection';
import AppContext from '../context/AppContext';

const HomePage: React.FC = () => {
  const context = useContext(AppContext);
  const loaderData: any = useLoaderData();

  const user = context.currentUser;

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
                    {!user && (
                      <>
                        <section className={classes.mainSectionWelcome}>
                          <HomePageWelcomeSection />
                        </section>
                        <section className={classes.mainSectionKnowlage}>
                          <KnowlageAtFingertips />
                        </section>
                      </>
                    )}
                    <section className={classes.mainSectionPapers}>
                      <NewestScientificPaperList papers={papers} />
                    </section>
                    <section className={classes.mainSectionAudiobooks}>
                      <NewestAudiobooksList audiobooks={audiobooks} />
                    </section>
                    {!user && (
                      <section className={classes.register}>
                        <HomePageRegisterSection />
                      </section>
                    )}
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
