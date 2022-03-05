import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DisplayMessage(props) {

    return (
        <Snackbar transitionDuration={{exit: 0.5}} open={props.open} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity={props.tipo}>
                {props.mensagem}
            </Alert>
        </Snackbar>
    )
}