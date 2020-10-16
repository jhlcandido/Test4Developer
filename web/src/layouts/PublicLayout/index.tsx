import React from "react";
import "react-toastify/dist/ReactToastify.min.css";

import { Container } from "./styles";

const PublicLayout: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PublicLayout;
