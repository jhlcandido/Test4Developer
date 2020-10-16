import styled from "styled-components";
import logoImg from "../../assets/images/logo.png";

export const Container = styled.div`
  border-radius: 20px;
  width: 360px;
  max-width: 100%;

  & p {
    font-size: 1rem;
    color: #92929d;
  }

  & form a {
    display: block;
    font-size: 1.25rem;
  }

  & h5 {
    font-size: 1.12rem;
  }

  #btn-new-account {
    font-weight: 500;
  }
`;

export const Logo = styled.img.attrs({
  src: logoImg,
})`
  align-self: center;
  margin-bottom: 40px;
`;
