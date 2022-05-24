import React from "react";
import styled from "styled-components";
import { color } from "../utils/designSystem";
import { footerLogo } from "../static/images/resources";

Footer.propTypes = {};

function Footer(props) {
    return (
        <Container bgColor={color.backgroundColor}>
            <img src={footerLogo}></img>
            <Fe>
                Front-End
                <p
                    onClick={() => {
                        window.open("https://github.com/lee-chun-91");
                    }}
                >
                    이춘
                </p>
                <p
                    onClick={() => {
                        window.open("https://github.com/hyemigwak");
                    }}
                >
                    곽혜미
                </p>
            </Fe>
            <Be>
                Back-End
                <p
                    onClick={() => {
                        window.open("https://github.com/cbjjzzang");
                    }}
                >
                    최봉진
                </p>
                <p
                    onClick={() => {
                        window.open("https://github.com/jaeyoungjang2");
                    }}
                >
                    장재영
                </p>
                <p
                    onClick={() => {
                        window.open("https://github.com/TodayIsYolo");
                    }}
                >
                    김승민
                </p>
            </Be>
            <Ui>
                UI/UX Designer
                <p>김지희</p>
                <p>박유리</p>
            </Ui>
            <Copyright>Copyright 2022 bluemoon All rights Reserved.</Copyright>
        </Container>
    );
}

export default Footer;

const Container = styled.div`
    background-color: ${(props) => props.bgColor};
    width: 100%;
    height: 84px;

    position: relative;
    bottom: 84px;

    display: flex;
    align-items: center;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    /* identical to box height */

    color: #ffffff;

    img {
        margin: 0 147px 0 97px;
    }

    @media only screen and (max-width: 420px) {
        display: none;
    }
`;

const Fe = styled.div`
    display: flex;
    flex-direction: row;
    p {
        margin-left: 5px;
        cursor: pointer;
    }
`;

const Be = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 55px;
    p {
        margin-left: 5px;
        cursor: pointer;
    }
`;

const Ui = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 55px;
    p {
        margin-left: 5px;
        cursor: pointer;
    }
`;

const Copyright = styled.div`
    margin-left: 147px;
`;
