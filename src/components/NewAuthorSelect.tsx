import { useRef, useState } from 'react';
import { AuthorSimpleModel } from '../model/AuthorSimpleModel';
import classes from '../style/Register.module.css';

type Props = {
  authors: AuthorSimpleModel[];
  addAuthorHandler:  any;
};

const NewAuthorSelect: React.FC<Props> = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorSimpleModel| null>(null);

  const selecthandler = (author: AuthorSimpleModel): any => {
    setSelectedAuthor(author);
  };

  return (
    <div className={`${classes.inputcontainer} ${classes.ic2}`}>
      <select id="author">
        {props.authors.map((author) => (
          <option key={author.id} value={author.id} onSelect={selecthandler({id: author.id, firstName: author.firstName, lastName: author.lastName})}>
            {author.firstName} {author.lastName}
          </option>
        ))}
      </select>
      <div className={classes.cut}></div>
      <label htmlFor="author" className={classes.placeholder}>
        Author
      </label>
      <button type="button" onClick={props.addAuthorHandler(selectedAuthor)}>
        Add author
      </button>
    </div>
  );
};

export default NewAuthorSelect;
