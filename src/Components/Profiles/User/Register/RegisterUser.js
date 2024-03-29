import { Avatar, Button, Container, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { registerUserDispatch } from "../../../../Actions/Profiles/user";
import Message from '../../../Message/Message';
import useStyles from './styles';

export const Register = () => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const [showMessage, setShowMessage] = useState(false);

    const enabled =
        firstName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        gender.length > 0 &&
        password.length > 0;

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);


    const dispatch = useDispatch();

    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };
    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };
    const onChangeGender = (e) => {
        const gender = e.target.value;
        setGender(gender);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMessage(false);

        if (validate()) {
            setLoading(true);
            dispatch(registerUserDispatch(firstName, lastName, gender, email, password))
                .then(() => {
                    setShowMessage(true);
                    setLoading(false);
                })
                .catch(() => {
                    setShowMessage(true);
                    setLoading(false);
                });
        }
    };

    const validate = () => {
        let temp = {}
        temp.firstName = (/^[A-Za-ząćęłńóśźżĄĘŁŃÓŚŹŻ]+$/).test(firstName) ? "" : "Numbers and whitespaces are not allowed"
        temp.lastName = (/^[A-Za-ząćęłńóśźżĄĘŁŃÓŚŹŻ]+$/).test(lastName) ? "" : "Numbers and whitespaces are not allowed"
        temp.email = (/$^|.+@.+..+/).test(email) ? "" : "Email is not valid"
        temp.gender = gender.length !== 0 ? "" : "This field is required (gender)"
        temp.password = (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*ąćęłńóśźżĄĘŁŃÓŚŹŻ]{6,50}$/).test(password) ? "" : "At least 6 characters required including one number and one special character"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "");
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Register</Typography>
                {showMessage &&
                    <Message />
                }
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField label="First Name"
                                error={errors.firstName} helperText={(errors.firstName)} name="firstName" htmlFor="firstName" variant="outlined" fullWidth value={firstName} onChange={onChangeFirstName} type="text" autoFocus />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Last Name"
                                error={errors.lastName} helperText={(errors.lastName)} name="lastName" htmlFor="lastName" variant="outlined" fullWidth value={lastName} onChange={onChangeLastName} type="text" />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField error={errors.gender} helperText={(errors.gender)} name="gender" htmlFor="gender" variant="outlined" fullWidth value={gender} onChange={onChangeGender} type="text" select label="Gender">
                                <MenuItem value={"Male"} >Male</MenuItem>
                                <MenuItem value={"Female"} >Female</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField label="Email Address"
                                error={errors.email} helperText={(errors.email)} type="email" name="email" htmlFor="email" variant="outlined" fullWidth value={email} onChange={onChangeEmail} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword}>
                                                {!showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth error={errors.password} helperText={(errors.password)} name="password" htmlFor="password" label="Password" value={password} onChange={onChangePassword} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} variant="outlined" />
                        </Grid>
                    </Grid>
                    <Button disabled={!enabled} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {loading ? (
                            <CircularProgress size="20px" />
                        ) : "Register"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
export default Register;