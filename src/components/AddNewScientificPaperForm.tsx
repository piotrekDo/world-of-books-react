import { useState } from 'react';
import useFetchAuthors from '../hooks/UseFetchAuthors';
import { AuthorSimpleModel } from '../model/AuthorSimpleModel';
import classes from '../style/Register.module.css';

const AddNewScientificPaperForm = () => {
  const {
    authors: authors,
    isLoading: isLoadingAuthors,
    error: errorAuthors,
  } = useFetchAuthors(0);
  const [currentlySelected, setCurrentlySelected] =
    useState<AuthorSimpleModel>();
  const [authorsSelected, setAuthorsSelected] = useState<AuthorSimpleModel[]>(
    []
  );

  console.log(authorsSelected)

  const addAuthorHandler = () => {
    if (currentlySelected && authorsSelected.indexOf(currentlySelected) === -1)
      setAuthorsSelected((prev) => prev.concat(currentlySelected));
  };

  const selecthandler = (event: any) => {
    const author = authors.find((a) => a.id === +event.target.value);
    setCurrentlySelected(author);
  };

  console.log(currentlySelected);

  return (
    <>
    <div
      className={`${classes.content} ${classes.form} ${classes['form__new-paperwork']}`}
    >
      <form>
        <div className={classes.title}>Add new scientific paper</div>
        <div className={`${classes.inputcontainer} ${classes.ic1}`}>
          <input
            id="name"
            name="name"
            className={classes.input}
            type="text"
            placeholder=" "
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
          />
          <div className={classes.cut}></div>
          <label htmlFor="description" className={classes.placeholder}>
            Description
          </label>
        </div>
        <div className={`${classes.inputcontainer} ${classes.ic2}`}>
          <select id="author" onChange={selecthandler} defaultValue={'Select author'}>
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
          <select id="field" defaultValue={'Select field'}>
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
          />
          <div className={classes.cut}></div>
          <label htmlFor="description" className={classes.placeholder}>
            Pages
          </label>
        </div>
        <div className={`${classes.inputcontainer} ${classes.ic1}`}>
          <input
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
          />
          <div className={classes.cut}></div>
          <label htmlFor="university" className={classes.placeholder}>
            University
          </label>
        </div>
        <div className={`${classes.inputcontainer} ${classes.ic2}`}>
          <select id="forAdults" defaultValue={'No'}>
            <option value={'false'}>No</option>
            <option value={'true'}>Yes</option>
          </select>
          <div className={classes.cut}></div>
          <label htmlFor="author" className={classes.placeholder}>
           For adults only?
          </label>
        </div>
        <button className={classes.submit}>Submit</button>
        <div style={{ marginTop: '30px' }}>Almost there</div>
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
