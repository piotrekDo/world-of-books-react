import { useCallback, useEffect, useState } from 'react';
import { AudiobookApi } from '../lib/AudiobookApi';
import { AudiobookModel } from '../model/AudiobookModel';
import { sleep } from '../utils/Other';

type ReturnType = {
    publications: AudiobookModel[];
    isLoading: boolean;
    error: string | null;
}

function useFetchAudiobooks(sleepTime: number): ReturnType {
  const [publications, setPublications] = useState<AudiobookModel[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  const fetch = useCallback(async () => {
    setError(null);
    setIsloading(true);
    await sleep(sleepTime)
    const data: any = await AudiobookApi.getAllAudiobooks();
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
    publications: publications,
    isLoading: isLoading,
    error: error
  }
}


export default useFetchAudiobooks;
