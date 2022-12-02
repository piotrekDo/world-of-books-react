import { useCallback, useEffect, useState } from 'react';
import { BorrowApi } from '../lib/BorrowApi';
import { BorrowModel } from '../model/BorrowModel';
import { publicationTypeParser, sleep } from '../utils/Other';
import PrimarySpinner from './spinners/PrimarySpinner';
import classes from '../style/CurrentlyBorrowedByUserList.module.css';
import CalendarDate from './CalendarDate';
import { Link } from 'react-router-dom';

type ComponentProps = {
  username: string;
};

const CurrentlyBorrowedByUserList: React.FC<ComponentProps> = (props) => {
  const [borrowed, setBorrowed] = useState<BorrowModel[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isBorrowedLoading = !borrowed ? true : false;

  const fetchBorrowed = useCallback(async () => {
    await sleep(2000);
    const data: any = await BorrowApi.getCurrentlyBorrowedPublicationsByUser(
      props.username
    );

    if (data.message) {
      setError(data.message);
      setBorrowed([]);
    }

    if (data.data) {
      setBorrowed(data.data);
    }
  }, [props.username]);

  useEffect(() => {
    fetchBorrowed();
  }, [fetchBorrowed]);

  return (
    <>
      <section id="currentlyBorrowedSection" className={classes.section}>
        {isBorrowedLoading && (
          <div>
            <PrimarySpinner message="Loading borrowed publicaions" />
          </div>
        )}
        {!isBorrowedLoading && error && <p>{error}</p>}
        {!isBorrowedLoading && borrowed!.length === 0 && !error && (
          <p>No currently borrowed publications</p>
        )}
        {!isBorrowedLoading && borrowed!.length > 0 && (
          <ul className={classes.tilesWrap}>
            {borrowed?.map((borrowed) => (
              <li key={borrowed.id}>
                <h2>
                  <CalendarDate date={borrowed.requiredReturnDate} />
                </h2>
                <h3>{borrowed.publicationName}</h3>
                <p>{publicationTypeParser(borrowed.publicationType)}</p>
                <button>
                  <Link
                    className={classes.link}
                    to={
                      borrowed.publicationType === 'AUDIOBOOK'
                        ? `/audiobook/${borrowed.publicationId}`
                        : `/paper/${borrowed.publicationId}`
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

export default CurrentlyBorrowedByUserList;
