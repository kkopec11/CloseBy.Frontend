import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        borderRadius: "10px",

    },
    container: {
        // position: "absolute",
        // maxWidth: "28vw",
        // margin: theme.spacing("2vw", "36vw"),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        justifyContent: 'center',
    },
    select: {
        margin: 8,
    },
    spinnerContainer: {
        // position: "absolute",
        // maxWidth: "90vw",
        // margin: theme.spacing("1.5vw", "5vw"),
        // borderRadius: "10px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
}));
