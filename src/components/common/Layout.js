import React from "react";
import styled from "styled-components";
import starBG from "../../static/images/common/starBG.svg";

const Layout = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Layout;

const Container = styled.div`
  background-image: url(${starBG});
  background-size: contain;
  background-color: #060E32;
  width: 100%;
  height: 100vh;
`;