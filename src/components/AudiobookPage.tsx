import classes from '../style/ScientificPaperPage.module.css'
import { BorrowModel } from '../model/BorrowModel';
import { useCallback, useContext, useEffect, useState } from 'react';
import { sleep } from '../utils/Other';
import { BorrowApi } from '../lib/BorrowApi';
import AppContext from '../context/AppContext';
import ButtonSpinner from './spinners/ButtonSpinner';
import { BorrowRequestModel } from '../model/BorrowRequestModel';
import { AudiobookModel } from '../model/AudiobookModel';

type Props = {
  audiobook: AudiobookModel;
};

const AudioboookPage: React.FC<Props> = (props) => {
  const context = useContext(AppContext);
  const [borrowed, setBorrowed] = useState<boolean | null>(null);
  const [borrowedAccess, setBorrowedAccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchBorrowed = useCallback(async () => {
    setIsLoading(true);
    await sleep(2000);
    const data: any = await BorrowApi.getCurrentlyBorrowedPublicationsByUser(
      context.currentUser!.username
    );

    //if error
    if(data.message) {
      setError(data.message);
      setBorrowed(true);
      setIsLoading(false);
    }

    //if ok
    if (data) {
      const checkIfBorrowed = data.data.filter((pub: BorrowModel) => pub.publicationId === props.audiobook.id).length > 0;
      setBorrowed(checkIfBorrowed);
      console.log(data.data.filter((pub: any) => pub.publicationId === props.audiobook.id))
      if(checkIfBorrowed) setBorrowedAccess(data.data.filter((pub: any) => pub.publicationId === props.audiobook.id)[0].requiredReturnDate);
      setIsLoading(false)
    }
  },[context.currentUser, props.audiobook.id]);

  useEffect(() => {
    fetchBorrowed();
  }, [fetchBorrowed]);

  let isDisabled = isLoading || borrowed === true;

  const borrowHandler = async () => {
    console.log('helo')
    setError(null);
    if (borrowed) return;
    const requestBody: BorrowRequestModel = {
      publicationId : props.audiobook.id,
      publicationType: 'AUDIOBOOK',
      user: context.currentUser!.username,
    };
    const respond = await BorrowApi.sendBorrowRequest(requestBody);
    fetchBorrowed()
    }

  return (
    <div className={classes.container}>
      <h3>{props.audiobook.name}</h3>
      <h4>Short description: {props.audiobook.description}</h4>
      <h5>ISBN: {props.audiobook.isbn}</h5>
      <h5>Publishing House: {props.audiobook.publishingHouse}</h5>
      <h5>Lenght in minutes: {props.audiobook.length / 60}</h5>
      <h5>Published date: {props.audiobook.publishedDate}</h5>
      <h5>Adults restricted: {props.audiobook.isForAdults ? 'Adults only' : 'For everyone'}</h5>
      <h4>Authors:</h4>
      {props.audiobook.authors.map((aut) => (
        <p key={aut.id}>{aut.firstName + ' ' + aut.lastName}</p>
      ))}
      <button className={classes['button-28']} role="button" disabled={isDisabled} onClick={borrowHandler}>{isLoading ? <ButtonSpinner message='Checking'/> : 
      borrowed === true ? `You have access untill: ${borrowedAccess}` : 'Get access'}</button>
    </div>
  );
};

export default AudioboookPage;
