import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Auth from "../pages/Auth";
import Produtos from "../pages/Produtos";
import Banner from "../pages/Banner";
import Arquitetos from "../pages/Arquitetos";
import Contatos from "../pages/Contatos";
import Ambientes from "~/pages/Ambientes";

export default function Routes() {
  const auth = useSelector((state) => state.auth);

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          if (auth.logado) {
            return <Redirect to={{ pathname: "/produtos" }} />;
          }
          return <Redirect to={{ pathname: "/login" }} />;
        }}
      />
      <Route
        path="/login"
        exact
        render={() =>
          auth.logado && <Redirect to={{ pathname: "/produtos" }} />
        }
        component={!auth.logado && Auth}
      />
      <Route path="/produtos" exact component={Produtos} />
      <Route path="/banner" exact component={Banner} />
      <Route path="/arquitetos" exact component={Arquitetos} />
      <Route path="/contatos" exact component={Contatos} />
      <Route path="/ambientes" exact component={Ambientes} />
    </Switch>
  );
}
