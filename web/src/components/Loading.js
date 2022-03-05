import React from 'react';
import { Backdrop, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useIsLarge } from '../hooks/useIsLarge';

const useStyles = makeStyles((theme) => ({    
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'        
    }
}))

export default function Loading(props){

    const large = useIsLarge()
    const classes = useStyles()

    return(
        <Backdrop open={props.open} className={classes.backdrop}>
            <CircularProgress color='primary' />
        </Backdrop>
    )
}