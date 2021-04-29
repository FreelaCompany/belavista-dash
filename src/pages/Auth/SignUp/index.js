import React from "react";

// Libs
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";

import { useSelector, useDispatch } from "react-redux";
import CadastroActions from "../../../store/ducks/cadastro";

import { Button } from "../../../components/globals";
import { Container, Content, Wrap } from "./styles";

import Logo from "../../../assets/images/logo-nova.png";

export default function SignOut(props) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.cadastro);

  const schema = Yup.object().shape({
    nome: Yup.string().required("Digite o nome de sua loja."),
    email: Yup.string()
      .email("E-mail inválido")
      .required("Digite seu e-mail de acesso"),
    password: Yup.string().required("Senha é obrigatória"),
    passwordVerify: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "As senhas devem ser iguais."
    ),
  });

  async function handleSubmit(data) {
    dispatch(CadastroActions.cadastroRequest(data));
  }

  return (
    <Container>
      <Content>
        <img src={Logo} alt="Logo PediuPeças" />
        <Form onSubmit={handleSubmit} schema={schema}>
          <>
            <Wrap>
              <Input name="nome" placeholder="Nome" />
            </Wrap>
            <Wrap>
              <Input name="email" placeholder="E-mail" />
            </Wrap>
            <Wrap row>
              <div className="w48">
                <Input name="password" placeholder="Senha" type="password" />
              </div>
              <div className="w48">
                <Input
                  name="passwordVerify"
                  placeholder="Confirmar Senha"
                  type="password"
                />
              </div>
            </Wrap>
            <Button
              type="submit"
              btType="fuelYellow"
              label="Cadastrar"
              full
              loading={loading}
            />
            <Button
              classButton="signout"
              btType="white"
              label="Voltar"
              full
              action={props.loginHandler}
            />
          </>
        </Form>
      </Content>
    </Container>
  );
}
