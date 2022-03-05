import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: 'rgba(253,92,3,1)'
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
        overflow: 'hidden',
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    filtroToolbar: {
        height: 100,
        overflow: 'hidden',
        alignItems: 'flex-start',
        backgroundColor: '#f7f7f7'
    },
    content: {
        flexGrow: 1,
        backgroundImage: 'linear-gradient(0deg, rgba(227,184,64,1) 27%, rgba(218,49,27,1) 88%)',
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
    offset: theme.mixins.toolbar,

}));

export default function AppBarCustom(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [showFilter, setShowFilter] = React.useState(false)
    const dispatch = useDispatch()

    const user = useSelector((state) => state.proprietario)
    const history = useHistory()
    const notificacoes = useSelector((state) => state.notificacoes)
    
    const retornaNome = () => {
        let name = ''

        let userNameSplit = user.nome.split(' ')

        if (userNameSplit.length > 1) {
            name = userNameSplit[0] + ' ' + userNameSplit[1]
        }

        return name
    }

    return (
        <AppBar elevation={0} position='fixed' className={clsx(classes.appBar, {
            [classes.appbarOpen]: props.open,
            [classes.appbarClose]: !props.open,
        })}>
            <Toolbar className={classes.toolbar}>                
                <div className={classes.grow} />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
                    <div>                        

                    </div>
                    <div style={{ marginLeft: 2 }}>
                        <Typography style={{ fontSize: 11, color: 'gray' }}>{retornaNome()}</Typography>
                    </div>
                    <div style={{ marginLeft: 15 }}>
                        
                    </div>
                </div>

            </Toolbar>            
        </AppBar>
    )
}