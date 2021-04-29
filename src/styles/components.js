import styled from "styled-components";
import { colors } from "./colors";

export const PageContainer = styled.main`
  width: 100%;
  max-width: 1920px;
  height: 100vh;
  background-color: #f2f2f2;
  margin: 0 auto;
  display: flex;

  .side-navigation-panel {
    width: 300px;
  }
`;

export const PageWrapper = styled.section`
  display: flex;
  width: 100%;
  max-width: 1100px;
  margin: 48px auto 0 auto;
  .icon-spin {
    align-self: center;
    margin-bottom: 32px;
    color: ${colors.light};
    animation: iconSpin 2s infinite linear;
  }
  @keyframes iconSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
  @media screen and (max-width: 1160px) {
    flex-direction: column;
    padding: 48px 32px;
    margin: 0 auto;
  }
  @media screen and (max-width: 410px) {
    padding: 32px 16px;
  }
`;

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 240px;
  height: 100%;
  padding: 70px 0 70px 25px;
  background-color: ${colors.white};

  @media screen and (max-width: 1160px) {
    width: 100%;
  }
`;

export const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 230px;
  height: 300px;
  padding: 25px;
  margin: 8px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  -webkit-box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);

  .icon-spin {
    animation: iconSpin 2s infinite linear;
  }

  @keyframes iconSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;
