import React from "react";
import styled from "styled-components";
import { loadingIcon } from "../static/images/resources";
import {color} from "../utils/designSystem";
import Layout from "../components/common/Layout";

const Loading = () => {
    return (
        <Layout>
            <LoadingContainer bgColor={color.backgroundColor}>
                <img src={loadingIcon} alt={"loading-spinner"}/>
            </LoadingContainer>
        </Layout>
    );
};

export default Loading;


const LoadingContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
  img {
    width: 150px;
    height: 30px;
  }
`;