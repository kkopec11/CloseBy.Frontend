import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from "../../../Actions/auth";
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useParams } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Message from '../../Message/Message';


export const NewPassword = () => {
    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const { token } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMessage(false);
        setLoading(true);

        dispatch(setNewPassword(password, token))
            .then(() => {
                setShowMessage(true);
                setLoading(false);

            })
            .catch(() => {
                setShowMessage(true);
                setLoading(false);

            });
    };

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Set new password</Typography>
                {showMessage &&
                    <Message />
                }
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField label="Password" name="password" htmlFor="password" type="text" variant="outlined" fullWidth value={password} onChange={onChangePassword} />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {loading ? (
                            <CircularProgress size="20px" />
                        ) : "Set new password"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Return to the login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default NewPassword;
