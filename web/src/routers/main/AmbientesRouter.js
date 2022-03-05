import React from "react";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import { useSelector } from "react-redux";

import Ambientes from "../../screens/main/Ambientes";
import { useIsLarge } from "../../hooks/useIsLarge";
import NovoAmbiente from "../../screens/main/children/ambientes/NovoAmbiente";

export default function AmbientesRouter() {

    const user = useSelector((state) => state.user)
    const match = useRouteMatch()
    const large = useIsLarge()

    return (
        <Switch>
            <Route path={`${match.path}/novo-ambiente`} render={() => <NovoAmbiente />} />
            <Route path={`${match.path}`} render={() => <Ambientes />} />
        </Switch>
    );
}
