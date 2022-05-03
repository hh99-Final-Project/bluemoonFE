import React from 'react';
import spinner from "../static/images/spinner.gif";
import styled from "styled-components";

const Loading = () => {
    return (
        <LoadingContainer>
            <img src={spinner} alt={"loading-spinner"}/>
        </LoadingContainer>
    )
}

export default Loading;


const LoadingContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;