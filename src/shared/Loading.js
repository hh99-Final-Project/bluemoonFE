import React from "react";
import styled from "styled-components";
import { spinner } from "../static/images/resources";

const Loading = () => {
    return (
        <LoadingContainer>
            <img src={spinner} alt={"loading-spinner"}/>
        </LoadingContainer>
    );
};

export default Loading;


const LoadingContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;