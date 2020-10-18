import styled from "styled-components";
import background from "../../assets/images/background.jpg";
import logo from "../../assets/images/logo.png";

export const Container = styled.div`
  background-color: #fff;

  @media (min-width: 1200px) {
    .container,
    .container-sm,
    .container-md,
    .container-lg,
    .container-xl {
      max-width: 1600px;
    }
  }
`;

export const Nav = styled.nav`
  overflow-x: hidden;
  background-color: transparent !important;

  #logout {
    position: absolute;
    top: 5px;
    right: 20px;
    font-family: "Roboto", sans-serif;
    font-size: 1.35rem;
    font-style: italic;
    font-weight: 500 !important;
  }

  .background {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-image: url(${background});
    background-size: cover;
    background-position: left left;
    width: 1066px;
    z-index: -1;
  }

  .nav-bar-user-photo {
    border-radius: 50%;
    height: 60px;
    width: 60px;
    background-size: cover;
    background-position: center center;
  }

  .nav-item.active a.nav-link {
    color: var(--secondary) !important;
  }

  .nav-item.active a.nav-link svg path {
    fill: var(--secondary) !important;
  }

  .ic-notifications rect {
    display: none;
  }

  .has-notifications.ic-notifications rect {
    display: initial;
  }

  @media (min-width: 1200px) {
    .container,
    .container-sm,
    .container-md,
    .container-lg,
    .container-xl {
      max-width: 1600px;
    }
  }
`;

export const Logo = styled.img.attrs({
  src: logo,
})`
  width: 60px;
  height: 60px;
`;
