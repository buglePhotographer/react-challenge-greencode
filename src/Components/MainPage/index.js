import React, { useState, useEffect, Fragment } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import FilteredList from '../FilteredList';
import SearchInput from '../SearchInput';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        height: '6vh'
    },
}));

function MainPage() {
    const classes = useStyles();
    const [filters, setFilters] = useState({ 'race': '', 'character': '', 'planets': '', 'starships': '' });


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {['race', 'character', 'planets', 'starships'].map((searchCriteria) => {
                    return <SearchInput key={searchCriteria} searchCriteria={searchCriteria} filters={filters} setFilters={setFilters} />
                })}
            </div>
            <div style={{ width: '60vw' }}>
                <FilteredList filters={filters} />
            </div>
        </div>

    );
}

export default MainPage;

