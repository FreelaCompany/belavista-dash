import React, { useRef } from "react";

// Libs
import * as Yup from "yup";
import { Form } from "@unform/web";

import { useSelector, useDispatch } from "react-redux";
import AuthActions from "../../../store/ducks/auth";
import { useHistory } from "react-router-dom";

import { Input } from "../../../components/Forms";
import { Button } from "../../../components/globals";
import { Container, Content, Wrap } from "./styles";

import Logo from "../../../assets/images/logo-nova.png";
import { withRouter } from "react-router-dom";

function SignIn(props) {
  const history = useHistory();
  const formLogin = useRef();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  async function handleSubmit(data) {
    try {
      formLogin.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("E-mail inválido")
          .required("Digite seu e-mail de acesso"),
        password: Yup.string().required("A senha é obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(AuthActions.loginRequest(data, history));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formLogin.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <Container>
      <Content>
        <img src={Logo} alt="Logo PediuPeças" />
        <Form ref={formLogin} onSubmit={handleSubmit}>
          <>
            <Wrap>
              <Input name="email" placeholder="E-mail" />
            </Wrap>
            <Wrap>
              <Input name="password" placeholder="Senha" type="password" />
            </Wrap>
            <Button
              type="submit"
              btType="fuelYellow"
              label="Acessar"
              full
              loading={loading}
            />
          </>
        </Form>
      </Content>
    </Container>
  );
}

export default withRouter(SignIn);
