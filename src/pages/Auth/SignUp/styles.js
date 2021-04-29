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

  input {
    width: 100%;
    height: 38px;
    border-radius: 4px;
    border: 1px solid #d6d6d6;
    margin-top: 8px;
    padding: 16px;
    font-size: 14px;
    line-height: 18px;
    color: #ffffff;
    background-color: transparent;
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
  justify-content: space-between;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  width: 100%;
  margin-bottom: 16px;

  .w48 {
    width: 48%;
  }

  .mask {
    width: 100%;
    height: 38px;
    border-radius: 4px;
    border: 1px solid #d6d6d6;
    margin-top: 8px;
    padding: 16px;
    font-size: 14px;
    line-height: 18px;
    color: #ffffff;
    background-color: transparent;
    /* box-shadow: 0 3px 12px rgba(0, 0, 0, 0.075); */
    &[type="number"] {
      -moz-appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &[disabled] {
      background-color: #ededed;
      &::placeholder {
        content: "";
      }
    }

    &::-webkit-input-placeholder {
      opacity: 0.65;
    }

    &:-ms-input-placeholder {
      opacity: 0.65;
    }

    &:-moz-placeholder {
      opacity: 0.65;
    }

    &::-moz-placeholder {
      opacity: 0.65;
    }
  }

  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`;
