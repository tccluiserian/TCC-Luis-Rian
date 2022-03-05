import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>            
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minWidth: 300
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function DialogConfirm(props) {

    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleCancelar()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle style={{ textAlign: 'center', fontSize: 16, color: 'red' }}>
                {props.titulo}
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant='subtitle1' style={{ fontWeight: 500, textAlign: 'center', fontSize: 14, color: '#000000' }}>{props.mensagem}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleCancelar()} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => props.handleConfirmar()} style={{color: 'red'}}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}