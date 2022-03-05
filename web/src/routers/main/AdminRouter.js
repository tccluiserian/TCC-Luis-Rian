import React from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { useRouteMatch } from 'react-router-dom'
import Drawer from "../../components/DrawerCustom";
import { makeStyles } from '@material-ui/core/styles';
import { Hidden } from "@material-ui/core";
import AppBarCustomMobile from "../../components/AppBarCustomMobile";
import DrawerCustomMobile from "../../components/DrawerMobile";

import Home from "../../screens/main/Home";
import AmbientesRouter from "./AmbientesRouter";
import Usuarios from "../../screens/main/Usuarios";
import CadastroKeys from "../../screens/main/CadastroKeys";
import UsuariosConectados from "../../screens/main/UsuariosConectados";
import UsuariosRouter from "./UsuariosRouter";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    contentFiltroOpen: {
        marginTop: 140,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.only('sm')]: {
            marginTop: 200
        },
        [theme.breakpoints.only('md')]: {
            marginTop: 200
        },
        [theme.breakpoints.only('xs')]: {
            marginTop: 250
        },
    },
    contentFiltroClose: {
        marginTop: 40,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.down('md')]: {
            marginTop: 100
        },
    },
    offset: theme.mixins.toolbar,
}));
export default function AdminRouter() {

    const match = useRouteMatch()
    const [open, setOpen] = React.useState(false)
    const classes = useStyles()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Hidden lgUp>
                <AppBarCustomMobile open={open} handleDrawerClose={() => handleDrawerClose()} handleDrawerOpen={() => handleDrawerOpen()} />
            </Hidden>
            <Hidden lgUp>
                <DrawerCustomMobile open={open} handleDrawerClose={() => handleDrawerClose()} handleDrawerOpen={() => handleDrawerOpen()} />
            </Hidden>
            <Hidden mdDown>
                <Drawer open={true} handleDrawerClose={() => { }} />
            </Hidden>
            <main className={classes.content}>
                <Hidden lgUp>
                    <div className={classes.offset} />
                </Hidden>
                <Switch>
                    <Route path={`${match.path}ambientes`} render={() => <AmbientesRouter />} />
                    <Route path={`${match.path}codigos-cadastro`} render={() => <CadastroKeys />} />
                    <Route path={`${match.path}usuarios-conectados`} render={() => <UsuariosConectados />} />
                    <Route path={`${match.path}usuarios`} render={() => <UsuariosRouter />} />
                    <Route path={`${match.path}`} render={() => <Home />} />
                </Switch>
            </main>
        </div>
    );
}

/* ]BWVAJ_%kX*+ */
