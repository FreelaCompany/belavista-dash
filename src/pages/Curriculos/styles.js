import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  padding: 50px;

  .TableScrollbar {
    width: inherit;

    thead {
      background-color: #808080;
    }

    td {
      vertical-align: middle;
      div {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
      }
    }

    .tdImage {
      padding: 0;
    }

    a {
      text-decoration: none;
      color: #fff;
    }

    a:hover {
      text-decoration: none;
      color: #fff;
    }

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 20px auto;
    }
  }
`;

export const TableHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
`;
export const ContainerInputFile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 24px;
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  label {
    font-size: 18px;
    line-height: 23px;
    color: #000;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    height: 48px;
    border-radius: 2px;
    border: 1px #d0d0d0 solid;
    padding: 16px;
    font-size: 18px;
    line-height: 23px;
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
`;

export const Arquivo = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  width: 100%;

  span {
    width: 78%;
    height: 40px;
    padding: 8px 6px 6px 15px;
    border-radius: 4px;
    border: 1px #6b6d76 solid;
    font-size: 14px;
    line-height: 23px;
    color: #586365 !important;
    background-color: #fafafa;
  }

  input.arquivo {
    background-color: #000;
    position: absolute;
    z-index: 9999;
    opacity: 0;
    cursor: pointer;
  }

  input.arquivo::before {
    content: "Escolha aqui";
    display: none;
  }

  button {
    width: 193px;
    background-color: #000;
    height: 40px;
    color: #fff;
    font-size: 18px;
    line-height: 23px;
  }

  @media only screen and (max-width: 767px) {
    span {
      font-size: 14px;
    }
  }
`;
