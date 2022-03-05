import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { RiMenu5Line } from 'react-icons/ri';
import { BiMenuAltLeft } from 'react-icons/bi';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    appBar: {
        width: '100%',
        backgroundColor: '#ffffff'
    },
    toolbar: {
        overflow: 'hidden',
        backgroundColor: 'rgba(36, 36, 36,1)',
        alignItems: 'flex-start',
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    toolbar2: {
        overflow: 'hidden',
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        justifyContent: 'center',
        ...theme.mixins.toolbar
        // necessary for content to be below app bar

    },
    filtroToolbar: {
        height: 150,
        overflow: 'hidden',
        alignItems: 'flex-start',
        backgroundColor: '#f7f7f7',
        [theme.breakpoints.up('sm')]: {
            height: 100
        },
    },
    content: {
        flexGrow: 1,
        backgroundImage: 'linear-gradient(240deg, rgba(227,184,64,1) 27%, rgba(218,49,27,1) 88%)',
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
        [theme.breakpoints.down('md')]: {
            paddingLeft: 15,
            justifyContent: 'center',
        },
    },
    offset: theme.mixins.toolbar,

}));

export default function AppBarCustomMobile(props) {

    const classes = useStyles();

    const user = useSelector((state) => state.proprietario)

    return (
        <AppBar elevation={0} position='fixed' className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => props.open ? props.handleDrawerClose() : props.handleDrawerOpen()}
                    className={classes.menuButton}
                >
                    <BiMenuAltLeft size={26} color={'#ffffff'} />
                </IconButton>
                <div className={classes.grow} />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
                    <div>
                        
                    </div>
                </div>

            </Toolbar>                    
        </AppBar>
    )
}