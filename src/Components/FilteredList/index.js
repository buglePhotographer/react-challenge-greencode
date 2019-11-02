import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import './index.css';
import API from '../../Api/StarWars';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
        marginTop: '2vh'
    },
    table: {
        minWidth: 650,
    },
});


function FilteredList(props) {
    const classes = useStyles();
    const { filters } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState([]);

    console.log(filters);

    useEffect(() => {
        if(filters.character){
            API.get(`people/?search=${filters.character}`).then(response => {
                setData(response.data);
            });
        }
        else {
            API.get(`people/?page=${page + 1}`).then(response => {
                setData(response.data);
            });
        }
    }, [page, filters]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <Table className='responsiveTable' aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell align="center"><strong>Species</strong></TableCell>
                        <TableCell align="center"><strong>Mass</strong></TableCell>
                        <TableCell align="center"><strong>Hair color</strong></TableCell>
                        <TableCell align="center"><strong>Skin color</strong></TableCell>
                        <TableCell align="center"><strong>View more</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.results && data.results
                        .map((row, index) => (
                            <TableRow key={row.url}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.species}</TableCell>
                                <TableCell align="center">{row.mass}</TableCell>
                                <TableCell align="center">{row.hair_color}</TableCell>
                                <TableCell align="center">{row.skin_color}</TableCell>
                                <TableCell align="center"><Link to={`/characterDetail/${page.toString() + 1}`}>View more</Link></TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[7, 10, 25]}
                component="div"
                count={data ? data.count : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default FilteredList;