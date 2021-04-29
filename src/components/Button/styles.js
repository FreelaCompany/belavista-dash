import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 16px;
  line-height: 20px;
  max-height: 54px;

  width: ${({ full }) => (full ? "100%" : "max-content")};
  padding: ${({ icon }) => (icon ? "16px 24px" : "16px 48px")};
  background-color: ${({ btType }) =>
    btType ? colors[btType] : colors.primary};
  color: ${({ btType }) =>
    btType === "disable" ? colors.light : colors.black};
  transition: 300ms ease;

  &:hover {
    transform: scale(0.98);
  }

  svg {
    margin-right: 8px;
    color: ${({ btType }) =>
      btType === "disable" ? colors.light : colors.white};
  }

  img {
    margin-right: 8px;
  }

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
