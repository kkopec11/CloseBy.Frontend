import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import useStyles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from '@material-ui/lab';
import { regCompany } from "../../../../Actions/Profiles/company";
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Message from '../../../Message/Message';

const RegCompany = () => {
    const classes = useStyles();

    const [name, setName] = useState("");

    const [loadMessage, setLoadMessage] = useState(false);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadMessage(false);
        setLoading(true);

        if (validate())
            dispatch(regCompany(name))
                .then(() => {
                    setLoadMessage(true);
                    setLoading(false);
                })
                .catch(() => {
                    setLoadMessage(true);
                    setLoading(false);
                });
    };

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const validate = () => {
        let temp = {}
        temp.name = (/^[A-Za-z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ!@#$%^&*().]+$/).test(name) ? "" : "Numbers and whitespaces are not allowed"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x == "");
    }

    const enabled = name.length > 0

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Register Company</Typography>
                {loadMessage &&
                    <Message />
                }
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField label="Name" error={errors.name} helperText={(errors.name)} name="name" htmlFor="name" variant="outlined" type="text" value={name} onChange={onChangeName} fullWidth autoFocus />
                        </Grid>
                    </Grid>
                    <Button type="submit" disabled={!enabled} fullWidth variant="contained" color="primary" className={classes.submit}>
                        {loading ? (
                            <CircularProgress size="20px" />
                        ) : "Register"}
                    </Button>
                    <Button className={classes.buttonClose} onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                        back
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default RegCompany;
