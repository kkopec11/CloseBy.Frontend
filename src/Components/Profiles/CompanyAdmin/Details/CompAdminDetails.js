import React, { useState, useEffect } from "react";
import useStyles from './styles';
import CompAdmin from '../../../../Api/companyAdmin'
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import { editCompAdmin } from "../../../../Actions/Profiles/companyAdmin";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";
// import Company from '../../../../Api/company'    FOR FUTURE BACKEND UPDATE - EDIT ASSIGNET COMPANY

const CompAdminDetails = () => {
    const classes = useStyles();
    const compAdminId = useSelector(state => state.companyAdmin.id_comp_admin);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    // const [companyId, setCompanyId] = useState("");  FOR FUTURE BACKEND UPDATE - EDIT ASSIGNET COMPANY
    // const [companyName, setCompanyName] = useState("");


    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };

    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    // const onChangeCompanyId = (e) => {   FOR FUTURE BACKEND UPDATE - EDIT ASSIGNET COMPANY
    //     const companyId = e.target.value;
    //     setCompanyId(companyId);
    // };

    const onChangeGender = (e) => {
        const gender = e.target.value;
        setGender(gender);
    };

    // const [companyList, setCompanyList] = useState([]);  FOR FUTURE BACKEND UPDATE - EDIT ASSIGNET COMPANY

    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(100);

    // const getCompanyList = () => {
    //     Company.getCompanyList(page, rowsPerPage)
    //         .then((response) => {
    //             const companysTemp = response.data.items;

    //             setCompanyList(companysTemp);
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // };
    // useEffect(getCompanyList, [page, rowsPerPage]);

    const [disaled, setDisabled] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const startEditing = () => {
        setDisabled(false);
        setEditMode(true);
    }

    const stopEditing = () => {
        setDisabled(true);
        setEditMode(false);
    }

    const getCompAdminDetails = () => {
        CompAdmin.getCompanyAdminId(compAdminId)
            .then((response) => {
                const compAdmin = response.data;
                console.log(compAdmin);

                setFirstName(compAdmin.firstName);
                setLastName(compAdmin.lastName);
                setEmail(compAdmin.email);
                setGender(compAdmin.gender);
                // setCompanyId(compAdmin.company.id);  FOR FUTURE BACKEND UPDATE - EDIT ASSIGNET COMPANY
                // setCompanyName(compAdmin.company.name);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(getCompAdminDetails, [compAdminId]);

    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
        // dispatch(editCompAdmin(compAdminId, firstName, lastName, gender, email, companyId))  FOR FUTURE BACKEND UPDATE - EDIT ASSIGNET COMPANY
        dispatch(editCompAdmin(compAdminId, firstName, lastName, gender, email))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Details of the Company Admin</Typography>
                {successful ?
                    <Alert className={classes.alert} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>You have successfully edit your company</strong>
                    </Alert>
                    :
                    (message ?
                        <Alert className={successful ? classes.alert : classes.alert} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong>{message}</strong>
                        </Alert>
                        :
                        null
                    )
                }
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField value={firstName} label="First Name" onChange={onChangeFirstName} InputProps={{ readOnly: disaled }} name="firstName" htmlFor="firstName" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={lastName} onChange={onChangeLastName} InputProps={{ readOnly: disaled }} name="lastName" htmlFor="lastName" variant="outlined" fullWidth label="Last Name" />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={email} label="Email Address" onChange={onChangeEmail} InputProps={{ readOnly: disaled }} name="email" htmlFor="email" variant="outlined" type="email" fullWidth />
                        </Grid>
                        {/* FOR FUTURE BACKEND UPDATE - EDIT ASSIGNET COMPANY
                        <Grid item xs={12} >
                            {editMode ?
                                <TextField value={companyId} label="Company" htmlFor="companyId" variant="outlined" InputProps={{ readOnly: disaled }} type="text" onChange={onChangeCompanyId} fullWidth select >
                                    {companyList.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </TextField>
                                :
                                <TextField value={companyName} label="Company" htmlFor="companyId" variant="outlined" InputProps={{ readOnly: disaled }} type="text" onChange={onChangeCompanyId} fullWidth />
                            }
                        </Grid> */}
                        <Grid item xs={12} >
                            <TextField value={gender} htmlFor="gender" variant="outlined" InputProps={{ readOnly: disaled }} fullWidth onChange={onChangeGender} type="text" select={disaled ? false : true} label="Gender">
                                <MenuItem value={"Male"} >Male</MenuItem>
                                <MenuItem value={"Female"} >Female</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid className={classes.buttonsContainer} container spacing={2}>
                        {editMode ?
                            <>
                                <Button type="submit" className={classes.buttonEditSave} fullWidth variant="contained"  >
                                    Save
                                </Button>
                                <Button className={classes.buttonEditStop} onClick={() => { stopEditing() }} fullWidth variant="contained" color="primary" >
                                    Stop Editinig
                                </Button>
                            </>
                            :
                            <Button className={classes.buttonEditStart} onClick={() => { startEditing() }} fullWidth variant="contained" color="primary" >
                                Edit
                            </Button>
                        }
                        <Button className={classes.buttonClose} component={Link} to="/compAdminList" fullWidth variant="contained" color="secondary" >
                            Close
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default CompAdminDetails;

