import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  background-color: #000;

  .customization {
    justify-content: flex-end;

    button.defaultButton {
      display: none;
    }
  }

  @media screen and (max-width: 1200px) {
    padding: 60px 25px;
  }
`;

export const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #000000;
`;

export const Name = styled.h2`
  font-size: 17px;
  line-height: 22px;
  color: ${colors.black};
`;

export const CodReserva = styled.p`
  font-size: 18px;
  line-height: 22px;
  color: #ebb21d !important;
`;

export const Confirma = styled.span`
  display: flex;
  justify-content: space-evenly;
  line-height: 15px;
  width: 80%;
  flex-direction: "row";
  align-items: "center";
  font-size: 12px;
  line-height: 15px;
  color: ${colors.black};
`;

export const Quantity = styled.h3`
  font-size: 18px;
  line-height: 22px;
  color: ${colors.black};
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  font-size: 12px;
  line-height: 15px;
  width: 80%;
  padding: 8px 0;
  background-color: transparent;
  color: ${({ btType }) =>
    btType === "disable" ? colors.light : colors.black};
  transition: 300ms ease;
  border: 1px solid #000;

  svg {
    margin-right: 20px;
  }

  &:hover {
    transform: scale(0.98);
  }
`;
