import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 100vh;
  border: none;
  background-color: #000;
  box-shadow: 0 6px 18px rgba(255, 255, 255, 0.06);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: Column;
  align-items: center;
  width: 30%;
  margin: 0 auto;

  img {
    width: 100%;
    max-width: 100px;
    margin-bottom: 30px;
    border-radius: 10px;
  }

  form {
    width: 80%;

    button {
      margin-top: 20px;
    }

    .signout {
      margin-top: 20px;
    }
  }
`;

export const Wrap = styled.div`
  display: flex;
  margin-bottom: 16px;
  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`;
