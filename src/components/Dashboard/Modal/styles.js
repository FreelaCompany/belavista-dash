import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  form {
    width: 100%;

    button {
      margin-top: 60px;
    }
  }

  label {
    color: #000;
  }
`;

export const Button = styled.button`
  display: flex;
  font-size: 16px;
  color: ${colors.gullGray};
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const overlayStyle = {
  zIndex: 5,
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  backgroundColor: "rgba(0, 0, 0, 0.45)",
};

export const contentStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  padding: 20,
  top: 0,
  left: 0,
  width: 1000,
  border: "none",
};

export const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #000000;
  margin-right: 24px;
`;

export const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Name = styled.h2`
  font-size: 28px;
  line-height: 32px;
  color: ${colors.black};
  margin-bottom: 6px;
`;

export const Phone = styled.h3`
  font-size: 18px;
  line-height: 22px;
  color: ${colors.black};
  margin: 6px 0;
`;

export const DivAdress = styled.div`
  position: absolute;
  right: 55px;
  top: 40px;
`;

export const Address = styled.h3`
  font-size: 18px;
  line-height: 22px;
  color: ${colors.black};
`;

export const Parts = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-top: 48px;

  tr {
    th,
    td {
      text-align: center;
      color: #000;
      width: 110px;
    }

    th {
    }

    td {
      img {
        width: 100%;
        max-width: 60px;
      }
    }
  }

  thead,
  tbody {
    display: block;
  }

  tbody {
    height: 180px;
    overflow-y: scroll;
  }
`;

export const ShopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 250px;
  height: 200px;
  padding: 25px;
  margin-bottom: 32px;
  background-color: #f2f2f2;
  border-radius: 4px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  -webkit-box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000;
`;
