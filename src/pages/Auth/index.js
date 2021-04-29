import React, { useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { PageContainer } from "./styles";

export default function Auth(props) {
  const [showLogin, setShowLogin] = useState(true);
  const [showCadastro, setShowCadastro] = useState(false);

  function cadastroHandler() {
    setShowLogin(false);
    setShowCadastro(true);
  }

  function loginHandler() {
    setShowLogin(true);
    setShowCadastro(false);
  }

  return (
    <PageContainer>
      {showLogin && !showCadastro && (
        <SignIn cadastroHandler={cadastroHandler} />
      )}
      {!showLogin && showCadastro && <SignUp loginHandler={loginHandler} />}
    </PageContainer>
  );
}
