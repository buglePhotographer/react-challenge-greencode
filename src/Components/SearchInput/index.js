import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

function SearchInput(props) {
  const classes = useStyles();
  const { searchCriteria, filters, setFilters } = props;
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = e => {
    setSearchTerm(e.target.value);
    setFilters({...filters, [searchCriteria] : e.target.value });
  };

  return (
    <TextField
      id="outlined-with-placeholder"
      placeholder={`Search by ${searchCriteria}`}
      className={classes.textField}
      margin="normal"
      variant="outlined"
      value={searchTerm}
      onChange={handleInputChange}
    />
  )
}

export default SearchInput;