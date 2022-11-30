import { useCallback, useEffect, useState } from 'react';
import { BorrowApi } from '../lib/BorrowApi';
import { BorrowModel } from '../model/BorrowModel';
import PrimarySpinner from './spinners/PrimarySpinner';

type ComponentProps = {
  username: string;
};

const BorrowHistoryByUser: React.FC<ComponentProps> = (props) => {
  const [history, setHistory] = useState<BorrowModel[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isHistoryLoading = !history ? true : false;

  const fetchHistory = useCallback(async () => {
    await sleep(3000);
    const data: any = await BorrowApi.getPublicationsBorrowHistoryByUser(
      props.username
    );

    if (data.message) {
      setError(data.message);
      setHistory([]);
    }

    if (data.data) {
      setHistory(data.data);
    }
  }, [props.username]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <>
      <section id="currentlyBorrowedSection">
        {isHistoryLoading && (
          <div>
            <PrimarySpinner message="Loading borrowed publicaions history" />
          </div>
        )}
        {!isHistoryLoading && error && <p>{error}</p>}
        {!isHistoryLoading && history!.length === 0 && !error && (
          <p>you haven't borrow any publications</p>
        )}
        {!isHistoryLoading && history!.length > 0 && (
          <ul>
            {history!.map((history) => (
              <p key={history.id}>
                {history.publicationName}, {history.requiredReturnDate}
              </p>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default BorrowHistoryByUser;

function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}
