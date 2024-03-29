import { Button, Grid, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteCompanyDispatch, getCompanyListDispatch, setCompanyDispatch } from '../../../../Actions/Profiles/company';
import PopupDeleteCompany from '../../../Popup/PopupDelete/Company/PopupDeleteCompany';
import useStyles from './styles';

const CompanyList = () => {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [listLoaded, setListLoaded] = useState(false);
    const [company, setCompany] = useState([]);
    const [count, setCount] = useState(0);

    const getList = () => {
        dispatch(getCompanyListDispatch(page, rowsPerPage))
            .then((response) => {
                const companysTemp = response.data.items;
                const totalPages = response.data.count;

                setCompany(companysTemp);
                setCount(totalPages);
                setListLoaded(true);
            })
            .catch((error) => {
                setListLoaded(false);
            });

    };

    useEffect(getList, [page, rowsPerPage]);// eslint-disable-line react-hooks/exhaustive-deps

    const dispatch = useDispatch();

    const dispatchCompany = (company) => {
        dispatch(setCompanyDispatch(company))
    }

    const [isOpen, setIsOpen] = useState(false);

    const [idCompanyDelete, setIdCompanyDelete] = useState();
    const [companyNameDelete, setCompanyNameDelete] = useState();


    const prepareDelete = (company) => {
        dispatch(setCompanyDispatch(company));

        setIdCompanyDelete(company.id);
        setCompanyNameDelete(company.name);

        showPopup();
    }

    const showPopup = () => {
        setIsOpen(!isOpen);
    }

    const deleteFromList = () => {
        dispatch(deleteCompanyDispatch(idCompanyDelete))
            .then(() => {
                showPopup();
                getList();
            })
            .catch((error) => {
                setListLoaded(false);
                console.log(error);
            });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        (listLoaded !== true) ?
            <Grid className={classes.spinnerContainer}>
                <CircularProgress size={500} thickness={1} />
            </Grid>
            :
            <>
                <TableContainer className={classes.tableContainer} component={Paper} elevation={3} >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell className={classes.tableCellTitle}>Company Name</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Created At</TableCell>
                                <TableCell align="center" className={classes.tableCellTitle}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {company.map((item) => (
                                <TableRow key={item.id} >
                                    <TableCell component="th" scope="row">{item.name}</TableCell>
                                    <TableCell align="center">{moment(item.createdAt).format('MM/DD/YYYY HH:mm')}</TableCell>
                                    <TableCell align="center">
                                        <IconButton component={Link} to="/companyDetails" onClick={() => { dispatchCompany(item) }} aria-label="edit" size="large" >
                                            <SettingsApplicationsIcon className={classes.settingICon} />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="large" onClick={() => { prepareDelete(item) }} >
                                            <DeleteIcon className={classes.deleteICon} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, 100]}
                                            component="div"
                                            count={count}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Grid>
                                    <Grid item >
                                        <Button component={Link} to="/registerCompany" className={classes.bottomButton}>
                                            Register new company
                                        </Button>
                                    </Grid>
                                </Grid>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                {isOpen && <PopupDeleteCompany handleClose={showPopup} handleDelete={deleteFromList} handleData={["Company", companyNameDelete]} />}
            </>
    );
};

export default CompanyList;