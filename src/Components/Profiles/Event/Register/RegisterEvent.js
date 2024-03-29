import { Avatar, Button, Container, Grid, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import EventIcon from '@mui/icons-material/Event';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCompWorkerIdDispatch } from "../../../../Actions/Profiles/companyWorker";
import { registerEventDispatch } from "../../../../Actions/Profiles/events";
import EventTypes from '../../../../Static/select';
import MapRegister from '../../../Map/RegisterMap/RegisterMap';
import Message from '../../../Message/Message';
import useStyles from './styles';

const Input = styled(MuiInput)`
  width: 42px;
`;

const RegEvent = () => {

    const { profile: currentProfile } = useSelector((state) => state.auth);

    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const [listLoaded, setListLoaded] = useState(false);

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const [ticketPrice, setTicketPrice] = useState("");

    const onChangeTicketPrice = (e) => {
        const ticketPrice = e.target.value;
        setTicketPrice(ticketPrice);
    }

    const [limit, setLimit] = useState("10");

    const handleSliderChange = (event, newValue) => {
        setLimit(newValue);
    };

    const handleInputChange = (event) => {
        setLimit(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (limit < 0) {
            setLimit(0);
        } else if (limit > 100) {
            setLimit(100);
        }
    };

    const [type, setType] = useState("");

    const onChangeType = (e) => {
        const type = e.target.value;
        setType(type);
    };

    const [desc, setDesc] = useState("");

    const onChangeDesc = (e) => {
        const desc = e.target.value;
        setDesc(desc);
    };

    const [companyId, setCompanyId] = useState("");
    useEffect(() => {
        dispatch(getCompWorkerIdDispatch(currentProfile.id))
            .then((response) => {
                const compId = response.data.company.id;
                setCompanyId(compId);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const [startDate, setStartDate] = useState("2000-01-01T00:00:00");
    const onChangeStartDate = (e) => {
        const dateFormat = moment(e).format('yyyy-MM-DDTHH:mm:ss');
        setStartDate(dateFormat);
    };

    const [endDate, setEndDate] = useState("2000-01-01T00:00:00");
    const onChangeEndDate = (e) => {
        const dateFormat = moment(e).format('yyyy-MM-DDTHH:mm:ss');
        setEndDate(dateFormat);
    };

    const loc_lat = useSelector(state => ((state.event.new_event_loc !== undefined) ? state.event.new_event_loc.lat : ""));
    const loc_lng = useSelector(state => ((state.event.new_event_loc !== undefined) ? state.event.new_event_loc.lng : ""));

    const status = "Added";

    const handleSubmit = (e) => {
        e.preventDefault();
        setListLoaded(false);
        setLoading(true);

        dispatch(registerEventDispatch(name, companyId, loc_lat, loc_lng, startDate, endDate, status, desc, limit, type, ticketPrice))
            .then(() => {
                setListLoaded(true);
                setLoading(false);
            })
            .catch(() => {
                setListLoaded(true);
                setLoading(false);
            });
    };

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }

    const enabled =
        name.length > 0 &&
        type.length > 0 &&
        ticketPrice.length > 0 &&
        desc.length > 0;

    return (
        <Container className={classes.container}  >
            <Paper className={classes.paper} elevation={3}>
                <Grid container className={classes.titleContainer} >
                    <Avatar className={classes.avatar}>
                        <EventIcon />
                    </Avatar>
                    <Typography className={classes.title} component="h1" variant="h4">Register Event</Typography>
                    {listLoaded &&
                        <Message />
                    }
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid container className={classes.formContainer}>
                        <Grid className={classes.fieldsContainer} >
                            <Grid className={classes.gridField} >
                                <TextField label="Title" fullWidth name="name" htmlFor="name" variant="outlined" type="text" value={name} onChange={onChangeName} autoFocus />
                            </Grid>
                            <Grid className={classes.gridField} >
                                <TextField label="Type of the Event" variant="outlined" fullWidth value={type} onChange={onChangeType} type="text" select >
                                    {EventTypes.map((EventTypes) => (
                                        <MenuItem key={EventTypes} value={EventTypes}>{EventTypes}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid className={classes.gridField} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="Start Date and Hour"
                                            value={startDate}
                                            onChange={(newValue) => {
                                                onChangeStartDate(newValue);
                                            }}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                            <Grid className={classes.gridField} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="End Date and Hour"
                                            value={endDate}
                                            onChange={(newValue) => {
                                                onChangeEndDate(newValue);
                                            }}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                            <Grid className={classes.gridField} >
                                <Typography id="input-slider" gutterBottom>
                                    Tickets Limit
                                </Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <Slider className={classes.limit}
                                            value={limit}
                                            onChange={handleSliderChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Input name="limit" htmlFor="limit" value={limit} size="small" onChange={handleInputChange} onBlur={handleBlur}
                                            inputProps={{
                                                step: 1,
                                                min: 0,
                                                max: 100,
                                                type: 'number',
                                                'aria-labelledby': 'input-slider',
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className={classes.gridField} >
                                <TextField label="Ticket price" fullWidth name="ticketPrice" htmlFor="ticketPrice" variant="outlined" type="number" value={ticketPrice} onChange={onChangeTicketPrice} />
                            </Grid>
                            <Grid className={classes.gridField}>
                                <TextField label="Description" rows={6} multiline fullWidth name="desc" htmlFor="desc" variant="outlined" type="text" value={desc} onChange={onChangeDesc} />
                            </Grid>
                        </Grid>
                        <Grid className={classes.mapContainer}  >
                            <MapRegister />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.buttonsContainer}>
                        <Grid item className={classes.buttonClose}>
                            <Button onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                                back
                            </Button>
                        </Grid>
                        <Grid item className={classes.buttonSubmit}>
                            <Button type="submit" disabled={!enabled} fullWidth variant="contained" color="primary" >
                                {loading ? (
                                    <CircularProgress size="20px" />
                                ) : "Submit"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default RegEvent;
