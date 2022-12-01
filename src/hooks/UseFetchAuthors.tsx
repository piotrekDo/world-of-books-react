import { useCallback, useEffect, useState } from 'react';
import { AuthorsApi } from '../lib/AuthorsApi';
import { AuthorSimpleModel } from '../model/AuthorSimpleModel';
import { sleep } from '../utils/Other';

type ReturnType = {
    authors: AuthorSimpleModel[];
    isLoading: boolean;
    error: string | null;
}

function useFetchAuthors(sleepTime: number): ReturnType {
  const [publications, setPublications] = useState<AuthorSimpleModel[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  const fetch = useCallback(async () => {
    setError(null);
    setIsloading(true);
    await sleep(sleepTime)
    const data: any = await AuthorsApi.getAuthors();
    //if error
    if(data.message) {
        setError(data.message);
        setIsloading(false);
      }
    //if ok
    if (data) {
        setPublications(data.data)
        setIsloading(false)
      }
  }, [sleepTime]);

  useEffect(() => {
    fetch()
  }, [fetch]);

  return {
    authors: publications,
    isLoading: isLoading,
    error: error
  }
}


export default useFetchAuthors;
