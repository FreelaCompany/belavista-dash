import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 24px;
  position: relative;
  &:last-child {
    margin-right: 0;
  }
  label {
    font-size: 15px;
    color: ${colors.dark};
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    height: 48px;
    border-radius: 2px;
    border: 1px #d0d0d0 solid;
    padding: 16px;
    font-size: 14px;
    color: #586365;
    background-color: #fafafa;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.075);
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
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    position: absolute;
    right: 0;
    top: 8px;
    svg {
      color: ${colors.light};
    }
  }
  span {
    font-size: 14px;
    color: ${colors.danger};
    margin: 4px 0;
  }
`;

export const Arquivo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  span {
    width: 78%;
    min-height: 49px;
    margin: 8px 0 16px 0;
    padding: 16px;
    border-radius: 4px;
    border: 1px #d0d0d0 solid;
    padding: 16px;
    font-size: 14px;
    color: #586365;
    background-color: #fafafa;
  }
  input.arquivo {
    background-color: #000;
    position: absolute;
    width: 0
    height: 0;
    z-index: 9999;
    opacity: 0;
    cursor: pointer;
  }
  input.arquivo::before {
    content: "Escolha aqui";
    display: none;
  }
  button {
    width: 20%;
    background-color: #074b5b;
    min-height: 51px;
    color: #fff;
    border-radius: 3px;
  }
  @media only screen and (max-width: 767px) {
    span {
      font-size: 14px;
    }
  }
`;
