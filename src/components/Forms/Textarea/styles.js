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
    color: ${colors.dark};
    margin-bottom: 8px;
  }
  textarea {
    width: 100%;
    border-radius: 2px;
    border: 1px #d0d0d0 solid;
    padding: 16px;
    font-size: 14px;
    color: #586365;
    background-color: #fafafa;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.075);
  }
  span {
    font-size: 14px;
    color: ${colors.danger};
    margin: 4px 0;
  }
`;
