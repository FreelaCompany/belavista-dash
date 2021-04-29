import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 16px;
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  label {
    font-size: 15px;
    color: ${colors.white};
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    height: 48px;
    border-radius: 4px;
    border: 1px solid #d6d6d6;
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
