import { useCallback, useEffect, useState } from 'react';
import { BorrowApi } from '../lib/BorrowApi';
import { BorrowModel } from '../model/BorrowModel';
import CalendarDate from './CalendarDate';
import PrimarySpinner from './spinners/PrimarySpinner';
import classes from '../style/CurrentlyBorrowedByUserList.module.css';
import { Link } from 'react-router-dom';
import { publicationTypeParser } from '../utils/Other';

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
      <section id="currentlyBorrowedSection" className={classes.section}>
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
          <ul className={classes.tilesWrap}>
            {history?.map((history) => (
              <li key={history.id}>
                <h2>
                  <CalendarDate date={history.requiredReturnDate} />
                </h2>
                <h3>{history.publicationName}</h3>
                <p>{publicationTypeParser(history.publicationType)}</p>
                <button>
                  <Link
                    className={classes.link}
                    to={
                      history.publicationType === 'AUDIOBOOK'
                        ? `/audiobook/${history.publicationId}`
                        : `/paper/${history.publicationId}`
                    }
                  >
                    See more
                  </Link>
                </button>
              </li>
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
