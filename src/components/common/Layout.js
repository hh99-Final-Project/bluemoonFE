import React from "react";
import styled from "styled-components";
import starBG from "../../static/images/common/starBG.svg";
import { color } from "../../utils/designSystem";
import {useMediaQuery} from "react-responsive";

const Layout = ({children}) => {

    return (
        <Container bgColor={color.backgroundColor}>
            {children}
        </Container>
    );
};

export default Layout;

const Container = styled.div`
  background-image: url(${starBG});
  background-size: contain;
  background-color: ${props => props.bgColor};
  width: 100%;
  height: 100vh;


  @media only screen and (max-width: 420px) {
    background-color: #0D173B;
    background-image: none;
    height: 100vh;
  }
  
`;