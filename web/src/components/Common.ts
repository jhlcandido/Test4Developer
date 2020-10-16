import styled from "styled-components";

export const Badge = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #f1f1f5;
  border-radius: 5px;
  height: 28px;
  padding: 7px;

  font-family: Poppins;
  font-size: 10px;
  font-weight: 500;
  color: #696974;

  &.primary {
    color: #fff;
    background-color: var(--primary);
  }

  &.secondary {
    color: #fff;
    background-color: var(--secondary);
  }
`;
