import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #23272d;

  .text-gray-700 {
    --text-opacity: unset;
  }

  .text-gray-800:hover,
  .text-gray-800,
  .text-gray-700:hover {
    color: #000;
  }

  img {
    width: 150px;
    height: 150px;
    margin: 30px auto;
  }
`;
