import { useCallback, useEffect, useState } from 'react';
import { BorrowApi } from '../lib/BorrowApi';
import { BorrowModel } from '../model/BorrowModel';
import PrimarySpinner from './spinners/PrimarySpinner';

type ComponentProps = {
  username: string;
};

const CurrentlyBorrowedByUserList: React.FC<ComponentProps> = (props) => {
  const [borrowed, setBorrowed] = useState<BorrowModel[] | null>(null);

  const isBorrowedLoading = !borrowed ? true : false;

  const fetchBorrowed = useCallback(async () => {
    await sleep(2000);
    const data = await BorrowApi.getCurrentlyBorrowedPublicationsByUser(
      props.username
    );
    console.log(data);
    if (data.data) {
      setBorrowed(data.data);
    }
  }, [props.username]);

  useEffect(() => {
    fetchBorrowed();
  }, [fetchBorrowed]);

  return (
    <>
      <section id='currentlyBorrowedSection'>
        {isBorrowedLoading && (
          <div>
            <PrimarySpinner message="Loading borrowed publicaions" />
          </div>
        )}
        {!isBorrowedLoading && borrowed!.length === 0 && (
          <p>No bubs borrowed</p>
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

function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}
