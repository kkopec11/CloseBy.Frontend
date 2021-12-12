import React, { useState, useEffect } from "react";
import useStyles from './styles';
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@material-ui/core/IconButton';
import Company from '../../../../Services/Profiles/company.service'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom'
import { editCompany } from "../../../../Actions/Profiles/company";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CompWorker from '../../../../Services/Profiles/companyWorker.service'
import CompAdmin from '../../../../Services/Profiles/companyAdmin.service'
import Events from '../../../../Services/Profiles/event.service'

const PopupDeleteCompany = (props) => {
    const classes = useStyles();

    const companyId = useSelector(state => state.company.id_company);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [compWorkersList, setCompWorkersList] = useState([]);

    const selectCompanyWorkersList = () => {
        CompWorker.getCompanyWorkersList(page, rowsPerPage, companyId)
            .then((response) => {
                const compWorkersList = response.data.items;

                setCompWorkersList(compWorkersList);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(selectCompanyWorkersList, [companyId]);

    const [compAdminsList, setCompAdminsList] = useState([]);

    const selectCompanyAdminsList = () => {
        CompAdmin.getCompanyAdminsList(page, rowsPerPage, companyId)
            .then((response) => {
                const compAdminsList = response.data.items;

                setCompAdminsList(compAdminsList);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(selectCompanyAdminsList, [companyId]);

    const [eventsList, setEventList] = useState([]);

    const selectEventsList = () => {
        Events.getEventsListId(page, rowsPerPage, companyId)
            .then((response) => {
                const eventsList = response.data.items;

                setEventList(eventsList);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(selectEventsList, [companyId]);

    const disable = ((compAdminsList.length !== 0) || (compWorkersList.length !== 0) || (eventsList.length !== 0));

    return (
        <div className={classes.popupBox} >
            <Container className={classes.container} component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Grid className={classes.headerContainer} >
                        <Grid className={classes.closeIconContainer}>
                            <IconButton onClick={props.handleClose} aria-label="close" size="small">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                        <Avatar className={classes.avatar}>
                            <DeleteForeverIcon />
                        </Avatar>
                    </Grid>
                    <Typography component="h1" variant="h5">
                        Delete this {props.handleData[0]}?
                    </Typography>
                    <Grid container className={classes.containerData} spacing={2}>
                        <Grid item xs={12} >
                            <TextField value={props.handleData[1]} label="Company" InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button disabled={(eventsList.length !== 0) ? false : true} className={classes.buttonLink} component={Link} to="/eventListCompanyFilter" fullWidth variant="contained" color="primary" >
                                {(eventsList.length !== 0) ? "Events" : "No Event"}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button disabled={(compAdminsList.length !== 0) ? false : true} className={classes.buttonLink} component={Link} to="/adminListCompanyFilter" fullWidth variant="contained" color="primary" >
                                {(compAdminsList.length !== 0) ? "Admins" : "No Admin"}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button disabled={(compWorkersList.length !== 0) ? false : true} className={classes.buttonLink} component={Link} to="/workerListCompanyFilter" fullWidth variant="contained" color="primary" >
                                {(compWorkersList.length !== 0) ? "Workers" : "No Worker"}
                            </Button>
                        </Grid>
                        {disable ?
                            <Grid item xs={12}>
                                <Button onClick={props.handleDelete} className={classes.buttonForceDel} variant="contained" color="secondary" fullWidth>
                                    delete with references
                                </Button>
                            </Grid>
                            :
                            <Grid item xs={12}>
                                <Button onClick={props.handleDelete} variant="contained" color="secondary" fullWidth>
                                    delete
                                </Button>
                            </Grid>
                        }
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
};

export default PopupDeleteCompany;