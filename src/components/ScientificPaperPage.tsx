import { ScientificPaperModel } from '../model/ScientificPaperModel';
import { fieldParser } from '../utils/ScientificPaperFieldParser'
import classes from '../style/ScientificPaperPage.module.css'
import { BorrowModel } from '../model/BorrowModel';
import { useCallback, useContext, useEffect, useState } from 'react';
import { sleep } from '../utils/Other';
import { BorrowApi } from '../lib/BorrowApi';
import AppContext from '../context/AppContext';
import ButtonSpinner from './spinners/ButtonSpinner';
import { BorrowRequestModel } from '../model/BorrowRequestModel';

type ScientificPaperPageProps = {
  paper: ScientificPaperModel;
};

const ScientificPaperPage: React.FC<ScientificPaperPageProps> = (props) => {
  const context = useContext(AppContext);
  const [borrowed, setBorrowed] = useState<boolean | null>(null);
  const [borrowedAccess, setBorrowedAccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const restricted = props.paper.forAdults && !context.currentUser?.adult;

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
      const checkIfBorrowed = data.data.filter((pub: BorrowModel) => pub.publicationId === props.paper.id).length > 0;
      setBorrowed(checkIfBorrowed);
      console.log(data.data.filter((pub: any) => pub.publicationId === props.paper.id))
      if(checkIfBorrowed) setBorrowedAccess(data.data.filter((pub: any) => pub.publicationId === props.paper.id)[0].requiredReturnDate);
      setIsLoading(false)
    }
  },[context.currentUser, props.paper.id]);

  useEffect(() => {
    fetchBorrowed();
  }, [fetchBorrowed]);

  let isDisabled = isLoading || borrowed === true;

  const borrowHandler = async () => {
    console.log('helo')
    setError(null);
    if (borrowed) return;
    const requestBody: BorrowRequestModel = {
      publicationId : props.paper.id,
      publicationType: 'SCIENTIFIC_PAPER',
      user: context.currentUser!.username,
    };
    const respond = await BorrowApi.sendBorrowRequest(requestBody);
    fetchBorrowed()
    }

  return (
    <div className={classes.container}>
      <h3>{props.paper.name}</h3>
      <h4>Short description: {props.paper.description}</h4>
      <h5>Field of study: {fieldParser(props.paper.field)}</h5>
      <h5>University: {props.paper.university}</h5>
      <h5>Pages: {props.paper.pages}</h5>
      <h5>Published date: {props.paper.publishedDate}</h5>
      <h5>Adults restricted: {props.paper.forAdults ? 'Adults only' : 'For everyone'}</h5>
      <h4>Authors:</h4>
      {props.paper.authors.map((aut) => (
        <p key={aut.id}>{aut.firstName + ' ' + aut.lastName}</p>
      ))}
      {!restricted &&       <button className={classes['button-28']} role="button" disabled={isDisabled} onClick={borrowHandler}>{isLoading ? <ButtonSpinner message='Checking'/> : 
      borrowed === true ? `You have access untill: ${borrowedAccess}` : 'Get access'}</button>}
      {restricted &&       <button className={classes['button-28']} role="button" disabled>Presented publication is meant for adults only</button>}
    </div>
  );
};

export default ScientificPaperPage;
