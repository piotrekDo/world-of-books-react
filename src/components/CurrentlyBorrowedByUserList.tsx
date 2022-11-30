import { useCallback, useEffect, useState } from 'react';
import { BorrowApi } from '../lib/BorrowApi';
import { BorrowModel } from '../model/BorrowModel';
import { sleep } from '../utils/Other';
import PrimarySpinner from './spinners/PrimarySpinner';

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

    if(data.message) {
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
      <section id="currentlyBorrowedSection">
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
          <ul>
            {borrowed!.map((borrowed) => (
              <p key={borrowed.id}>
                {borrowed.publicationName}, {borrowed.requiredReturnDate}
              </p>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default CurrentlyBorrowedByUserList;
