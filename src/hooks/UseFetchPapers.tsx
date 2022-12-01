import { useCallback, useEffect, useState } from 'react';
import { ScientificPaperApi } from '../lib/ScientificpaperApi';
import { ScientificPaperModel } from '../model/ScientificPaperModel';
import { sleep } from '../utils/Other';

type ReturnType = {
    publications: ScientificPaperModel[];
    isLoading: boolean;
    error: string | null;
}

function useFetchPapers(sleepTime: number): ReturnType {
  const [publications, setPublications] = useState<ScientificPaperModel[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  const fetch = useCallback(async () => {
    setError(null);
    setIsloading(true);
    await sleep(sleepTime)
    const data: any = await ScientificPaperApi.getAllScientificPapers();
    //if error
    if(data.message) {
        setError(data.message);
        setIsloading(false);
      }
    //if ok
    if (data) {
        setPublications(data.data.content)
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


export default useFetchPapers;
