import React from "react";
import styled from "styled-components";
import { loadingIcon } from "../static/images/resources";
import { color } from "../utils/designSystem";
import Layout from "../components/common/Layout";

const Loading = () => {
    return (
        <Layout>
            <LoadingContainer bgColor={color.backgroundColor}>
                <img src={loadingIcon} alt={"loading-spinner"} />
                <p>푸른 달의 빛을 받고 있습니다...</p>
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

    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
        width: 150px;
        height: 30px;
        // margin-left: 25px;
    }

    p {
        // width: 250px;
        margin-top: 15px;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;

        color: #ffffff;
    }
`;
