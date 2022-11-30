import { useCallback, useEffect, useState } from 'react';
import { BorrowApi } from '../lib/BorrowApi';
import { BorrowModel } from '../model/BorrowModel';
import PrimarySpinner from './spinners/PrimarySpinner';

type ComponentProps = {
  username: string;
};

const BorrowHistoryByUser: React.FC<ComponentProps> = (props) => {
  const [history, setHistory] = useState<BorrowModel[] | null>(null);

  const isHistoryLoading = !history ? true : false;


  const fetchHistory = useCallback(async () => {
    await sleep(3000);
    const data = await BorrowApi.getPublicationsBorrowHistoryByUser(
      props.username
    );
    console.log(data);
    if (data.data) {
      setHistory(data.data);
    }
  }, [props.username]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <>
      <section id='currentlyBorrowedSection'>
        {isHistoryLoading && (
          <div>
            <PrimarySpinner message="Loading borrowed publicaions history" />
          </div>
        )}
        {!isHistoryLoading && history!.length === 0 && (
          <p>No bubs borrowed</p>
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
