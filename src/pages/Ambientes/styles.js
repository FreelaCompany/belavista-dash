import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: column;
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
        justify-content: center;
      }
    }

    .tdImage {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
    }

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
`;

export const DivProdutos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${(props) => props.alinha};
  align-items: center;
`;

export const Produto = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${(props) => props.foto}); /* The image used */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  border-radius: 5px;
  margin: ${(props) => props.margin};
  &:first-child {
    margin-left: 0 !important;
  }
  &:hover {
    .produtoFunctions {
      display: flex;
    }
  }
`;

const transition = keyframes`
 0% { background-color: rgba(0, 0, 0, 0.0); }
 100% { background-color: rgba(0, 0, 0, 0.6);}
`;

export const ProdutoFunctions = styled.div`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  border-radius: 7px;
  display: none;
  animation-name: ${transition};
  animation-duration: 0.5s;
  animation-direction: normal;
  animation-fill-mode: both;

  svg {
    cursor: pointer;
  }
`;

export const DivAleatoria = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  .inputMask {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

export const TableHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

export const NomeAmbiente = styled.h1`
  color: #000;
  font-size: 18px;
  margin: 30px 0;
`;

export const RedesSociais = styled.div`
  color: #000;
  font-size: 14px;
  margin: 15px 0;

  a {
    margin: 0 5px;
  }
`;

export const DescricaoAmbiente = styled.p`
  color: #000;
  font-size: 14px;
  margin: 50px 0;
`;

export const DropzoneExt = styled.section`
  border: 1px dashed #ced4da;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #000;
  border-radius: 0.25rem;
  margin: 20px 0;
  cursor: pointer;
`;

export const DivFotos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
`;
