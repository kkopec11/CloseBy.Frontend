import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import { useSelector } from "react-redux";
import useStyles from './styles';

const PopupDeleteEvent = (props) => {
    const classes = useStyles();
    const { profile: currentProfile } = useSelector((state) => state.auth);

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
                            <TextField value={props.handleData[1]} label="Title" InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                        </Grid>
                        {(currentProfile.role === "GlobalAdmin") &&
                            <Grid item xs={12} >
                                <TextField value={props.handleData[2]} label="Company" InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                            </Grid>}
                        <Grid item xs={12} >
                            <TextField value={props.handleData[3]} label="Status" InputProps={{ readOnly: true }} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button className={classes.buttonLink} variant="contained" color="secondary" fullWidth>
                                Tickets
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={props.handleDelete} variant="contained" color="secondary" fullWidth>
                                delete
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
};

export default PopupDeleteEvent;