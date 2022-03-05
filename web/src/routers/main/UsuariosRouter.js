import React from "react";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import { useSelector } from "react-redux";

import { useIsLarge } from "../../hooks/useIsLarge";
import GerenciarAmbientes from "../../screens/main/children/usuarios/GerenciarAmbientes";
import Usuarios from "../../screens/main/Usuarios";

export default function UsuariosRouter() {

    const user = useSelector((state) => state.user)
    const match = useRouteMatch()
    const large = useIsLarge()

    return (
        <Switch>
            <Route path={`${match.path}/:userKey/gerenciar-ambientes`} render={() => <GerenciarAmbientes />} />
            <Route path={`${match.path}`} render={() => <Usuarios />} />
        </Switch>
    );
}
