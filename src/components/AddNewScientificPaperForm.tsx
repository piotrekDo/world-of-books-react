import { Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import useFetchAuthors from '../hooks/UseFetchAuthors';
import useInput from '../hooks/UseInput';
import { ScientificPaperApi } from '../lib/ScientificpaperApi';
import { AddNewScientificPaperModel } from '../model/AddNewScientificPaperModel';
import { AuthorSimpleModel } from '../model/AuthorSimpleModel';
import classes from '../style/Register.module.css';
import { sleep } from '../utils/Other';
import PrimarySpinner from './spinners/PrimarySpinner';

const AddNewScientificPaperForm = () => {
  const {
    authors: authors,
    isLoading: isLoadingAuthors,
    error: errorAuthors,
  } = useFetchAuthors(0);
  const [currentlySelected, setCurrentlySelected] =
    useState<AuthorSimpleModel>();

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangedhandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameResetHandler
   } =  useInput((text) => text.trim().length > 0);

   const {
    value: enteredDesc,
    isValid: descIsValid,
    hasError: descHasError,
    valueChangeHandler: descChangedhandler,
    inputBlurHandler: descInputBlurHandler,
    reset: descResetHandler
   } =  useInput((text) => text.trim().length > 0);

   const {
    value: enteredPages,
    isValid: pagesIsValid,
    hasError: pagesHasError,
    valueChangeHandler: pagesChangedhandler,
    inputBlurHandler: pagesInputBlurHandler,
    reset: pagesResetHandler
   } =  useInput((pages) => +pages > 0);

   const {
    value: enteredUniversity,
    isValid: universityIsValid,
    hasError: universityHasError,
    valueChangeHandler: universityChangedhandler,
    inputBlurHandler: universityInputBlurHandler,
    reset: universityResetHandler
   } =  useInput((text) => text.trim().length > 0);

   const [authorsSelected, setAuthorsSelected] = useState<AuthorSimpleModel[]>([]);
   const [fieldSelected, setFieldSelected] = useState<string>();
   const [dateSeleted, setDateSelected] = useState<string>();
   const [isForAdult, setIsforAdult] = useState<boolean>(false);
   const [isFormSubmitting, setisFormSubmitting] = useState<boolean>(false);
   const [submitError, setSubmitError] = useState<string>();
   const [formSuccess, setFormSuccess] = useState<boolean>(false)

   const isFormValid = nameIsValid && descIsValid && authorsSelected.length > 0 && fieldSelected && pagesIsValid && dateSeleted && universityIsValid;


  const addAuthorHandler = () => {
    if (currentlySelected && authorsSelected.indexOf(currentlySelected) === -1)
      setAuthorsSelected((prev) => prev.concat(currentlySelected));
  };

  const authorChangeHandler = (event: any) => {
    const author = authors.find((a) => a.id === +event.target.value);
    setCurrentlySelected(author);
  };

  const fieldChangeHandler = (event: any) => {
    setFieldSelected(event.target.value);
  }

  const dateChangeHandler = (event: any) => {
    setDateSelected(event.target.value);
    console.log(event.target.value)
  }

  const adultChangeChandler = (event : any) => {
    const value = event.target.value === 'true';
    setIsforAdult(value);
  }

  const resetForm = () => {
    nameResetHandler();
    descResetHandler();
    pagesResetHandler();
    universityResetHandler();
    setAuthorsSelected([]);
    setFieldSelected(undefined);
    setDateSelected(undefined);
    setIsforAdult(false);
  }

  const onSubmitHandler = async (event: any) => {
    if(!isFormValid) return;
    setisFormSubmitting(true);
    setFormSuccess(false);
    setSubmitError(undefined);
    event.preventDefault();
    await sleep(2000);
    const newPaper: AddNewScientificPaperModel = {
        authors: authorsSelected,
        description: enteredDesc,
        field: fieldSelected,
        forAdults: isForAdult,
        name: enteredName,
        pages: +enteredPages,
        publishedDate: dateSeleted,
        university: enteredUniversity
    }
    const response: any = await ScientificPaperApi.addNewScientificPaper(newPaper);
    console.log(response.status);

    if(response.status === 200) {
      resetForm();
      setisFormSubmitting(false);
      setFormSuccess(true);
      return;
    }

    if(response.response.status === 400){
        setSubmitError('Invalid scientific paper submitted');
        setisFormSubmitting(false);
        return;
    }
  }


  return (
    <>
    <div
      className={`${classes.content} ${classes.form} ${classes['form__new-paperwork']}`}
    >
      <form onSubmit={onSubmitHandler}>
        <div className={classes.title}>Add new scientific paper</div>
        {formSuccess && <div style={{color: 'aquamarine'}} className={classes.subtitle}>Scientific paper added successfully</div>}
        {submitError && <div style={{color: 'red'}} className={classes.title}>{submitError}</div>}
        <div className={`${classes.inputcontainer} ${classes.ic1}`}>
          <input
            id="name"
            name="name"
            className={classes.input}
            type="text"
            placeholder=" "
            value={enteredName}
            onChange={nameChangedhandler}
            onBlur={nameInputBlurHandler}
          />
          <div className={classes.cut}></div>
          <label htmlFor="name" className={classes.placeholder}>
            Name
          </label>
        </div>
        <div className={`${classes.inputcontainer} ${classes.ic1}`}>
          <input
            id="description"
            name="description"
            className={classes.input}
            type="text"
            placeholder=" "
            value={enteredDesc}
            onChange={descChangedhandler}
            onBlur={descInputBlurHandler}
          />
          <div className={classes.cut}></div>
          <label htmlFor="description" className={classes.placeholder}>
            Description
          </label>
        </div>
        <div className={`${classes.inputcontainer} ${classes.ic2}`}>
          <select id="author" onChange={authorChangeHandler} defaultValue={'Select author'}>
            <option disabled>
              Select author
            </option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.firstName} {author.lastName}
              </option>
            ))}
          </select>
          <div className={classes.cut}></div>
          <label htmlFor="author" className={classes.placeholder}>
            Author
          </label>
          <button type="button" onClick={addAuthorHandler}>
            Add author
          </button>
        </div>
        <div className={`${classes.inputcontainer} ${classes.ic2}`}>
          <select id="field" defaultValue={'Select field'} onChange={fieldChangeHandler}>
            <option disabled>Select field</option>
            <option value={'ASTRONOMY'}>astronomy</option>
            <option value={'CHEMISTRY'}>Chemistry</option>
            <option value={'PHYSIC'}>Physic</option>
            <option value={'HEALTH'}>Health</option>
            <option value={'NATURE'}>Nature</option>
            <option value={'MATHEMATICS'}>Mathematics</option>
            <option value={'COMPUTER_SCIENCE'}>Computer science</option>
          </select>
          <div className={classes.cut}></div>
          <label htmlFor="author" className={classes.placeholder}>
            Select field
          </label>
        </div>
        <div className={`${classes.inputcontainer} ${classes.ic1}`}>
          <input
            id="pages"
            name="pages"
            className={classes.input}
            type="number"
            placeholder=" "
            min={1}
            value={enteredPages}
            onChange={pagesChangedhandler}
            onBlur={pagesInputBlurHandler}
          />
          <div className={classes.cut}></div>
          <label htmlFor="description" className={classes.placeholder}>
            Pages
          </label>
        </div>
        <div className={`${classes.inputcontainer} ${classes.ic1}`}>
          <input onChange={dateChangeHandler}
            id="pages"
            name="pages"
            className={classes.input}
            type="date"
            placeholder=" "
          />
          <div className={classes.cut}></div>
          <label htmlFor="description" className={classes.placeholder}>
            Published date
          </label>
        </div>
        <div className={`${classes.inputcontainer} ${classes.ic1}`}>
          <input
            id="university"
            name="university"
            className={classes.input}
            type="text"
            placeholder=" "
            value={enteredUniversity}
            onChange={universityChangedhandler}
            onBlur={universityInputBlurHandler}
          />
          <div className={classes.cut}></div>
          <label htmlFor="university" className={classes.placeholder}>
            University
          </label>
        </div>
        <div className={`${classes.inputcontainer} ${classes.ic2}`}>
          <select id="forAdults" defaultValue={'No'} onChange={adultChangeChandler}>
            <option value={'false'}>No</option>
            <option value={'true'}>Yes</option>
          </select>
          <div className={classes.cut}></div>
          <label htmlFor="author" className={classes.placeholder}>
           For adults only?
          </label>
        </div>
        {isFormValid && !isFormSubmitting && <button className={classes.submit}>Submit</button>}
        {!isFormValid && <p>Please enter correct data</p>}
        {isFormSubmitting && <PrimarySpinner message='Submitting...'/>}
      </form>
    </div> 
    <div className={classes.authorsList}>
        <h3 >Selected authors</h3>
        {<div >{authorsSelected.map(author => <p key={author.id}>{author.firstName} {author.lastName}</p>)}</div>}
    </div>
    </>
  );
};

export default AddNewScientificPaperForm;
