import styled from "styled-components";
import ic_profile from "../../assets/images/ic_profile.png";

export const Container = styled.div`
  .photo {
    height: 59px;
    width: 59px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .preview {
    height: 59px;
    width: 59px;
    background-size: cover;
    background-position: center center;
    background-color: #333;
    border-radius: 50%;
  }

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

export const IcProfile = styled.img.attrs({
  src: ic_profile,
})`
  height: 39px;
  width: 39px;
`;
