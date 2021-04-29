import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthActions from "../../store/ducks/auth";

import Button from "../Button";

import { Container, Name } from "./styles";

function Header({ history }) {
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(AuthActions.logoutRequest(history));
  }

  const { loading } = useSelector((state) => state.auth);

  return (
    <Container>
      <Name>Olá, {data.nome}!</Name>
      <Button
        action={() => handleLogout()}
        btType="fuelYellow"
        label={"SAIR"}
        loading={loading}
      />
    </Container>
  );
}
export default withRouter(Header);
