import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IoLogOut, IoLogOutOutline } from "react-icons/io5";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DrawerOptionsList from './DrawerOptionsList';
import { deslogar } from '../store/actions/user';
import logoapenas from '../assets/logo.png'

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,

    },
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
    },
    drawerPaper: {
        backgroundColor: 'rgba(36, 36, 36,1)',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflowX: 'hidden',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundImage: 'linear-gradient(0deg, rgba(36, 36, 36,1) 27%, rgba(23,23,23,1) 88%)',
        padding: theme.spacing(3),
    }

}));

export default function DrawerMobile(props) {

    const classes = useStyles();
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)
    const history = useHistory()


    return (
        <SwipeableDrawer
            open={props.open}
            onClose={props.handleDrawerClose}
            onOpen={props.handleDrawerOpen}
            classes={{
                paper: classes.drawerPaper
            }}
            className={classes.drawer}
        >            
            <DrawerOptionsList handleDrawerClose={() => props.handleDrawerClose()} />
            <div style={{ flexGrow: 1, overflowX: 'hidden' }}>

            </div>
            <List>
                <ListItem onClick={() => dispatch(deslogar())} button>
                    <ListItemIcon style={{ paddingLeft: 10 }}><IoLogOutOutline size={22} color="#ffffff" /></ListItemIcon>
                    <ListItemText primary={'Sair do painel'} primaryTypographyProps={{ style: { color: '#ffffff', fontSize: 13 } }} />
                </ListItem>
            </List>
        </SwipeableDrawer>
    )
}