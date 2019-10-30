import React, { useState } from 'react';
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
    const { data } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const dataToShow = data && data.results ? data.results : [];



    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        getPage(newPage + 1);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getPage = (pageToLoad) => {
        API.get(`people/?page=${pageToLoad}`).then((response) => {
            console.log(response);
        });
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
                    {dataToShow && dataToShow
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(row => (
                            <TableRow key={row.url}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.species}</TableCell>
                                <TableCell align="center">{row.mass}</TableCell>
                                <TableCell align="center">{row.hair_color}</TableCell>
                                <TableCell align="center">{row.skin_color}</TableCell>
                                <TableCell align="center"><Link to={`/congressmanDetail/${row.id}`}>View more</Link></TableCell>
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