import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../../screens/auth/Login";
import AdminRouter from "../main/AdminRouter";
import EsqueciSenha from "../../screens/auth/EsqueciSenha";
import Registrar from "../../screens/auth/Registrar";

export default function AuthRouter() {

  const history = useHistory()
  const user = useSelector((state) => state.user)


  return (
    <div style={{ overflow: 'hidden' }}>
      <Router>
        <Switch
        >
          <Route path={`/esqueci-a-senha`} render={() => user.authenticated ?
            <Redirect to={`/`} />
            :
            <EsqueciSenha />
          } />
          <Route path={`/cadastrar`} render={() => user.authenticated ?
            <Redirect to={`/`} />
            :
            <Registrar />
          } />
          <Route path={`/login`} render={() => user.authenticated ?
            <Redirect to={`/`} />
            :
            <Login />
          } />
          <Route path={`/`} render={() => user.authenticated ?
            <AdminRouter />
            : <Redirect to={`/login`} />
          } />
        </Switch>
      </Router>
    </div>
  );
}
