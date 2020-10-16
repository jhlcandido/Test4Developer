import styled from "styled-components";

export const Container = styled.div`
  li {
    position: relative;
  }

  li.completed:before {
    content: "";
    position: absolute;
    left: -5px;
    right: 0;
    top: calc(50% - 1px);
    height: 1px;
    background-color: #333;
    z-index: 1;
  }
`;
