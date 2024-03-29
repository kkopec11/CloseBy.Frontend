import { Grid } from '@material-ui/core';
import "@reach/combobox/styles.css";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import moment from 'moment';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdressDispatch } from '../../../../Actions/Map/map';
import { getEventIdDispatch, getEventListAllDispatch } from '../../../../Actions/Profiles/events';
import Compass from '../../Compass/Compass';
import mapStyles from "../../mapStyles";
import Search from '../../Search/Search';
import useStyles from '../../styles';

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

const libraries = ["places"];
const mapContainerStyle = {
    width: "80vh",
    height: "61vh",
}

const center = {
    lat: 52.2347,
    lng: 21.0042,
}

const MapDetailsView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { profile: currentProfile } = useSelector((state) => state.auth);
    const { event: currentEventRedux } = useSelector((state) => state.event);

    const [selected, setSelected] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);


    const [currenEventSelected, setCurrenEventSelected] = React.useState(null);
    const [currentEvent, setCurrentEvent] = React.useState([]);
    // eslint-disable-next-line
    const [page, setPage] = useState(0);
    // eslint-disable-next-line
    const [rowsPerPage, setRowsPerPage] = useState(100);

    const mapRef = React.useRef();
    // eslint-disable-next-line
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
        getList();
        getCurrentEvent();
    });

    const getList = () => {
        dispatch(getEventListAllDispatch(page, rowsPerPage))
            .then((response) => {
                const events = response.data.items;

                const filteredEvents = events.filter(diffrentThanCurrent)

                filteredEvents.forEach(function (item, index) {
                    dispatch(getAdressDispatch(item.localization.latitude, item.localization.longitude))
                        .then((response) => {
                            const address = response.data.results[0].formatted_address;

                            setMarkers((event) => [
                                ...event,
                                {
                                    lat: Number(item.localization.latitude),
                                    lng: Number(item.localization.longitude),
                                    address: address,
                                    time: item.startDateTime,
                                    title: item.title,
                                    desc: item.description,
                                    company: item.company,
                                    personLimit: item.personLimit,
                                    type: item.type,
                                    status: item.status,
                                    id: item.id,
                                }]);

                        })
                        .catch((e) => {
                            console.log(e);
                        });
                })
            })
            .catch((e) => {
                console.log(e);
            });
    };


    function diffrentThanCurrent(event) {
        return event.id !== currentEventRedux.id;
    }

    const getCurrentEvent = () => {
        dispatch(getEventIdDispatch(props.currentEventId[0]))
            .then((response) => {
                const curEvent = response.data;

                dispatch(getAdressDispatch(curEvent.localization.latitude, curEvent.localization.longitude))
                    .then((response) => {
                        const address = response.data.results[0].formatted_address;

                        setCurrentEvent(() => [
                            {
                                lat: Number(curEvent.localization.latitude),
                                lng: Number(curEvent.localization.longitude),
                                address: address,
                                time: curEvent.startDateTime,
                                title: curEvent.title,
                                desc: curEvent.description,
                                company: curEvent.company,
                                personLimit: curEvent.personLimit,
                                type: curEvent.type,
                                status: curEvent.status,
                                id: curEvent.id,
                            }]);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                panTo({ lat: Number(curEvent.localization.latitude), lng: Number(curEvent.localization.longitude) });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onMapClick = React.useCallback((event) => {
        setSelected(null);
        setCurrenEventSelected(null);
    }, []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY_2,
        libraries,
    });

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    const openCurrentEvent = () => {
        setCurrenEventSelected(true);
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loadin Maps";

    return (
        <>
            <Grid className={classes.gridTop} >
                <Search panTo={panTo} />
                <Compass panTo={panTo} />
            </Grid>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center} options={options} onClick={onMapClick} onLoad={onMapLoad}>
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: `./assets/map.png`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(45, 45),
                            scaledSize: new window.google.maps.Size(90, 90),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}
                {selected &&
                    (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => { setSelected(null) }}>
                        <div>
                            <h2>Event</h2>
                            <p>Title:  {selected.title}</p>
                            <p>Desc:  {selected.desc}</p>
                            <p>Start Date {moment(selected.time).format('MM/DD/YYYY HH:mm')}</p>
                            {(currentProfile.role === "GlobalAdmin") && <p>Company:  {selected.company}</p>}
                            {/* <p>Tickets Limit:  {selected.personLimit}</p> */}
                            <p>Type:  {selected.type}</p>
                            <p>Address:  {selected.address}</p>
                            {/* <p>LAT:  {selected.lat}</p>
                            <p>LNG:  {selected.lng}</p> */}
                        </div>
                    </InfoWindow>)}
                {currentEvent.map((marker) => (
                    <Marker

                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: `./assets/map_yellow.png`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(45, 45),
                            scaledSize: new window.google.maps.Size(90, 90),
                        }}
                        onClick={() => {
                            setCurrenEventSelected(marker);
                        }}
                    />
                ))}
                {currenEventSelected &&
                    (<InfoWindow onIdle={openCurrentEvent} position={{ lat: currenEventSelected.lat, lng: currenEventSelected.lng }} onCloseClick={() => { setCurrenEventSelected(null) }}>
                        <div>
                            <h2>Current Event</h2>
                            <p>Title:  {currenEventSelected.title}</p>
                            {/* <p>Desc:  {currenEventSelected.desc}</p> */}
                            <p>Start Date {moment(currenEventSelected.time).format('MM/DD/YYYY HH:mm')}</p>
                            {(currentProfile.role === "GlobalAdmin") && <p>Company:  {currenEventSelected.company}</p>}
                            {/* <p>Tickets Limit:  {currenEventSelected.personLimit}</p>  */}
                            <p>Type:  {currenEventSelected.type}</p>
                            <p>Address:  {currenEventSelected.address}</p>
                            {/* <p>LAT:  {currenEventSelected.lat}</p>
                            <p>LNG:  {currenEventSelected.lng}</p> */}
                        </div>
                    </InfoWindow>)}
            </GoogleMap>
        </>
    );
}

export default MapDetailsView;