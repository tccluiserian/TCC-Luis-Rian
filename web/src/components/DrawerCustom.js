import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IoLogOut, IoLogOutOutline } from "react-icons/io5";
import DrawerOptionsList from './DrawerOptionsList';
import { deslogar } from '../store/actions/user';
import logoapenas from '../assets/logo.png'

const drawerWidth = 240;

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
    },
    drawerOpen: {
        width: drawerWidth,
        backgroundColor: 'rgba(36,36,36,1)',
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: 'rgba(36,36,36,1)',
        overflowX: 'hidden',
        width: theme.spacing(9) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: '#ffffff'
    },
    appbarOpen: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appbarClose: {
        width: `calc(100% - ${(theme.spacing(9) + 1)}px)`,
        marginLeft: theme.spacing(9) + 1,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        overflowX: 'hidden',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: 'rgba(36, 36, 36,1)',
        padding: theme.spacing(3),
    },
    search: {
        position: 'relative',
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    selected: {
        backgroundColor: 'rgba(255,255,255,0.2)'
    }

}));

export default function DrawerCustom(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)
    const history = useHistory()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.open,
                [classes.drawerClose]: !props.open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                }),
            }}
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
        </Drawer>
    )
}