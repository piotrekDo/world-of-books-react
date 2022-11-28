import { Container, Grid, GridItem } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import classes from '../style/HomePage.module.css';
import BookCard from '../components/BookCard';
import { ScientificPaperApi } from '../lib/ScientificpaperApi';
import { ScientificPaperModel } from '../model/ScientificPaperModel';

const HomePage: React.FC = () => {
  const loaderData: any = useLoaderData();

  return (
    <>
      <section className={classes.mainSection}>
        <Container padding={'50px'} centerContent>
          <h3>Newest scientific papers</h3>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={loaderData.posts}
              errorElement={<p>Error loading blog posts.</p>}
            >
              {(loadedPosts) => {
                console.log(loadedPosts.data.content);
                return (
                  <Container bg={'green.400'}>
                    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                      {loadedPosts.data.content.map(
                        (paper: ScientificPaperModel) => (
                          <BookCard
                            key={paper.id}
                            id={paper.id}
                            name={paper.name}
                            authors={paper.authors}
                          />
                        )
                      )}
                    </Grid>
                  </Container>
                );
              }}
            </Await>
          </Suspense>
        </Container>
      </section>
      <section className={classes.mainSection}>
        <Container padding={'50px'} centerContent>
          <h3>Newest Audiobooks</h3>
        </Container>
      </section>
    </>
  );
};

export default HomePage;

export async function loader() {
  return defer({ posts: ScientificPaperApi.getNewestScientificPapers() });
}
