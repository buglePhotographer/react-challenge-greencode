import React, { useState, useEffect, Fragment } from 'react';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import SearchIcon from '@material-ui/icons/Search';
import FilteredList from '../FilteredList';
// import SearchInput from '../SearchInput';
import API from '../../Api/StarWars';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        height: '6vh'
    },
}));

let data;

function MainPage() {
    const classes = useStyles();
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        API.get('people').then(response => {
            console.log('Fetching data...', response);
            data = response.data;

            let aux = {};
            _.forEach(data[0], (d, index) => {
                aux[index] = "";
            });
            aux['all'] = "";
            setFilters(aux);
        });


    }, []);


    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '60vw' }}>
                <FilteredList data={data} filters={filters} />
            </div>
        </div>

    );
}

export default MainPage;

